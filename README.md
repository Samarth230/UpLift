# UpLift — AI-Powered Disaster Response Platform

An intelligent disaster response coordination platform that uses AI to process handwritten field reports, geocode locations onto a live map, and match nearby volunteers to verified tasks through an agentic chat interface.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:5173/` with demo data out of the box — no API keys needed.

## 🔑 Configuration

### Firebase (for real-time sync)
Edit `src/config/firebase.js` with your Firebase project credentials:
```js
apiKey: "your-api-key",
projectId: "your-project-id",
storageBucket: "your-project-id.firebasestorage.app",
// ...
```

### Gemini AI (for OCR + chat)
Edit `src/config/gemini.js`:
```js
const GEMINI_API_KEY = "your-gemini-api-key";
```
Get a free key from [Google AI Studio](https://aistudio.google.com/apikey).

## 📱 Features

- **Phone + OTP Login** — Secure authentication with NGO email verification
- **AI Report Analysis** — Upload handwritten reports, Gemini extracts text, urgency, and location
- **Real-time Map** — Leaflet.js with OpenStreetMap showing color-coded urgency markers
- **Verification Queue** — NGO staff review AI-analyzed reports before they go live
- **Agentic Volunteer Chat** — AI coordinator matches volunteers to nearby tasks via function calling
- **Demo Zone** — 25 pre-seeded reports in Indiranagar, Bangalore for reliable demos

## 🏗️ Architecture

| Layer | Technology | Cost |
|---|---|---|
| Frontend | React (Vite) | Free |
| Maps | Leaflet.js + OpenStreetMap | Free |
| Geocoding | Nominatim API | Free |
| Database | Firebase Firestore | Free (Spark plan) |
| Storage | Firebase Cloud Storage | Free (Spark plan) |
| AI | Gemini 1.5 Flash | Free (AI Studio) |
| Icons | lucide-react | Free |

## 🔐 NGO Verification

NGO Staff must verify their identity via:
- **Verified email domain** (e.g., `@redcross.org`, `@staff.uplift.in`)
- **Or organization code**: `UPLIFT2026`

## 📦 Deployment

### Option 1: Firebase Hosting (Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting    # Select your project, set public dir to "dist"
npm run build
firebase deploy
```

### Option 2: Vercel
```bash
npm i -g vercel
vercel
```

### Option 3: Netlify
```bash
npm run build
# Drag "dist" folder to netlify.com/drop
```

## 📁 Project Structure

```
src/
├── config/         # Firebase + Gemini configuration
├── components/     # Reusable UI components
├── pages/          # NGO Dashboard + Volunteer Chat
├── hooks/          # useReports, useUpload, useChat
└── utils/          # Demo zone data + geocoding
```

## 🤖 Responsible AI

- **Human-in-the-Loop**: AI assists, NGO staff verify
- **Constrained Agent**: Chat AI can only search tasks, not modify data
- **Resilient Fallbacks**: Every failure path leads to manual review, not data loss
- **Privacy by Design**: Volunteer locations are session-only
