# UpLift — AI-Powered Disaster Response Platform

> **Google Solutions Challenge Submission**  
> Turning paper field reports into real-time community intelligence.

🔗 **Live Demo:** [uplift-c2f35.web.app](https://uplift-c2f35.web.app)

---

## The Problem

Local NGOs and social groups collect critical community data through handwritten paper surveys and field reports. This valuable intelligence gets trapped — scattered across offices, clipboards, and WhatsApp groups — making it impossible to see the biggest problems clearly or coordinate volunteers efficiently.

## The Solution

UpLift is a two-role platform that bridges the gap between field data and coordinated action:

- **NGO Staff** upload photos of handwritten reports → AI extracts structured data → human verifies → report appears on a live map
- **Volunteers** chat with an AI coordinator → AI queries nearby verified tasks → volunteers get matched to the most urgent needs

---

## Screenshots

| <img width="1600" height="779" alt="image" src="https://github.com/user-attachments/assets/89c00961-fa84-4f84-857d-fc24e582e917" />
|<img width="775" height="799" alt="image" src="https://github.com/user-attachments/assets/ec705189-6661-49b0-b3d2-2ea03ecd87b9" />
| <img width="1600" height="776" alt="image" src="https://github.com/user-attachments/assets/2a0f3052-e756-41f4-a2e1-02dcffcb2705" />

---

## Key Features

### Handwriting-to-Intelligence Pipeline
Upload a photo of any messy handwritten field report. Gemini 1.5 Flash extracts text, categorizes the issue, assigns an urgency score (1–5) using a fixed rubric, and geocodes the location — all in one pass.

### Responsible AI Verification Gate
Every AI-processed report lands in a **Verification Queue** before going live. NGO staff can view the original image side-by-side with the AI's extracted text (the **Insight Trace**), edit any field, then Approve or Reject. The AI assists; humans decide.

### Agentic Volunteer Matchmaker
Volunteers describe their location and skills in plain language. Gemini uses **Function Calling** to search verified tasks via `findNearbyTasks()` — it cannot make up results or drift off-topic. Matched tasks appear in a side panel with a mini-map.

### Bilingual Support
Full English ↔ Hindi translation across every UI string. Toggle in one click from the header.

### Emergency SOS
A floating SOS button detects the user's location via browser geolocation and submits a Critical (5/5 urgency) alert instantly.

### CSV Export
NGO coordinators can export all reports to a spreadsheet with one click for offline analysis or donor reporting.

---

## Architecture

```
User uploads photo
    ↓
React (Vite) frontend
    ↓
Gemini 1.5 Flash API (client-side, JSON mode)
    ├── OCR + text extraction
    ├── Urgency scoring (rubric-anchored)
    ├── Category classification
    └── Location extraction
    ↓
Nominatim geocoding (OpenStreetMap, free)
    ↓
Firebase Firestore (status: "pending")
    ↓
NGO Verification Queue → Approve
    ↓
status: "verified" → Live map
    ↓
Volunteer Chat → Gemini Function Calling → findNearbyTasks() → Firestore
```

### Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Frontend | React 19 + Vite 8 | Free |
| Maps | Leaflet.js + OpenStreetMap | Free |
| Geocoding | Nominatim API | Free |
| Database | Firebase Firestore (Spark) | Free |
| Hosting | Firebase Hosting | Free |
| AI | Gemini 1.5 Flash (Google AI Studio) | Free tier |
| Icons | lucide-react | Free |

**Total infrastructure cost: $0**

---

## Responsible AI Design

| Principle | Implementation |
|---|---|
| Human-in-the-Loop | No report reaches the live map without NGO staff approval |
| Transparency | Insight Trace shows the exact text the AI analyzed |
| Constrained Agent | Volunteer chat AI can only call `findNearbyTasks()` — cannot modify data or answer off-topic queries |
| Graceful Failure | Every failure path writes an `errorMessage` to Firestore and shows a Retry button — no data is silently lost |
| Consistent Scoring | Few-shot rubric anchoring prevents urgency score drift across reports |

---

## Demo Credentials

| Role | How to Access |
|---|---|
| Volunteer | Any phone number + any 6-digit OTP + any name |
| NGO Staff | Any phone + any OTP + any name + org code: `UPLIFT2026` |

**Demo Zone:** 25 pre-seeded reports in Indiranagar, Bangalore — spread across 3 weeks of realistic timestamps, covering all urgency levels and categories.

---

## Running Locally

### Prerequisites
- Node.js v20+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/uplift.git
cd uplift

# Install dependencies
npm install

# Configure your keys (see below)
# Then start the dev server
npm run dev
```

App runs at `http://localhost:5173`

---
### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run preview` | Preview production build locally |

---
## Project Structure

```
src/
├── config/
│   ├── firebase.js          # Firestore connection (gitignored)
│   └── gemini.js            # Gemini API models (gitignored)
├── components/
│   ├── RoleSelection.jsx    # Landing page with animated stats
│   ├── LoginPage.jsx        # Phone + OTP + NGO verification
│   ├── Header.jsx           # Role indicator, language toggle, upload
│   ├── MapView.jsx          # Leaflet map with urgency-coded markers
│   ├── ReportCard.jsx       # Verification queue card with actions
│   ├── InsightModal.jsx     # AI Insight Trace overlay
│   ├── UploadModal.jsx      # Drag-drop upload with progress stepper
│   ├── SOSButton.jsx        # Floating emergency alert button
│   ├── StatusBadge.jsx      # Urgency + status badge components
│   └── Toast.jsx            # Toast notification system
├── pages/
│   ├── NGODashboard.jsx     # Map + Verification Queue layout
│   └── VolunteerChat.jsx    # Chat + Matched Tasks + mini-map
├── hooks/
│   ├── useReports.js        # Firestore real-time listener (falls back to seed data)
│   ├── useUpload.js         # ID-anchored upload + Gemini analysis pipeline
│   └── useChat.js           # Gemini function calling chat agent
├── i18n/
│   ├── LanguageContext.jsx  # React context for EN/HI switching
│   └── translations.js      # Complete EN + HI translation strings
└── utils/
    ├── demoZone.js          # 25 seed reports + geospatial utilities
    ├── geocoding.js         # Nominatim + local fallback lookup table
    └── exportCSV.js         # Report export with Unicode BOM for Excel
```

---

## The "ID Anchor" Pattern

A key technical decision that prevents the most common live-demo failure (frozen progress bars):

```js
// 1. Frontend generates the document ID BEFORE upload begins
const reportId = doc(collection(db, 'reports')).id;

// 2. Image is uploaded to Storage using that same ID as filename
// 3. Firestore listener is attached to reports/{reportId} immediately
// 4. All status updates from the AI pipeline write to that same doc

// Result: the UI is always listening to the exact right document
// from the moment the user clicks upload
```

---

## Built For

Google Solutions Challenge — Problem Statement: *"Design a powerful system that gathers scattered community information to clearly show the most urgent local needs. Build a smart way to quickly match and connect available volunteers with specific tasks and areas where they are needed most."*

---
## Collaborators

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/Samarth230">
        <img src="https://github.com/Samarth230.png" width="80px"/><br/>
        <sub><b>Samarth230</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/rohanrpais">
        <img src="https://github.com/rohanrpais.png" width="80px"/><br/>
        <sub><b>rohanrpais</b></sub>
      </a>
    </td>
    </tr>
</table>

---
## License

MIT
