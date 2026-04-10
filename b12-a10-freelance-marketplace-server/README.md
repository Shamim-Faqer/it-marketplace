# Freelance MarketPlace (Server)

API Base URL (example): https://your-server-domain.vercel.app

## Features

- Express server with MongoDB Atlas connection.
- Full CRUD for jobs.
- Separate accepted task collection for accepted jobs.
- Ownership checks for updating/deleting jobs.
- Prevent users from accepting their own jobs.
- Posted date/time based sorting support.

## Environment

Create `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_uri
DB_NAME=freelanceMarketplaceDB
CLIENT_URL=http://localhost:5173
```

## Run Locally

```bash
npm install
npm run dev
```
