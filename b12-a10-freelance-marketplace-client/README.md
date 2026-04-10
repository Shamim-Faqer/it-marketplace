# Freelance MarketPlace (Client)

Live Site: https://your-client-domain.netlify.app

## Features

- Responsive layout for mobile, tablet, and desktop.
- Public and private route setup with persistent login state after refresh.
- Dynamic latest jobs section and all jobs page powered by backend API.
- Add, update, and delete job flows with toast success/error messages.
- Job accept flow with protection against accepting own posted jobs.
- My Accepted Tasks page with DONE/CANCEL instant removal behavior.
- Dark/light theme toggle and animated hero/cards using Framer Motion.

## Tech Stack

- React
- React Router
- Axios
- TanStack Query
- React Hot Toast
- Framer Motion

## Environment

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Run Locally

```bash
npm install
npm run dev
```
