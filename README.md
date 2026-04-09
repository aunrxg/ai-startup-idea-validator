# 🚀 AI Startup Idea Validator

An AI-powered full-stack application that validates startup ideas and returns structured analysis reports — built for the Schmooze Media technical screening.

---

## 📐 Architecture

```
startup-validator/
├── client/          → Next.js 14 (App Router) — deployed on Vercel
├── server/          → Node.js + Express API  — deployed on Render
└── README.md
```

**AI Model:** Groq API — `llama-3.3-70b-versatile` (free, no card required)  
**Database:** MongoDB Atlas (free M0 cluster)

---

## ⚙️ Prerequisites

- Node.js v18+
- npm v9+
- A [Groq API key](https://console.groq.com) (free, no card needed)
- A [MongoDB Atlas](https://cloud.mongodb.com) connection string (free M0 cluster)

---

## 🛠️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/startup-validator.git
cd startup-validator
```

---

### 2. Set up the backend (`/server`)

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=5000
MONGODB_URI=
GROQ_API_KEY=
```

Start the server:

```bash
npm run dev      # development (nodemon)
npm start        # production
```

Server runs at: `http://localhost:5000`

---

### 3. Set up the frontend (`/client`)

```bash
cd ../client
npm install
```

Create a `.env.local` file in `/client`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/ideas` | Submit idea → triggers AI analysis → saves report |
| `GET` | `/ideas` | Returns list of all saved ideas (summary) |
| `GET` | `/ideas/:id` | Returns full idea with complete AI report |
| `DELETE` | `/ideas/:id` | Deletes an idea (optional) |

### Example `POST /ideas` request body:

```json
{
  "title": "AI Resume Builder",
  "description": "A tool that uses AI to tailor resumes for specific job descriptions automatically."
}
```

### Example response:

```json
{
  "_id": "64abc...",
  "title": "AI Resume Builder",
  "description": "...",
  "report": {
    "problem": "Job seekers spend hours tailoring resumes...",
    "customer": "Recent graduates and professionals aged 22-35...",
    "market": "The global resume builder market is valued at $1.2B...",
    "competitor": [
      { "name": "Zety", "differentiation": "Template-focused, lacks AI tailoring" },
      { "name": "Kickresume", "differentiation": "AI features locked behind paywall" },
      { "name": "Teal", "differentiation": "Job tracking focus, weak resume AI" }
    ],
    "tech_stack": ["Next.js", "OpenAI API", "PostgreSQL", "Tailwind CSS", "Vercel"],
    "risk_level": "Low",
    "profitability_score": 78,
    "justification": "Strong market demand with clear monetization path..."
  },
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🤖 AI Prompt Used

The following system prompt is sent to `llama-3.3-70b-versatile` via Groq:

```md
You are an expert startup consultant. Analyze the given startup idea and return ONLY
a valid JSON object with exactly these fields: problem, customer, market, competitor
(exactly 3 items with name + differentiation), tech_stack (4-6 MVP technologies),
risk_level (Low/Medium/High), profitability_score (0-100 integer), justification.
Return ONLY the JSON. No markdown, no explanation, no backticks.SYSTEM:
You are an expert startup consultant. Analyze the given startup idea and return ONLY a valid JSON object with exactly these fields:
{
  "problem": "2-3 sentence summary of the core problem being solved",
  "customer": "detailed ideal customer persona including age, job, pain points",
  "market": "market size estimate, growth trend, and opportunity",
  "competitor": [
    { "name": "CompetitorName", "differentiation": "one line on how they differ from the idea" },
    { "name": "CompetitorName", "differentiation": "one line on how they differ from the idea" },
    { "name": "CompetitorName", "differentiation": "one line on how they differ from the idea" }
  ],
  "tech_stack": ["Tech1", "Tech2", "Tech3", "Tech4", "Tech5"],
  "risk_level": "Low",
  "profitability_score": 72,
  "justification": "3-4 sentence reasoning covering why this score and risk level were assigned"
}

Hard rules:
- competitor array must have exactly 3 items, no more, no less
- tech_stack must have 4 to 6 practical MVP technologies
- profitability_score must be an integer between 0 and 100
- risk_level must be exactly one of: Low, Medium, High
- Return ONLY the JSON. No markdown fences, no preamble, no explanation.

USER:
Startup Idea Title: {{title}}
Description: {{description}}
```

---

## 🏗️ Tech and Architecture

- **Groq's Llama 3.3 70B**
- **MongoDB Atlas for Database**
- **Next.js for Frontend**
- **Node.js + Express for Backend**

---

## 👤 Author

Built by [Anurag Poddar] · [anuragpoddar9484@gmail.com] · [github.com/aunrxg]