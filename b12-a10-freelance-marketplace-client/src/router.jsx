import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AllJobsPage from "./pages/AllJobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddJobPage from "./pages/AddJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import MyAddedJobsPage from "./pages/MyAddedJobsPage";
import UpdateJobPage from "./pages/UpdateJobPage";
import MyAcceptedTasksPage from "./pages/MyAcceptedTasksPage";
import DeleteJobPage from "./pages/DeleteJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/allJobs", element: <AllJobsPage /> },
      {
        path: "/allJobs/:id",
        element: (
          <PrivateRoute>
            <JobDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <AddJobPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/myAddedJobs",
        element: (
          <PrivateRoute>
            <MyAddedJobsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/myPostedJobs",
        element: (
          <PrivateRoute>
            <MyAddedJobsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateJob/:id",
        element: (
          <PrivateRoute>
            <UpdateJobPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/deleteJob/:id",
        element: (
          <PrivateRoute>
            <DeleteJobPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-accepted-tasks",
        element: (
          <PrivateRoute>
            <MyAcceptedTasksPage />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
