# 🚀 KnowMyRights – Full Stack Legal Assistant Platform

---

# 📌 Project Overview

**KnowMyRights** is a full-stack web application designed to help users understand legal rights in India through an intelligent and interactive platform.

The system integrates AI, real-time communication, public APIs, and browser-based productivity tools into a single unified ecosystem.

---

# 🛠️ Tech Stack

**Frontend:** React.js, Vite, Axios, Socket.IO
**Backend:** Node.js, Express.js, MongoDB
**AI Integration:** OpenRouter GPT API
**Extension:** Chrome Extension (Manifest v3)

---

# 📂 Project Structure

```id="v0az6h"
know-my-rights/
├── frontend/
├── backend/
├── extension/
└── README.md
```

---

# 🎯 TASK IMPLEMENTATION

---

# 🟩 TASK 1: PUBLIC API INTEGRATION

## 🔹 Subtasks

* Fetch data from a public API
* Dynamically display API data
* Ensure responsive UI

## ✅ Solution

A dedicated module integrates a public weather API to fetch real-time environmental data.

### Features:

* Live weather data retrieval
* Dynamic rendering of:

  * 🌡 Temperature
  * 🌬 Wind Speed
* Clean and responsive user interface

## 🎯 Outcome

✔ Seamless API integration
✔ Real-time data updates
✔ Responsive frontend display

---

# 🟩 TASK 2: REAL-TIME CHAT APPLICATION

## 🔹 Subtasks

* Implement WebSocket communication
* Enable live messaging
* Integrate frontend and backend

## ✅ Solution

A real-time chat system is implemented using **Socket.IO**, enabling instant communication between users.

### Features:

* Live message broadcasting
* Instant updates without page refresh
* Efficient client-server communication

## 🎯 Outcome

✔ Fully functional real-time chat
✔ Low-latency communication
✔ Scalable architecture

---

# 🟩 TASK 3: FULL STACK APPLICATION

## 🔹 Subtasks

* Use a modern frontend framework (React)
* Implement backend using Node.js
* Integrate database (MongoDB)
* Build a dynamic and responsive UI

## ✅ Solution

A complete full-stack architecture powers the platform:

### 🖥 Frontend

* Built with React.js
* Multi-page navigation system
* Component-based architecture

### ⚙ Backend

* RESTful API design
* Handles business logic and AI requests

### 🗄 Database

* MongoDB used for structured data storage
* Efficient querying and data retrieval

### 🤖 AI System

* AI-powered assistant provides legal insights
* Generates contextual responses dynamically

## 🎯 Outcome

✔ Robust full-stack system
✔ Scalable and modular design
✔ Dynamic content generation

---

# 🟩 TASK 4: CHROME EXTENSION – PRODUCTIVITY TRACKER

## 🔹 Subtasks

* Track time spent on websites
* Store user activity data
* Display productivity analytics

## ✅ Solution

A Chrome extension is developed to monitor user browsing behavior and provide time-based insights.

### Features:

* Tracks active tab usage ⏱
* Stores data locally using Chrome Storage API
* Displays total time spent via popup interface

## 🎯 Outcome

✔ Background tracking functionality
✔ Accurate time measurement
✔ Lightweight and efficient extension

---

# 🔥 KEY FEATURES

* 🤖 AI-powered legal assistant
* 📚 Legal rights explorer
* 📍 State-wise law insights
* 🌦 Public API data integration
* 💬 Real-time chat system
* 🧩 Chrome productivity extension

---

# ⚙️ HOW TO RUN THE PROJECT

## 1️⃣ Backend Setup

```bash id="twh1cg"
cd backend
npm install
npm start
```

Create `.env` file:

```id="d2d2o1"
MONGO_URI=your_mongodb_connection
OPENROUTER_API_KEY=your_api_key
```

---

## 2️⃣ Frontend Setup

```bash id="iykh8d"
cd frontend
npm install
npm run dev
```

---

## 3️⃣ Chrome Extension Setup

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `extension` folder

---

# 🧠 SYSTEM ARCHITECTURE

* React handles UI and routing
* Express manages APIs and logic
* MongoDB stores application data
* GPT API powers intelligent responses
* Socket.IO enables real-time communication
* Chrome Extension operates independently for tracking

---

# 🎓 FINAL STATUS

🚀 **All required tasks and subtasks have been successfully completed and integrated into a single cohesive system.**

---

# 📌 FUTURE SCOPE

* User authentication system 🔐
* Advanced analytics dashboard 📊
* Improved UI/UX design 🎨
* Cloud deployment ☁️

---

# 🙌 AUTHOR

Developed by **Sambhav** 🚀

---
