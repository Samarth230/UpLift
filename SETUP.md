# UpLift — Setup Guide

## Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** (included with Node.js)
- **Git** — [Download](https://git-scm.com/)

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/UpLift.git
cd UpLift

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will open at **http://localhost:5173/**

## Dependencies

All dependencies are managed in `package.json`. Running `npm install` installs:

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.x | UI framework |
| `react-dom` | ^19.x | React DOM renderer |
| `firebase` | ^12.x | Firestore, Storage, Auth |
| `@google/generative-ai` | ^0.24.x | Gemini 1.5 Flash AI |
| `leaflet` | ^1.9.x | Interactive maps |
| `react-leaflet` | ^5.x | React wrapper for Leaflet |
| `lucide-react` | ^1.x | Icon library |

## Configuration (Optional — app works without these)

### Firebase
Edit `src/config/firebase.js`:
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Gemini AI
Edit `src/config/gemini.js`:
```js
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
```
Get a free key: https://aistudio.google.com/apikey

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code checks |

## Deployment

```bash
# Build production bundle
npm run build

# Deploy to Firebase Hosting
npm install -g firebase-tools
firebase login
firebase init hosting   # public dir = dist, single-page = yes
firebase deploy
```

## Demo Credentials

| Role | Access |
|---|---|
| Volunteer | Any phone + any 6-digit OTP |
| NGO Staff | Any phone + any OTP + org code: `UPLIFT2026` |
