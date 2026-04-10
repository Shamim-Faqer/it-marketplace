const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "freelanceMarketplaceDB";

if (!uri) {
  throw new Error("MONGODB_URI is required in .env");
}

const client = new MongoClient(uri);

const parseId = (value) => {
  if (!ObjectId.isValid(value)) return null;
  return new ObjectId(value);
};

const cleanText = (value) => String(value || "").trim();

const validateJobPayload = (payload) => {
  const title = cleanText(payload.title);
  const postedBy = cleanText(payload.postedBy);
  const category = cleanText(payload.category);
  const summary = cleanText(payload.summary);
  const coverImage = cleanText(payload.coverImage);
  const userEmail = cleanText(payload.userEmail).toLowerCase();

  if (!title || !postedBy || !category || !summary || !coverImage || !userEmail) {
    return { ok: false, message: "All job fields are required." };
  }

  return {
    ok: true,
    value: {
      title,
      postedBy,
      category,
      summary,
      coverImage,
      userEmail,
    },
  };
};

async function run() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  // eslint-disable-next-line no-console
  console.log("MongoDB connected");

  const db = client.db(dbName);
  const jobsCollection = db.collection("jobs");
  const acceptedTasksCollection = db.collection("acceptedTasks");

  app.get("/", (req, res) => {
    res.send({ ok: true, message: "Freelance Marketplace API is running." });
  });

  app.get("/jobs", async (req, res) => {
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const limit = Number(req.query.limit) || 0;
    const cursor = jobsCollection.find().sort({ postedAt: sortOrder });
    if (limit > 0) cursor.limit(limit);
    const jobs = await cursor.toArray();
    res.send(jobs);
  });

  app.get("/jobs/latest", async (req, res) => {
    const limit = Number(req.query.limit) || 6;
    const jobs = await jobsCollection.find().sort({ postedAt: -1 }).limit(limit).toArray();
    res.send(jobs);
  });

  app.get("/jobs/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).send({ message: "Invalid job id." });

    const job = await jobsCollection.findOne({ _id: id });
    if (!job) return res.status(404).send({ message: "Job not found." });

    res.send(job);
  });

  app.post("/jobs", async (req, res) => {
    const validated = validateJobPayload(req.body);
    if (!validated.ok) return res.status(400).send({ message: validated.message });

    const now = new Date();
    const newJob = {
      ...validated.value,
      postedAt: now,
      updatedAt: now,
    };

    const result = await jobsCollection.insertOne(newJob);
    res.status(201).send({ insertedId: result.insertedId });
  });

  app.get("/my-jobs", async (req, res) => {
    const email = cleanText(req.query.email).toLowerCase();
    if (!email) return res.status(400).send({ message: "Email query is required." });

    const jobs = await jobsCollection.find({ userEmail: email }).sort({ postedAt: -1 }).toArray();
    res.send(jobs);
  });

  app.put("/jobs/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).send({ message: "Invalid job id." });

    const requesterEmail = cleanText(req.query.email).toLowerCase();
    if (!requesterEmail) {
      return res.status(400).send({ message: "Email query is required." });
    }

    const existingJob = await jobsCollection.findOne({ _id: id });
    if (!existingJob) return res.status(404).send({ message: "Job not found." });
    if (existingJob.userEmail !== requesterEmail) {
      return res.status(403).send({ message: "You can only update your own job." });
    }

    const title = cleanText(req.body.title);
    const category = cleanText(req.body.category);
    const summary = cleanText(req.body.summary);
    const coverImage = cleanText(req.body.coverImage);

    if (!title || !category || !summary || !coverImage) {
      return res.status(400).send({ message: "All editable fields are required." });
    }

    await jobsCollection.updateOne(
      { _id: id },
      {
        $set: {
          title,
          category,
          summary,
          coverImage,
          updatedAt: new Date(),
        },
      }
    );

    res.send({ ok: true, message: "Job updated successfully." });
  });

  app.delete("/jobs/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).send({ message: "Invalid job id." });

    const requesterEmail = cleanText(req.query.email).toLowerCase();
    if (!requesterEmail) {
      return res.status(400).send({ message: "Email query is required." });
    }

    const existingJob = await jobsCollection.findOne({ _id: id });
    if (!existingJob) return res.status(404).send({ message: "Job not found." });
    if (existingJob.userEmail !== requesterEmail) {
      return res.status(403).send({ message: "You can only delete your own job." });
    }

    await jobsCollection.deleteOne({ _id: id });
    await acceptedTasksCollection.deleteMany({ jobId: String(id) });

    res.send({ ok: true, message: "Job deleted successfully." });
  });

  app.post("/accepted-tasks", async (req, res) => {
    const jobId = cleanText(req.body.jobId);
    const accepterEmail = cleanText(req.body.accepterEmail).toLowerCase();
    const accepterName = cleanText(req.body.accepterName);

    if (!jobId || !accepterEmail || !accepterName) {
      return res.status(400).send({ message: "jobId, accepterEmail and accepterName are required." });
    }

    const parsedJobId = parseId(jobId);
    if (!parsedJobId) return res.status(400).send({ message: "Invalid job id." });

    const job = await jobsCollection.findOne({ _id: parsedJobId });
    if (!job) return res.status(404).send({ message: "Job not found." });

    if (job.userEmail === accepterEmail) {
      return res.status(403).send({ message: "You cannot accept your own posted job." });
    }

    const alreadyAccepted = await acceptedTasksCollection.findOne({
      jobId,
      accepterEmail,
    });

    if (alreadyAccepted) {
      return res.status(409).send({ message: "You already accepted this job." });
    }

    const now = new Date();
    const acceptedTask = {
      jobId,
      accepterEmail,
      accepterName,
      ownerEmail: job.userEmail,
      ownerName: job.postedBy,
      title: job.title,
      category: job.category,
      summary: job.summary,
      coverImage: job.coverImage,
      acceptedAt: now,
      status: "accepted",
    };

    const result = await acceptedTasksCollection.insertOne(acceptedTask);
    res.status(201).send({ insertedId: result.insertedId });
  });

  app.get("/accepted-tasks", async (req, res) => {
    const email = cleanText(req.query.email).toLowerCase();
    if (!email) return res.status(400).send({ message: "Email query is required." });

    const tasks = await acceptedTasksCollection.find({ accepterEmail: email }).sort({ acceptedAt: -1 }).toArray();
    res.send(tasks);
  });

  app.delete("/accepted-tasks/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).send({ message: "Invalid accepted task id." });

    const requesterEmail = cleanText(req.query.email).toLowerCase();
    if (!requesterEmail) {
      return res.status(400).send({ message: "Email query is required." });
    }

    const task = await acceptedTasksCollection.findOne({ _id: id });
    if (!task) return res.status(404).send({ message: "Accepted task not found." });
    if (task.accepterEmail !== requesterEmail) {
      return res.status(403).send({ message: "You can only remove your own accepted task." });
    }

    await acceptedTasksCollection.deleteOne({ _id: id });
    res.send({ ok: true, message: "Accepted task removed successfully." });
  });

  app.use((req, res) => {
    res.status(404).send({ message: "Route not found." });
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  });
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
