## SpecStory

## WhatsApp Scheduling App Development Plan (1/17/2025, 3:12:12 PM)

_**User**_

Follow your memory bank. Then do the following:

**Below is a streamlined summary of your voice note and requirements, followed by a clean, step-by-step prompt you could provide to an LLM or a developer.**

---

## 1. Cleaned-Up Requirements

1. **Goal**  
   - Build a WhatsApp scheduling application that allows scheduling text (MVP) and eventually media (images, videos, audio, polls) to specific WhatsApp groups or individual contacts.

2. **Architecture Overview**  
   - **Server Component** (persistent WhatsApp connection):
     - Maintains the WhatsApp session (using either Python or Node.js, whichever library is more robust/stable for your environment).
     - Receives scheduled messages from the client and sends them at the correct time.
     - Stores and manages data (scheduling info, group lists, etc.).
   - **Client Component** (web application or browser-based UI):
     - Lets you create, schedule, delete, preview, and manage messages in a calendar view.
     - Allows for selecting which groups/contacts to send the message to.
     - Sends scheduling instructions and message data to the server via APIs.

3. **Core MVP Features**  
   - **Text-Only Scheduling**  
     - Create text messages with scheduled send times.  
     - View these scheduled messages on a visual calendar (drag-and-drop or standard date/time picker).
   - **Send to Groups/Individuals**  
     - Pick multiple WhatsApp groups or specific contacts for each scheduled message.
   - **Delete Messages**  
     - Ability to trigger the “delete for everyone” if still within WhatsApp’s allowed timeframe.
   - **Preview & Test**  
     - Option to send a test message to yourself before sending to the group.
   - **Calendar/List View**  
     - See upcoming scheduled posts in multiple views: daily/weekly/monthly or a simple list.
   - **Persistent Server**  
     - The WhatsApp session must remain active so scheduling works 24/7.

4. **Expanded Future Features** (beyond MVP)  
   - Support for images, videos, audio, polls.  
   - Message templates / library of past content.  
   - Categories/tags for different post types.  
   - Automated scheduling suggestions for event promotions.  
   - Advanced analytics and campaign management.

5. **Technology Recommendations**  
   - **Server**  
     - Python + [pywhatkit] or [selenium-web-whatsapp], OR  
     - Node.js + [Baileys] for multi-device WhatsApp API.  
     - A scheduler like `APScheduler` (Python) or `node-cron` (Node) to handle timed sends.  
   - **Client**  
     - A lightweight web app using React (or basic HTML/CSS/JS if you want simplicity).  
     - A UI toolkit (Tailwind CSS, or shadcn/ui) plus [FullCalendar.js] for the scheduling calendar.  
   - **Data Storage**  
     - An SQL or NoSQL DB. For quick prototyping, SQLite can suffice.  
     - Store scheduled messages, group/contacts data, and message history.

6. **Local Development & Deployment**  
   - **Local Dev**: Mac or Windows environment with Node.js or Python installed.  
   - **Deployment**: Likely a Linux VPS or container (e.g., Docker) for the server piece to keep the WhatsApp session active. The client can be served from the same machine or a separate hosting service.

---

## 2. Step-by-Step Prompt for an LLM or Developer

Below is a concise prompt you could provide to an AI or hand to a developer to structure the app’s MVP and plan iterative phases.

> **WhatsApp Scheduler MVP Prompt**  
>  
> 1. **Project Description**:  
>    - I need a WhatsApp scheduling application that sends text messages to multiple groups or individual contacts at specific times. In future versions, it will also handle media (images, videos, audio, polls).  
>  
> 2. **Architecture Requirements**:  
>    - Must include a “Server Component” that retains an active WhatsApp session and handles message sending/deleting.  
>    - Must include a “Client Component” (web UI) that allows scheduling, editing, and previewing messages on a calendar.  
>    - Data is persisted in a database (SQLite for MVP is acceptable).  
>  
> 3. **MVP Feature Requirements**:  
>    - Text-only scheduling.  
>    - Send to multiple groups/contacts.  
>    - Visual calendar UI for scheduling.  
>    - Delete scheduled messages if needed (with “delete for everyone” option, respecting WhatsApp’s time limit).  
>    - Send a test message to the user’s own WhatsApp.  
>    - Ability to handle persistent WhatsApp session (24/7).  
>  
> 4. **Libraries & Technologies**:  
>    - Evaluate:  
>      - **Server**:  
>        - Python + pywhatkit / selenium.  
>        - Node.js + Baileys.  
>      - **Client**:  
>        - React + Tailwind CSS + FullCalendar.js.  
>        - Alternatively, minimal HTML/JS + existing drag/drop calendar library.  
>      - **Scheduling**: APScheduler (Python) or node-cron (Node).  
>      - **Database**: SQLite for prototyping.  
>  
> 5. **Implementation Plan**:  
>    **Stage 1: Server Setup**  
>      - Pick WhatsApp library (Python or Node).  
>      - Implement basic WhatsApp authentication & session.  
>      - Create minimal APIs (POST /api/messages, GET /api/messages, DELETE /api/messages/:id).  
>      - Integrate a basic scheduling job for sending messages at the correct time.  
>    
>    **Stage 2: Client Setup**  
>      - Build a simple web interface (React or plain HTML/CSS/JS).  
>      - Integrate a calendar library (FullCalendar.js).  
>      - Implement form for scheduling new textual messages (time, recipients, content).  
>      - Call server APIs to create/list/delete scheduled messages.  
>      - Add a “send test to self” button.  
>    
>    **Stage 3: Polishing**  
>      - Improve error handling & notifications.  
>      - Refine calendar UI (drag-and-drop or better date/time pickers).  
>      - Basic responsive design for mobile use.  
>    
>    **Stage 4: Next Phases**  
>      - Media support (images, video, audio).  
>      - Template/library of past messages.  
>      - Categories & tags for more advanced organization.  
>      - Automated scheduling suggestions for event-based marketing.  
>      - Analytics & reporting (message success logs, read confirmations, etc.).  
>  
> 6. **Environment & Testing**:  
>    - **Local**:  
>      - Develop on Mac/Windows with Node.js or Python.  
>      - Use a local SQLite DB for quick iteration.  
>      - For the WhatsApp session, keep the console open to scan a QR code or store credentials for persistent login.  
>    - **Server Deployment**:  
>      - Host on a Linux VPS or container.  
>      - Keep the process running using PM2 (Node) or a systemd service (Python).  
>      - Expose client from the same server or a separate hosting service.  
>  
> 7. **Success Criteria**:  
>    - Ability to schedule text messages (single or multiple recipients) via a user-friendly calendar UI.  
>    - Reliable, persistent WhatsApp session that sends out messages on time.  
>    - Delete functionality within WhatsApp’s “delete for everyone” timeframe.  
>    - Clear logs and error-handling to track message sends.  
>  
> 8. **Questions & Clarifications**:  
>    - Which WhatsApp library or approach (Python vs. Node) best suits our hosting environment?  
>    - How robust does the scheduling need to be (e.g., recurring tasks, advanced triggers)?  
>    - How will user authentication and roles be handled (single admin user vs. multi-tenant)?  
>    - Confirm that once the MVP is stable, we aim to expand into media messages, categories, analytics, etc.

---

### How to Use this Prompt
You can copy/paste this prompt into your conversation with an LLM or hand it off to a developer. It concisely captures the MVP scope and planned architecture. From there, you can iterate on details like choice of WhatsApp library, hosting provider, and user authentication specifics.

---

## 3. Notes on Best Libraries
- **Python**  
  - [pywhatkit]: Quick scripts, good for simple text-based tasks, but less robust on multi-device scenarios.  
  - Selenium-based solutions: May be heavier to maintain (headless browser), but can work if multi-device libraries are not reliable.  
- **Node.js**  
  - [Baileys]: Actively maintained, specifically built for multi-device WhatsApp. Has robust community support and well-documented capabilities.

Given your Mac development environment and eventual Linux server deployment, you can use either ecosystem comfortably. Choose whichever stack aligns with your team’s skills and preferences.

---

**That’s the concise layout**—it should be clear, testable locally, and easily deployed once stable. Feel free to refine each stage as you progress!


---

_**Assistant**_

I'll help set up the Memory Bank and then proceed with the project setup. First, let me create the necessary documentation structure.

Let me check if the `docs` directory exists.

---

_**Assistant**_



---

_**Assistant**_



I'll create the Memory Bank documentation structure. Let me create each required file with the essential information from your requirements.

---

_**Assistant**_

```
# Product Context

## Purpose
The WhatsApp Super Scheduler exists to solve the challenge of scheduling and automating WhatsApp messages for businesses and individuals who need to send messages at specific times to multiple groups or contacts.

## Problems Solved
1. Manual Message Sending: Eliminates the need to manually send messages at specific times
2. Group Management: Enables sending to multiple groups/contacts simultaneously
3. Message Planning: Provides calendar-based visualization of scheduled messages
4. Consistency: Ensures messages are sent at exactly the right time, every time

## Core Functionality
1. **Message Scheduling**
   - Schedule text messages (MVP)
   - Future support for media (images, videos, audio, polls)
   - Calendar-based interface for message management

2. **Recipient Management**
   - Send to multiple WhatsApp groups
   - Send to individual contacts
   - Preview and test functionality

3. **Message Control**
   - Create scheduled messages
   - Delete messages (including "delete for everyone" feature)
   - View scheduled messages in calendar/list format

## Success Metrics
1. Reliable message delivery at scheduled times
2. Persistent WhatsApp session maintenance
3. User-friendly scheduling interface
4. Successful message deletion within WhatsApp's timeframe
```

---

_**Assistant**_

```
# System Patterns

## Architecture Overview

### Two-Component System
1. **Server Component**
   - Maintains persistent WhatsApp session
   - Handles message scheduling and delivery
   - Manages data storage
   - Provides REST API endpoints

2. **Client Component**
   - Web-based user interface
   - Calendar visualization
   - Message management interface

## Technical Decisions

### Backend Technology Stack
- Language: Node.js with Baileys OR Python with pywhatkit
- Database: SQLite (MVP), potential migration path to PostgreSQL
- Scheduler: node-cron (Node.js) OR APScheduler (Python)
- API: RESTful endpoints for message management

### Frontend Technology Stack
- Framework: React
- UI Components: Tailwind CSS
- Calendar: FullCalendar.js
- State Management: React Context/Redux

## Design Patterns

### Message Scheduling Pattern
1. Client creates message with metadata
2. Server stores in database
3. Scheduler monitors for pending messages
4. WhatsApp session executes messages at scheduled time

### Session Management Pattern
1. Persistent WhatsApp session maintained
2. Automatic reconnection on disconnection
3. QR code re-authentication when needed

### Data Storage Pattern
1. Messages table: content, schedule, status
2. Recipients table: groups and contacts
3. Audit log: delivery status and history
```

---

_**Assistant**_

```
# Technical Context

## Development Environment
- OS: macOS (development), Linux (deployment)
- Runtime: Node.js or Python
- Database: SQLite (local development)
- Version Control: Git

## Technical Requirements

### Server Requirements
- Persistent process management
- WhatsApp session maintenance
- Database connection handling
- Scheduler service
- REST API endpoints

### Client Requirements
- Modern browser support
- Responsive design
- Calendar interface
- Form validation
- Real-time status updates

## Technical Constraints

### WhatsApp Limitations
- Message deletion time window
- Media size limits
- Rate limiting considerations
- Session management requirements

### System Limitations
- Single WhatsApp account per instance
- Database scalability (SQLite)
- Local file system dependencies
- Memory usage for persistent session

## Development Setup
1. Local environment setup
   - Install Node.js/Python
   - Setup SQLite
   - Configure development tools

2. WhatsApp Authentication
   - QR code scanning process
   - Session persistence handling

3. Development Workflow
   - Local testing procedures
   - Database migrations
   - API testing
```

---

_**Assistant**_

```
# Active Context

## Current Phase
Initial project setup and architecture planning

## Recent Actions
1. Created Memory Bank documentation structure
2. Documented core system requirements
3. Defined technical architecture

## Current Focus
Setting up the initial project structure and choosing between:
- Node.js + Baileys
- Python + pywhatkit

## Next Steps
1. Choose and set up backend technology stack
2. Create basic project structure
3. Implement WhatsApp authentication
4. Set up database schema
5. Create initial API endpoints

## Open Questions
1. Which WhatsApp library provides better stability?
2. How to handle session persistence effectively?
3. Best practices for scheduler implementation?

## Current Blockers
None - Ready to proceed with initial setup
```

---

_**Assistant**_

```
# Project Progress

## Completed
1. Initial requirements gathering
2. Architecture planning
3. Memory Bank documentation setup

## In Progress
1. Technology stack selection
2. Project structure setup

## Upcoming
### Phase 1: Foundation
- [ ] Choose and set up backend framework
- [ ] Initialize project repository
- [ ] Set up development environment
- [ ] Create database schema
- [ ] Implement basic API structure

### Phase 2: Core Features
- [ ] WhatsApp session management
- [ ] Message scheduling system
- [ ] Basic web interface
- [ ] Calendar integration
- [ ] Message CRUD operations

### Phase 3: Enhancement
- [ ] User authentication
- [ ] Advanced scheduling features
- [ ] Message templates
- [ ] Error handling and logging
- [ ] Testing suite

## Future Features (Post-MVP)
1. Media message support
2. Message templates library
3. Advanced analytics
4. Campaign management
5. Multi-user support
```

---

_**Assistant**_



I've created the complete Memory Bank structure with all required documentation files. Based on the requirements and technical considerations, I recommend proceeding with Node.js + Baileys for the following reasons:

1. Better multi-device support
2. Active community maintenance
3. More robust WebSocket handling
4. Better documentation and examples

Would you like me to proceed with setting up the initial project structure using Node.js and Baileys?

---

_**User**_

yes go ahead

---

_**Assistant**_

I'll start setting up the initial project structure using Node.js and Baileys. First, let's initialize the project and install the necessary dependencies.

---

_**Assistant**_

```
npm init -y
```

---

_**Assistant**_



Now, let's install the core dependencies we'll need:

---

_**Assistant**_

```
npm install @whiskeysockets/baileys sqlite3 express node-cron dotenv
```

---

_**Assistant**_



Let's create the basic project structure. I'll create the necessary directories and initial files:

---

_**Assistant**_

```
mkdir -p src/{config,controllers,models,routes,services,utils} && touch src/index.js src/config/database.js src/config/whatsapp.js .env.example .gitignore README.md
```

---

_**Assistant**_







Now, let's create the initial configuration files. First, let's set up the `.gitignore`:

---

_**Assistant**_

```
# Dependencies
node_modules/

# Environment variables
.env

# WhatsApp session data
sessions/

# Database
*.sqlite
*.sqlite3

# Logs
logs/
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/
*.swp
*.swo

# Build
dist/
build/
```

---

_**Assistant**_







Now, let's create the environment variables template:

---

_**Assistant**_

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_PATH=./data/scheduler.sqlite

# WhatsApp Configuration
WA_SESSION_DIR=./sessions
WA_RECONNECT_INTERVAL=5000

# Security
API_KEY=your_api_key_here
```

---

_**Assistant**_











Let's create the main database configuration:

---

_**Assistant**_

```
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/scheduler.sqlite');

// Ensure the data directory exists
const fs = require('fs');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
    initializeDatabase();
});

function initializeDatabase() {
    db.serialize(() => {
        // Messages table
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            schedule_time DATETIME NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Recipients table
        db.run(`CREATE TABLE IF NOT EXISTS recipients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id INTEGER,
            recipient_type TEXT NOT NULL,
            recipient_id TEXT NOT NULL,
            FOREIGN KEY (message_id) REFERENCES messages(id)
        )`);

        // Message logs table
        db.run(`CREATE TABLE IF NOT EXISTS message_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id INTEGER,
            recipient_id INTEGER,
            status TEXT NOT NULL,
            error TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (message_id) REFERENCES messages(id),
            FOREIGN KEY (recipient_id) REFERENCES recipients(id)
        )`);
    });
}

module.exports = db;
```

---

_**Assistant**_











Now, let's create the WhatsApp configuration:

---

_**Assistant**_

```
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const path = require('path');
require('dotenv').config();

const sessionDir = process.env.WA_SESSION_DIR || path.join(__dirname, '../../sessions');
const reconnectInterval = parseInt(process.env.WA_RECONNECT_INTERVAL) || 5000;

let sock = null;
let isConnected = false;

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        defaultQueryTimeoutMs: undefined
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to:', lastDisconnect?.error, 'Reconnecting:', shouldReconnect);
            
            isConnected = false;
            
            if (shouldReconnect) {
                setTimeout(connectToWhatsApp, reconnectInterval);
            }
        } else if (connection === 'open') {
            console.log('WhatsApp connection established');
            isConnected = true;
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

async function sendMessage(jid, content) {
    if (!isConnected) {
        throw new Error('WhatsApp is not connected');
    }

    try {
        const result = await sock.sendMessage(jid, { text: content });
        return result;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

module.exports = {
    connectToWhatsApp,
    sendMessage,
    isConnected: () => isConnected
};
```

---

_**Assistant**_















Finally, let's create the main application entry point:

---

_**Assistant**_

```
const express = require('express');
const { connectToWhatsApp } = require('./config/whatsapp');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic security middleware
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Initialize WhatsApp connection
connectToWhatsApp().catch(err => {
    console.error('Error initializing WhatsApp:', err);
    process.exit(1);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

---

_**Assistant**_











Let's update the package.json with proper scripts and metadata:

---

_**Assistant**_

```
{
  "name": "wa-super-scheduler",
  "version": "1.0.0",
  "description": "WhatsApp message scheduling system for automated message delivery",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "whatsapp",
    "scheduler",
    "automation",
    "messaging"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@whiskeysockets/baileys": "^6.5.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "node-cron": "^3.0.2",
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

---

_**Assistant**_







Let's install the development dependency (nodemon):

---

_**Assistant**_

```
npm install --save-dev nodemon
```

---

_**Assistant**_











Let's create a README.md with setup instructions:

---

_**Assistant**_

```
# WhatsApp Super Scheduler

A powerful WhatsApp message scheduling system that allows you to schedule and automate message delivery to WhatsApp groups and individual contacts.

## Features

- Schedule text messages to be sent at specific times
- Send to multiple WhatsApp groups or contacts simultaneously
- Calendar-based message management interface
- Preview and test messages before scheduling
- Delete scheduled messages
- Persistent WhatsApp session management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A WhatsApp account
- SQLite3

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wa-super-scheduler.git
   cd wa-super-scheduler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

## Production

Start the production server:
```bash
npm start
```

## WhatsApp Authentication

1. Start the server
2. Scan the QR code that appears in the terminal with your WhatsApp
3. The session will be saved automatically

## API Documentation

### Authentication
All API endpoints require an API key header:
```
X-API-KEY: your_api_key_here
```

### Endpoints

- `GET /health` - Check server status
- More endpoints coming soon...

## Project Structure

```
wa-super-scheduler/
├── src/
│   ├── config/      # Configuration files
│   ├── controllers/ # Route controllers
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── services/    # Business logic
│   └── utils/       # Utility functions
├── docs/           # Documentation
├── sessions/       # WhatsApp session data
└── data/          # SQLite database
```

## License

ISC
```

---

_**Assistant**_



I've set up the initial project structure with:

1. Core dependencies installed
2. Basic project structure created
3. Configuration files for database and WhatsApp
4. Environment variable templates
5. Basic Express server setup
6. Development scripts and documentation

Next steps:
1. Create the message scheduling service
2. Implement the REST API endpoints
3. Set up the message queue system
4. Add message validation and error handling

Would you like me to proceed with implementing any of these next steps?

Let me update the `activeContext.md` to reflect our progress:

---

_**Assistant**_

```
# Active Context

## Current Phase
Backend foundation implementation

## Recent Actions
1. Set up Node.js project structure
2. Installed core dependencies
3. Created configuration files
4. Implemented basic WhatsApp connection
5. Set up database schema
6. Created basic Express server

## Current Focus
Implementing core backend functionality:
- Message scheduling service
- REST API endpoints
- Message queue system
- Error handling

## Next Steps
1. Implement message scheduling service
2. Create REST API endpoints for message management
3. Set up message queue for reliable delivery
4. Add comprehensive error handling
5. Implement message validation

## Open Questions
1. How to handle WhatsApp rate limiting?
2. Best practices for message queue implementation?
3. How to handle failed message delivery?

## Current Blockers
None - Ready to proceed with core functionality implementation
```

---

_**Assistant**_



Let me know which part of the core functionality you'd like me to implement next!

---

_**User**_

lets first go ahead and set up a git repo under my nerveband username. commit and push changes. then lets proceed. every round after that, once we are done with a set of changes, we update memory bank, commit and push

---

_**Assistant**_

I'll help you set up the Git repository and push the initial changes.

First, let's initialize the Git repository and make the initial commit:

---

_**Assistant**_

```
git init && git add . && git commit -m "Initial commit: Basic project setup with WhatsApp integration"
```

---

_**Assistant**_



Let's rename the default branch to 'main' as it's the more modern convention:

---

_**Assistant**_

```
git branch -M main
```

---

_**Assistant**_







Now, let's create a new repository on GitHub under your username and push the code. First, let's create the remote:

---

_**Assistant**_

```
git remote add origin https://github.com/nerveband/wa-super-scheduler.git
```

---

_**Assistant**_







Now, let's push the code to GitHub:

---

_**Assistant**_

```
git push -u origin main
```

---

_**Assistant**_



I see that the repository doesn't exist yet on GitHub. You'll need to:

1. Go to https://github.com/new
2. Create a new repository named "wa-super-scheduler"
3. Don't initialize it with any files (no README, no .gitignore)
4. Once created, come back here and let me know

After you create the repository on GitHub, I'll help you push the code. Would you like to do that now?

---

_**User**_

done just did it

---

_**Assistant**_

Great! Now let's push the code to your newly created repository:

---

_**Assistant**_

```
git push -u origin main
```

---

_**Assistant**_



I see there might be some initial files in the repository. Let's pull first and then push:

---

_**Assistant**_

```
git pull origin main --allow-unrelated-histories
```

---

_**Assistant**_







Let's configure git to use merge strategy and try again:

---

_**Assistant**_

```
git config pull.rebase false && git pull origin main --allow-unrelated-histories
```

---

_**Assistant**_



---

_**User**_

just ignore whats there, reject it, and overwrite

---

_**Assistant**_



Alright, let's force push our local code to overwrite what's on GitHub:

---

_**Assistant**_

```
git push -f origin main
```

---

_**Assistant**_



Perfect! The code has been successfully pushed to GitHub. Now we have our repository set up with:
1. Initial project structure
2. Basic WhatsApp integration
3. Database configuration
4. Memory Bank documentation

Would you like to proceed with implementing the message scheduling service next? This would involve:
1. Creating the message scheduling service
2. Setting up the message queue system
3. Implementing the scheduling endpoints
4. Adding message validation

Let me know which part you'd like to tackle first!

---

_**User**_

start with task 1, and please go ahead and add my name Ashraf Ali and website (https://ashrafali.net) as author, credit me in the readme. remember after you implement, update the readme, up the version, commit, and push. 

also, here is documentation for whiskeysockets/baileys whatsapp library:

Title: GitHub - WhiskeySockets/Baileys: Lightweight full-featured typescript/javascript WhatsApp Web API

URL Source: https://github.com/WhiskeySockets/Baileys?

Markdown Content:
Baileys - Typescript/Javascript WhatsApp Web API


--------------------------------------------------

[](https://github.com/WhiskeySockets/Baileys#baileys---typescriptjavascript-whatsapp-web-api)

[![Image 23: GitHub Downloads (all assets, all releases)](https://camo.githubusercontent.com/e0843bc306131cc9ed2b9eace20ef6cbda9dc17d49cf26ab26fb862b105faaad/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f646f776e6c6f6164732f776869736b6579736f636b6574732f6261696c6579732f746f74616c)](https://camo.githubusercontent.com/e0843bc306131cc9ed2b9eace20ef6cbda9dc17d49cf26ab26fb862b105faaad/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f646f776e6c6f6164732f776869736b6579736f636b6574732f6261696c6579732f746f74616c) [![Image 24: NPM Downloads](https://camo.githubusercontent.com/e926ee02fdf841e2e806720c24901615601ce3fd80fd9d22d8956c0fd3b1ba19/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64772f253430776869736b6579736f636b6574732532466261696c6579733f6c6162656c3d6e706d26636f6c6f723d253233434233383337)](https://camo.githubusercontent.com/e926ee02fdf841e2e806720c24901615601ce3fd80fd9d22d8956c0fd3b1ba19/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64772f253430776869736b6579736f636b6574732532466261696c6579733f6c6162656c3d6e706d26636f6c6f723d253233434233383337) [![Image 25: GitHub code size in bytes](https://camo.githubusercontent.com/384d4d39c897b0a033d8a4c6f74d1e9e3f2765bb3c2f21928f5d9f0a5d9d1466/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c616e6775616765732f636f64652d73697a652f776869736b6579736f636b6574732f6261696c657973)](https://camo.githubusercontent.com/384d4d39c897b0a033d8a4c6f74d1e9e3f2765bb3c2f21928f5d9f0a5d9d1466/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c616e6775616765732f636f64652d73697a652f776869736b6579736f636b6574732f6261696c657973) [![Image 26: GitHub License](https://camo.githubusercontent.com/911f1ebcc883bd5e19ea210996f2a9c96e3466ac82038e3b1e9e17a6685c6bed/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f776869736b6579736f636b6574732f6261696c657973)](https://camo.githubusercontent.com/911f1ebcc883bd5e19ea210996f2a9c96e3466ac82038e3b1e9e17a6685c6bed/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f776869736b6579736f636b6574732f6261696c657973) [![Image 27: Discord](https://camo.githubusercontent.com/93866cb101e66a9db07eaeea9c4315e2cd9041f4b56260d6a26adc2397134310/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f3732353833393830363038343534363631303f6c6162656c3d646973636f726426636f6c6f723d253233353836354632)](https://camo.githubusercontent.com/93866cb101e66a9db07eaeea9c4315e2cd9041f4b56260d6a26adc2397134310/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f3732353833393830363038343534363631303f6c6162656c3d646973636f726426636f6c6f723d253233353836354632) [![Image 28: GitHub Repo stars](https://camo.githubusercontent.com/606a4a6ae4eefe4e2cbcb6db377e0e751403201de1896be4e3a06d9f067c948c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f776869736b6579736f636b6574732f6261696c657973)](https://camo.githubusercontent.com/606a4a6ae4eefe4e2cbcb6db377e0e751403201de1896be4e3a06d9f067c948c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f776869736b6579736f636b6574732f6261696c657973) [![Image 29: GitHub forks](https://camo.githubusercontent.com/5705874a26dfb2cc0081e7feafb1c16053f6977e2dc1657af7b5fd835682e3e8/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f666f726b732f776869736b6579736f636b6574732f6261696c657973)](https://camo.githubusercontent.com/5705874a26dfb2cc0081e7feafb1c16053f6977e2dc1657af7b5fd835682e3e8/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f666f726b732f776869736b6579736f636b6574732f6261696c657973)

### Important Note

[](https://github.com/WhiskeySockets/Baileys#important-note)

This library was originally a project for **CS-2362 at Ashoka University** and is in no way affiliated with or endorsed by WhatsApp. Use at your own discretion. Do not spam people with this. We discourage any stalkerware, bulk or automated messaging usage.

#### Liability and License Notice

[](https://github.com/WhiskeySockets/Baileys#liability-and-license-notice)

Baileys and its maintainers cannot be held liable for misuse of this application, as stated in the [MIT license](https://github.com/WhiskeySockets/Baileys/blob/master/LICENSE). The maintainers of Baileys do not in any way condone the use of this application in practices that violate the Terms of Service of WhatsApp. The maintainers of this application call upon the personal responsibility of its users to use this application in a fair way, as it is intended to be used.

*   Baileys does not require Selenium or any other browser to be interface with WhatsApp Web, it does so directly using a **WebSocket**.
*   Not running Selenium or Chromimum saves you like **half a gig** of ram :/
*   Baileys supports interacting with the multi-device & web versions of WhatsApp.
*   Thank you to [@pokearaujo](https://github.com/pokearaujo/multidevice) for writing his observations on the workings of WhatsApp Multi-Device. Also, thank you to [@Sigalor](https://github.com/sigalor/whatsapp-web-reveng) for writing his observations on the workings of WhatsApp Web and thanks to [@Rhymen](https://github.com/Rhymen/go-whatsapp/) for the **go** implementation.

Important

The original repository had to be removed by the original author - we now continue development in this repository here. This is the only official repository and is maintained by the community. **Join the Discord [here](https://discord.gg/WeJM5FP9GG)**

Example
-------

[](https://github.com/WhiskeySockets/Baileys#example)

Do check out & run [example.ts](https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts) to see an example usage of the library. The script covers most common use cases. To run the example script, download or clone the repo and then type the following in a terminal:

1.  `cd path/to/Baileys`
2.  `yarn`
3.  `yarn example`

Install
-------

[](https://github.com/WhiskeySockets/Baileys#install)

Use the stable version:

```
yarn add @whiskeysockets/baileys
```

Use the edge version (no guarantee of stability, but latest fixes + features)

```
yarn add github:WhiskeySockets/Baileys
```

Then import your code using:

import makeWASocket from '@whiskeysockets/baileys'

Links
-----

[](https://github.com/WhiskeySockets/Baileys#links)

*   [Discord](https://discord.gg/WeJM5FP9GG)
*   [Docs](https://guide.whiskeysockets.io/)

Index
-----

[](https://github.com/WhiskeySockets/Baileys#index)

*   [Connecting Account](https://github.com/WhiskeySockets/Baileys#connecting-account)
    
    *   [Connect with QR-CODE](https://github.com/WhiskeySockets/Baileys#starting-socket-with-qr-code)
    *   [Connect with Pairing Code](https://github.com/WhiskeySockets/Baileys#starting-socket-with-pairing-code)
    *   [Receive Full History](https://github.com/WhiskeySockets/Baileys#receive-full-history)
*   [Important Notes About Socket Config](https://github.com/WhiskeySockets/Baileys#important-notes-about-socket-config)
    
    *   [Caching Group Metadata (Recommended)](https://github.com/WhiskeySockets/Baileys#caching-group-metadata-recommended)
    *   [Improve Retry System & Decrypt Poll Votes](https://github.com/WhiskeySockets/Baileys#improve-retry-system--decrypt-poll-votes)
    *   [Receive Notifications in Whatsapp App](https://github.com/WhiskeySockets/Baileys#receive-notifications-in-whatsapp-app)
*   [Save Auth Info](https://github.com/WhiskeySockets/Baileys#saving--restoring-sessions)
    
*   [Handling Events](https://github.com/WhiskeySockets/Baileys#handling-events)
    
    *   [Example to Start](https://github.com/WhiskeySockets/Baileys#example-to-start)
    *   [Decrypt Poll Votes](https://github.com/WhiskeySockets/Baileys#decrypt-poll-votes)
    *   [Summary of Events on First Connection](https://github.com/WhiskeySockets/Baileys#summary-of-events-on-first-connection)
*   [Implementing a Data Store](https://github.com/WhiskeySockets/Baileys#implementing-a-data-store)
    
*   [Whatsapp IDs Explain](https://github.com/WhiskeySockets/Baileys#whatsapp-ids-explain)
    
*   [Utility Functions](https://github.com/WhiskeySockets/Baileys#utility-functions)
    
*   [Sending Messages](https://github.com/WhiskeySockets/Baileys#sending-messages)
    
    *   [Non-Media Messages](https://github.com/WhiskeySockets/Baileys#non-media-messages)
        *   [Text Message](https://github.com/WhiskeySockets/Baileys#text-message)
        *   [Quote Message](https://github.com/WhiskeySockets/Baileys#quote-message-works-with-all-types)
        *   [Mention User](https://github.com/WhiskeySockets/Baileys#mention-user-works-with-most-types)
        *   [Forward Messages](https://github.com/WhiskeySockets/Baileys#forward-messages)
        *   [Location Message](https://github.com/WhiskeySockets/Baileys#location-message)
        *   [Contact Message](https://github.com/WhiskeySockets/Baileys#contact-message)
        *   [Reaction Message](https://github.com/WhiskeySockets/Baileys#reaction-message)
        *   [Pin Message](https://github.com/WhiskeySockets/Baileys#pin-message)
        *   [Poll Message](https://github.com/WhiskeySockets/Baileys#poll-message)
    *   [Sending with Link Preview](https://github.com/WhiskeySockets/Baileys#sending-messages-with-link-previews)
    *   [Media Messages](https://github.com/WhiskeySockets/Baileys#media-messages)
        *   [Gif Message](https://github.com/WhiskeySockets/Baileys#gif-message)
        *   [Video Message](https://github.com/WhiskeySockets/Baileys#video-message)
        *   [Audio Message](https://github.com/WhiskeySockets/Baileys#audio-message)
        *   [Image Message](https://github.com/WhiskeySockets/Baileys#image-message)
        *   [ViewOnce Message](https://github.com/WhiskeySockets/Baileys#view-once-message)
*   [Modify Messages](https://github.com/WhiskeySockets/Baileys#modify-messages)
    
    *   [Delete Messages (for everyone)](https://github.com/WhiskeySockets/Baileys#deleting-messages-for-everyone)
    *   [Edit Messages](https://github.com/WhiskeySockets/Baileys#editing-messages)
*   [Manipulating Media Messages](https://github.com/WhiskeySockets/Baileys#manipulating-media-messages)
    
    *   [Thumbnail in Media Messages](https://github.com/WhiskeySockets/Baileys#thumbnail-in-media-messages)
    *   [Downloading Media Messages](https://github.com/WhiskeySockets/Baileys#downloading-media-messages)
    *   [Re-upload Media Message to Whatsapp](https://github.com/WhiskeySockets/Baileys#re-upload-media-message-to-whatsapp)
*   [Reject Call](https://github.com/WhiskeySockets/Baileys#reject-call)
    
*   [Send States in Chat](https://github.com/WhiskeySockets/Baileys#send-states-in-chat)
    
    *   [Reading Messages](https://github.com/WhiskeySockets/Baileys#reading-messages)
    *   [Update Presence](https://github.com/WhiskeySockets/Baileys#update-presence)
*   [Modifying Chats](https://github.com/WhiskeySockets/Baileys#modifying-chats)
    
    *   [Archive a Chat](https://github.com/WhiskeySockets/Baileys#archive-a-chat)
    *   [Mute/Unmute a Chat](https://github.com/WhiskeySockets/Baileys#muteunmute-a-chat)
    *   [Mark a Chat Read/Unread](https://github.com/WhiskeySockets/Baileys#mark-a-chat-readunread)
    *   [Delete a Message for Me](https://github.com/WhiskeySockets/Baileys#delete-a-message-for-me)
    *   [Delete a Chat](https://github.com/WhiskeySockets/Baileys#delete-a-chat)
    *   [Star/Unstar a Message](https://github.com/WhiskeySockets/Baileys#starunstar-a-message)
    *   [Disappearing Messages](https://github.com/WhiskeySockets/Baileys#disappearing-messages)
*   [User Querys](https://github.com/WhiskeySockets/Baileys#user-querys)
    
    *   [Check If ID Exists in Whatsapp](https://github.com/WhiskeySockets/Baileys#check-if-id-exists-in-whatsapp)
    *   [Query Chat History (groups too)](https://github.com/WhiskeySockets/Baileys#query-chat-history-groups-too)
    *   [Fetch Status](https://github.com/WhiskeySockets/Baileys#fetch-status)
    *   [Fetch Profile Picture (groups too)](https://github.com/WhiskeySockets/Baileys#fetch-profile-picture-groups-too)
    *   [Fetch Bussines Profile (such as description or category)](https://github.com/WhiskeySockets/Baileys#fetch-bussines-profile-such-as-description-or-category)
    *   [Fetch Someone's Presence (if they're typing or online)](https://github.com/WhiskeySockets/Baileys#fetch-someones-presence-if-theyre-typing-or-online)
*   [Change Profile](https://github.com/WhiskeySockets/Baileys#change-profile)
    
    *   [Change Profile Status](https://github.com/WhiskeySockets/Baileys#change-profile-status)
    *   [Change Profile Name](https://github.com/WhiskeySockets/Baileys#change-profile-name)
    *   [Change Display Picture (groups too)](https://github.com/WhiskeySockets/Baileys#change-display-picture-groups-too)
    *   [Remove display picture (groups too)](https://github.com/WhiskeySockets/Baileys#remove-display-picture-groups-too)
*   [Groups](https://github.com/WhiskeySockets/Baileys#groups)
    
    *   [Create a Group](https://github.com/WhiskeySockets/Baileys#create-a-group)
    *   [Add/Remove or Demote/Promote](https://github.com/WhiskeySockets/Baileys#addremove-or-demotepromote)
    *   [Change Subject (name)](https://github.com/WhiskeySockets/Baileys#change-subject-name)
    *   [Change Description](https://github.com/WhiskeySockets/Baileys#change-description)
    *   [Change Settings](https://github.com/WhiskeySockets/Baileys#change-settings)
    *   [Leave a Group](https://github.com/WhiskeySockets/Baileys#leave-a-group)
    *   [Get Invite Code](https://github.com/WhiskeySockets/Baileys#get-invite-code)
    *   [Revoke Invite Code](https://github.com/WhiskeySockets/Baileys#revoke-invite-code)
    *   [Join Using Invitation Code](https://github.com/WhiskeySockets/Baileys#join-using-invitation-code)
    *   [Get Group Info by Invite Code](https://github.com/WhiskeySockets/Baileys#get-group-info-by-invite-code)
    *   [Query Metadata (participants, name, description...)](https://github.com/WhiskeySockets/Baileys#query-metadata-participants-name-description)
    *   [Join using groupInviteMessage](https://github.com/WhiskeySockets/Baileys#join-using-groupinvitemessage)
    *   [Get Request Join List](https://github.com/WhiskeySockets/Baileys#get-request-join-list)
    *   [Approve/Reject Request Join](https://github.com/WhiskeySockets/Baileys#approvereject-request-join)
    *   [Get All Participating Groups Metadata](https://github.com/WhiskeySockets/Baileys#get-all-participating-groups-metadata)
    *   [Toggle Ephemeral](https://github.com/WhiskeySockets/Baileys#toggle-ephemeral)
    *   [Change Add Mode](https://github.com/WhiskeySockets/Baileys#change-add-mode)
*   [Privacy](https://github.com/WhiskeySockets/Baileys#privacy)
    
    *   [Block/Unblock User](https://github.com/WhiskeySockets/Baileys#blockunblock-user)
    *   [Get Privacy Settings](https://github.com/WhiskeySockets/Baileys#get-privacy-settings)
    *   [Get BlockList](https://github.com/WhiskeySockets/Baileys#get-blocklist)
    *   [Update LastSeen Privacy](https://github.com/WhiskeySockets/Baileys#update-lastseen-privacy)
    *   [Update Online Privacy](https://github.com/WhiskeySockets/Baileys#update-online-privacy)
    *   [Update Profile Picture Privacy](https://github.com/WhiskeySockets/Baileys#update-profile-picture-privacy)
    *   [Update Status Privacy](https://github.com/WhiskeySockets/Baileys#update-status-privacy)
    *   [Update Read Receipts Privacy](https://github.com/WhiskeySockets/Baileys#update-read-receipts-privacy)
    *   [Update Groups Add Privacy](https://github.com/WhiskeySockets/Baileys#update-groups-add-privacy)
    *   [Update Default Disappearing Mode](https://github.com/WhiskeySockets/Baileys#update-default-disappearing-mode)
*   [Broadcast Lists & Stories](https://github.com/WhiskeySockets/Baileys#broadcast-lists--stories)
    
    *   [Send Broadcast & Stories](https://github.com/WhiskeySockets/Baileys#send-broadcast--stories)
    *   [Query a Broadcast List's Recipients & Name](https://github.com/WhiskeySockets/Baileys#query-a-broadcast-lists-recipients--name)
*   [Writing Custom Functionality](https://github.com/WhiskeySockets/Baileys#writing-custom-functionality)
    
    *   [Enabling Debug Level in Baileys Logs](https://github.com/WhiskeySockets/Baileys#enabling-debug-level-in-baileys-logs)
    *   [How Whatsapp Communicate With Us](https://github.com/WhiskeySockets/Baileys#how-whatsapp-communicate-with-us)
    *   [Register a Callback for Websocket Events](https://github.com/WhiskeySockets/Baileys#register-a-callback-for-websocket-events)

Connecting Account
------------------

[](https://github.com/WhiskeySockets/Baileys#connecting-account)

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code** with WhatsApp on your phone.

Note

**[Here](https://github.com/WhiskeySockets/Baileys#example-to-start) is a simple example of event handling**

Tip

**You can see all supported socket configs [here](https://baileys.whiskeysockets.io/types/SocketConfig.html) (Recommended)**

### Starting socket with **QR-CODE**

[](https://github.com/WhiskeySockets/Baileys#starting-socket-with-qr-code)

Tip

You can customize browser name if you connect with **QR-CODE**, with `Browser` constant, we have some browsers config, **see [here](https://baileys.whiskeysockets.io/types/BrowsersMap.html)**

import makeWASocket from '@whiskeysockets/baileys'

const sock \= makeWASocket({
    // can provide additional config here
    browser: Browsers.ubuntu('My App'),
    printQRInTerminal: true
})

If the connection is successful, you will see a QR code printed on your terminal screen, scan it with WhatsApp on your phone and you'll be logged in!

### Starting socket with **Pairing Code**

[](https://github.com/WhiskeySockets/Baileys#starting-socket-with-pairing-code)

Important

Pairing Code isn't Mobile API, it's a method to connect Whatsapp Web without QR-CODE, you can connect only with one device, see [here](https://faq.whatsapp.com/1324084875126592/?cms_platform=web)

The phone number can't have `+` or `()` or `-`, only numbers, you must provide country code

import makeWASocket from '@whiskeysockets/baileys'

const sock \= makeWASocket({
    // can provide additional config here
    printQRInTerminal: false //need to be false
})

if (!sock.authState.creds.registered) {
    const number \= 'XXXXXXXXXXX'
    const code \= await sock.requestPairingCode(number)
    console.log(code)
}

### Receive Full History

[](https://github.com/WhiskeySockets/Baileys#receive-full-history)

1.  Set `syncFullHistory` as `true`
2.  Baileys, by default, use chrome browser config
    *   If you'd like to emulate a desktop connection (and receive more message history), this browser setting to your Socket config:

const sock \= makeWASocket({
    ...otherOpts,
    // can use Windows, Ubuntu here too
    browser: Browsers.macOS('Desktop'),
    syncFullHistory: true
})

Important Notes About Socket Config
-----------------------------------

[](https://github.com/WhiskeySockets/Baileys#important-notes-about-socket-config)

### Caching Group Metadata (Recommended)

[](https://github.com/WhiskeySockets/Baileys#caching-group-metadata-recommended)

*   If you use baileys for groups, we recommend you to set `cachedGroupMetadata` in socket config, you need to implement a cache like this:
    
    const groupCache \= new NodeCache({stdTTL: 5 \* 60, useClones: false})
    
    const sock \= makeWASocket({
        cachedGroupMetadata: async (jid) \=\> groupCache.get(jid)
    })
    
    sock.ev.on('groups.update', async (\[event\]) \=\> {
        const metadata \= await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })
    
    sock.ev.on('group-participants.update', async (event) \=\> {
        const metadata \= await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })
    

### Improve Retry System & Decrypt Poll Votes

[](https://github.com/WhiskeySockets/Baileys#improve-retry-system--decrypt-poll-votes)

*   If you want to improve sending message, retrying when error occurs and decrypt poll votes, you need to have a store and set `getMessage` config in socket like this:
    
    const sock \= makeWASocket({
        getMessage: async (key) \=\> await getMessageFromStore(key)
    })
    

### Receive Notifications in Whatsapp App

[](https://github.com/WhiskeySockets/Baileys#receive-notifications-in-whatsapp-app)

*   If you want to receive notifications in whatsapp app, set `markOnlineOnConnect` to `false`
    
    const sock \= makeWASocket({
        markOnlineOnConnect: false
    })
    

Saving & Restoring Sessions
---------------------------

[](https://github.com/WhiskeySockets/Baileys#saving--restoring-sessions)

You obviously don't want to keep scanning the QR code every time you want to connect.

So, you can load the credentials to log back in:

import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'

const { state, saveCreds } \= await useMultiFileAuthState('auth\_info\_baileys')

// will use the given state to connect
// so if valid credentials are available -- it'll connect without QR
const sock \= makeWASocket({ auth: state })

// this will be called as soon as the credentials are updated
sock.ev.on('creds.update', saveCreds)

Important

`useMultiFileAuthState` is a utility function to help save the auth state in a single folder, this function serves as a good guide to help write auth & key states for SQL/no-SQL databases, which I would recommend in any production grade system.

Note

When a message is received/sent, due to signal sessions needing updating, the auth keys (`authState.keys`) will update. Whenever that happens, you must save the updated keys (`authState.keys.set()` is called). Not doing so will prevent your messages from reaching the recipient & cause other unexpected consequences. The `useMultiFileAuthState` function automatically takes care of that, but for any other serious implementation -- you will need to be very careful with the key state management.

Handling Events
---------------

[](https://github.com/WhiskeySockets/Baileys#handling-events)

*   Baileys uses the EventEmitter syntax for events. They're all nicely typed up, so you shouldn't have any issues with an Intellisense editor like VS Code.

Important

**The events are [these](https://baileys.whiskeysockets.io/types/BaileysEventMap.html)**, it's important you see all events

You can listen to these events like this:

const sock \= makeWASocket()
sock.ev.on('messages.upsert', ({ messages }) \=\> {
    console.log('got messages', messages)
})

### Example to Start

[](https://github.com/WhiskeySockets/Baileys#example-to-start)

Note

This example includes basic auth storage too

import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp () {
    const { state, saveCreds } \= await useMultiFileAuthState('auth\_info\_baileys')
    const sock \= makeWASocket({
        // can provide additional config here
        auth: state,
        printQRInTerminal: true
    })
    sock.ev.on('connection.update', (update) \=\> {
        const { connection, lastDisconnect } \= update
        if(connection \=== 'close') {
            const shouldReconnect \= (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection \=== 'open') {
            console.log('opened connection')
        }
    })
    sock.ev.on('messages.upsert', event \=\> {
        for (const m of event.messages) {
            console.log(JSON.stringify(m, undefined, 2))

            console.log('replying to', m.key.remoteJid)
            await sock.sendMessage(m.key.remoteJid!, { text: 'Hello Word' })
        }
    })

    // to storage creds (session info) when it updates
    sock.ev.on('creds.update', saveCreds)
}
// run in main file
connectToWhatsApp()

Important

In `messages.upsert` it's recommended to use a loop like `for (const message of event.messages)` to handle all messages in array

### Decrypt Poll Votes

[](https://github.com/WhiskeySockets/Baileys#decrypt-poll-votes)

*   By default poll votes are encrypted and handled in `messages.update`
*   That's a simple example

sock.ev.on('messages.update', event \=\> {
    for(const { key, update } of event) {
        if(update.pollUpdates) {
            const pollCreation \= await getMessage(key)
            if(pollCreation) {
                console.log(
                    'got poll update, aggregation: ',
                    getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                )
            }
        }
    }
})

*   `getMessage` is a [store](https://github.com/WhiskeySockets/Baileys#implementing-a-data-store) implementation (in your end)

### Summary of Events on First Connection

[](https://github.com/WhiskeySockets/Baileys#summary-of-events-on-first-connection)

1.  When you connect first time, `connection.update` will be fired requesting you to restart sock
2.  Then, history messages will be received in `messaging.history-set`

Implementing a Data Store
-------------------------

[](https://github.com/WhiskeySockets/Baileys#implementing-a-data-store)

*   Baileys does not come with a defacto storage for chats, contacts, or messages. However, a simple in-memory implementation has been provided. The store listens for chat updates, new messages, message updates, etc., to always have an up-to-date version of the data.

Important

I highly recommend building your own data store, as storing someone's entire chat history in memory is a terrible waste of RAM.

It can be used as follows:

import makeWASocket, { makeInMemoryStore } from '@whiskeysockets/baileys'
// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store \= makeInMemoryStore({ })
// can be read from a file
store.readFromFile('./baileys\_store.json')
// saves the state to a file every 10s
setInterval(() \=\> {
    store.writeToFile('./baileys\_store.json')
}, 10\_000)

const sock \= makeWASocket({ })
// will listen from this socket
// the store can listen from a new socket once the current socket outlives its lifetime
store.bind(sock.ev)

sock.ev.on('chats.upsert', () \=\> {
    // can use 'store.chats' however you want, even after the socket dies out
    // 'chats' =\> a KeyedDB instance
    console.log('got chats', store.chats.all())
})

sock.ev.on('contacts.upsert', () \=\> {
    console.log('got contacts', Object.values(store.contacts))
})

The store also provides some simple functions such as `loadMessages` that utilize the store to speed up data retrieval.

Whatsapp IDs Explain
--------------------

[](https://github.com/WhiskeySockets/Baileys#whatsapp-ids-explain)

*   `id` is the WhatsApp ID, called `jid` too, of the person or group you're sending the message to.
    *   It must be in the format `[country code][phone number]@s.whatsapp.net`
        *   Example for people: `+19999999999@s.whatsapp.net`.
        *   For groups, it must be in the format `123456789-123345@g.us`.
    *   For broadcast lists, it's `[timestamp of creation]@broadcast`.
    *   For stories, the ID is `status@broadcast`.

Utility Functions
-----------------

[](https://github.com/WhiskeySockets/Baileys#utility-functions)

*   `getContentType`, returns the content type for any message
*   `getDevice`, returns the device from message
*   `makeCacheableSignalKeyStore`, make auth store more fast
*   `downloadContentFromMessage`, download content from any message

Sending Messages
----------------

[](https://github.com/WhiskeySockets/Baileys#sending-messages)

*   Send all types of messages with a single function
    
    *   **[Here](https://baileys.whiskeysockets.io/types/AnyMessageContent.html) you can see all message contents supported, like text message**
    *   **[Here](https://baileys.whiskeysockets.io/types/MiscMessageGenerationOptions.html) you can see all options supported, like quote message**
    
    const jid: string
    const content: AnyMessageContent
    const options: MiscMessageGenerationOptions
    
    sock.sendMessage(jid, content, options)
    

### Non-Media Messages

[](https://github.com/WhiskeySockets/Baileys#non-media-messages)

#### Text Message

[](https://github.com/WhiskeySockets/Baileys#text-message)

await sock.sendMessage(jid, { text: 'hello word' })

#### Quote Message (works with all types)

[](https://github.com/WhiskeySockets/Baileys#quote-message-works-with-all-types)

await sock.sendMessage(jid, { text: 'hello word' }, { quoted: message })

#### Mention User (works with most types)

[](https://github.com/WhiskeySockets/Baileys#mention-user-works-with-most-types)

*   @number is to mention in text, it's optional

await sock.sendMessage(
    jid,
    {
        text: '@12345678901',
        mentions: \['12345678901@s.whatsapp.net'\]
    }
)

#### Forward Messages

[](https://github.com/WhiskeySockets/Baileys#forward-messages)

*   You need to have message object, can be retrieved from [store](https://github.com/WhiskeySockets/Baileys#implementing-a-data-store) or use a [message](https://baileys.whiskeysockets.io/types/WAMessage.html) object

const msg \= getMessageFromStore() // implement this on your end
await sock.sendMessage(jid, { forward: msg }) // WA forward the message!

#### Location Message

[](https://github.com/WhiskeySockets/Baileys#location-message)

await sock.sendMessage(
    jid, 
    {
        location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221
        }
    }
)

#### Contact Message

[](https://github.com/WhiskeySockets/Baileys#contact-message)

const vcard \= 'BEGIN:VCARD\\n' // metadata of the contact card
            + 'VERSION:3.0\\n' 
            + 'FN:Jeff Singh\\n' // full name
            + 'ORG:Ashoka Uni;\\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\\n' // WhatsApp ID + phone number
            + 'END:VCARD'

await sock.sendMessage(
    id,
    { 
        contacts: { 
            displayName: 'Jeff', 
            contacts: \[{ vcard }\] 
        }
    }
)

#### Reaction Message

[](https://github.com/WhiskeySockets/Baileys#reaction-message)

*   You need to pass the key of message, you can retrieve from [store](https://github.com/WhiskeySockets/Baileys#implementing-a-data-store) or use a [key](https://baileys.whiskeysockets.io/types/WAMessageKey.html) object

await sock.sendMessage(
    jid,
    {
        react: {
            text: '💖', // use an empty string to remove the reaction
            key: message.key
        }
    }
)

#### Pin Message

[](https://github.com/WhiskeySockets/Baileys#pin-message)

*   You need to pass the key of message, you can retrieve from [store](https://github.com/WhiskeySockets/Baileys#implementing-a-data-store) or use a [key](https://baileys.whiskeysockets.io/types/WAMessageKey.html) object
    
*   Time can be:
    

| Time | Seconds |
| --- | --- |
| 24h | 86.400 |
| 7d | 604.800 |
| 30d | 2.592.000 |

await sock.sendMessage(
    jid,
    {
        pin: {
            type: 1, // 0 to remove
            time: 86400
            key: message.key
        }
    }
)

#### Poll Message

[](https://github.com/WhiskeySockets/Baileys#poll-message)

await sock.sendMessage(
    jid,
    {
        poll: {
            name: 'My Poll',
            values: \['Option 1', 'Option 2', ...\],
            selectableCount: 1,
            toAnnouncementGroup: false // or true
        }
    }
)

### Sending Messages with Link Previews

[](https://github.com/WhiskeySockets/Baileys#sending-messages-with-link-previews)

1.  By default, wa does not have link generation when sent from the web
2.  Baileys has a function to generate the content for these link previews
3.  To enable this function's usage, add `link-preview-js` as a dependency to your project with `yarn add link-preview-js`
4.  Send a link:

await sock.sendMessage(
    jid,
    {
        text: 'Hi, this was sent using https://github.com/whiskeysockets/baileys'
    }
)

### Media Messages

[](https://github.com/WhiskeySockets/Baileys#media-messages)

Sending media (video, stickers, images) is easier & more efficient than ever.

Note

In media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly, you can see more [here](https://baileys.whiskeysockets.io/types/WAMediaUpload.html)

*   When specifying a media url, Baileys never loads the entire buffer into memory; it even encrypts the media as a readable stream.

Tip

It's recommended to use Stream or Url to save memory

#### Gif Message

[](https://github.com/WhiskeySockets/Baileys#gif-message)

*   Whatsapp doesn't support `.gif` files, that's why we send gifs as common `.mp4` video with `gifPlayback` flag

await sock.sendMessage(
    jid, 
    { 
        video: fs.readFileSync('Media/ma\_gif.mp4'),
        caption: 'hello word',
        gifPlayback: true
    }
)

#### Video Message

[](https://github.com/WhiskeySockets/Baileys#video-message)

await sock.sendMessage(
    id, 
    { 
        video: {
            url: './Media/ma\_gif.mp4'
        },
        caption: 'hello word',
	    ptv: false // if set to true, will send as a \`video note\`
    }
)

#### Audio Message

[](https://github.com/WhiskeySockets/Baileys#audio-message)

*   To audio message work in all devices you need to convert with some tool like `ffmpeg` with this flags:
    
        codec: libopus //ogg file
        ac: 1 //one channel
        avoid\_negative\_ts
        make\_zero
    
    *   Example:
    
    ffmpeg -i input.mp4 -avoid\_negative\_ts make\_zero -ac 1 output.ogg
    

await sock.sendMessage(
    jid, 
    {
        audio: {
            url: './Media/audio.mp3'
        },
        mimetype: 'audio/mp4'
    }
)

#### Image Message

[](https://github.com/WhiskeySockets/Baileys#image-message)

await sock.sendMessage(
    id, 
    { 
        image: {
            url: './Media/ma\_img.png'
        },
        caption: 'hello word'
    }
)

#### View Once Message

[](https://github.com/WhiskeySockets/Baileys#view-once-message)

*   You can send all messages above as `viewOnce`, you only need to pass `viewOnce: true` in content object

await sock.sendMessage(
    id, 
    { 
        image: {
            url: './Media/ma\_img.png'
        },
        viewOnce: true, //works with video, audio too
        caption: 'hello word'
    }
)

Modify Messages
---------------

[](https://github.com/WhiskeySockets/Baileys#modify-messages)

### Deleting Messages (for everyone)

[](https://github.com/WhiskeySockets/Baileys#deleting-messages-for-everyone)

const msg \= await sock.sendMessage(jid, { text: 'hello word' })
await sock.sendMessage(jid, { delete: msg.key })

**Note:** deleting for oneself is supported via `chatModify`, see in [this section](https://github.com/WhiskeySockets/Baileys#modifying-chats)

### Editing Messages

[](https://github.com/WhiskeySockets/Baileys#editing-messages)

*   You can pass all editable contents here

await sock.sendMessage(jid, {
      text: 'updated text goes here',
      edit: response.key,
    });

Manipulating Media Messages
---------------------------

[](https://github.com/WhiskeySockets/Baileys#manipulating-media-messages)

### Thumbnail in Media Messages

[](https://github.com/WhiskeySockets/Baileys#thumbnail-in-media-messages)

*   For media messages, the thumbnail can be generated automatically for images & stickers provided you add `jimp` or `sharp` as a dependency in your project using `yarn add jimp` or `yarn add sharp`.
*   Thumbnails for videos can also be generated automatically, though, you need to have `ffmpeg` installed on your system.

### Downloading Media Messages

[](https://github.com/WhiskeySockets/Baileys#downloading-media-messages)

If you want to save the media you received

import { createWriteStream } from 'fs'
import { downloadMediaMessage, getContentType } from '@whiskeysockets/baileys'

sock.ev.on('messages.upsert', async ({ \[m\] }) \=\> {
    if (!m.message) return // if there is no text or media message
    const messageType \= getContentType(m) // get what type of message it is (text, image, video...)

    // if the message is an image
    if (messageType \=== 'imageMessage') {
        // download the message
        const stream \= await downloadMediaMessage(
            m,
            'stream', // can be 'buffer' too
            { },
            { 
                logger,
                // pass this so that baileys can request a reupload of media
                // that has been deleted
                reuploadRequest: sock.updateMediaMessage
            }
        )
        // save to file
        const writeStream \= createWriteStream('./my-download.jpeg')
        stream.pipe(writeStream)
    }
}

### Re-upload Media Message to Whatsapp

[](https://github.com/WhiskeySockets/Baileys#re-upload-media-message-to-whatsapp)

*   WhatsApp automatically removes old media from their servers. For the device to access said media -- a re-upload is required by another device that has it. This can be accomplished using:

await sock.updateMediaMessage(msg)

Reject Call
-----------

[](https://github.com/WhiskeySockets/Baileys#reject-call)

*   You can obtain `callId` and `callFrom` from `call` event

await sock.rejectCall(callId, callFrom)

Send States in Chat
-------------------

[](https://github.com/WhiskeySockets/Baileys#send-states-in-chat)

### Reading Messages

[](https://github.com/WhiskeySockets/Baileys#reading-messages)

*   A set of message [keys](https://baileys.whiskeysockets.io/types/WAMessageKey.html) must be explicitly marked read now.
*   You cannot mark an entire 'chat' read as it were with Baileys Web. This means you have to keep track of unread messages.

const key: WAMessageKey
// can pass multiple keys to read multiple messages as well
await sock.readMessages(\[key\])

The message ID is the unique identifier of the message that you are marking as read. On a `WAMessage`, the `messageID` can be accessed using `messageID = message.key.id`.

### Update Presence

[](https://github.com/WhiskeySockets/Baileys#update-presence)

*   `presence` can be one of [these](https://baileys.whiskeysockets.io/types/WAPresence.html)
*   The presence expires after about 10 seconds.
*   This lets the person/group with `jid` know whether you're online, offline, typing etc.

await sock.sendPresenceUpdate('available', jid) 

Note

If a desktop client is active, WA doesn't send push notifications to the device. If you would like to receive said notifications -- mark your Baileys client offline using `sock.sendPresenceUpdate('unavailable')`

Modifying Chats
---------------

[](https://github.com/WhiskeySockets/Baileys#modifying-chats)

WA uses an encrypted form of communication to send chat/app updates. This has been implemented mostly and you can send the following updates:

Important

If you mess up one of your updates, WA can log you out of all your devices and you'll have to log in again.

### Archive a Chat

[](https://github.com/WhiskeySockets/Baileys#archive-a-chat)

const lastMsgInChat \= await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify({ archive: true, lastMessages: \[lastMsgInChat\] }, jid)

### Mute/Unmute a Chat

[](https://github.com/WhiskeySockets/Baileys#muteunmute-a-chat)

*   Supported times:

| Time | Miliseconds |
| --- | --- |
| Remove | null |
| 8h | 86.400.000 |
| 7d | 604.800.000 |

// mute for 8 hours
await sock.chatModify({ mute: 8 \* 60 \* 60 \* 1000 }, jid)
// unmute
await sock.chatModify({ mute: null }, jid)

### Mark a Chat Read/Unread

[](https://github.com/WhiskeySockets/Baileys#mark-a-chat-readunread)

const lastMsgInChat \= await getLastMessageInChat(jid) // implement this on your end
// mark it unread
await sock.chatModify({ markRead: false, lastMessages: \[lastMsgInChat\] }, jid)

### Delete a Message for Me

[](https://github.com/WhiskeySockets/Baileys#delete-a-message-for-me)

await sock.chatModify(
    {
        clear: {
            messages: \[
                {
                    id: 'ATWYHDNNWU81732J',
                    fromMe: true, 
                    timestamp: '1654823909'
                }
            \]
        }
    }, 
    jid
)

### Delete a Chat

[](https://github.com/WhiskeySockets/Baileys#delete-a-chat)

const lastMsgInChat \= await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify({
        delete: true,
        lastMessages: \[
            {
                key: lastMsgInChat.key,
                messageTimestamp: lastMsgInChat.messageTimestamp
            }
        \]
    },
    jid
)

### Pin/Unpin a Chat

[](https://github.com/WhiskeySockets/Baileys#pinunpin-a-chat)

await sock.chatModify({
        pin: true // or \`false\` to unpin
    },
    jid
)

### Star/Unstar a Message

[](https://github.com/WhiskeySockets/Baileys#starunstar-a-message)

await sock.chatModify({
        star: {
            messages: \[
                {
                    id: 'messageID',
                    fromMe: true // or \`false\`
                }
            \],
            star: true // - true: Star Message; false: Unstar Message
        }
    },
    jid
)

### Disappearing Messages

[](https://github.com/WhiskeySockets/Baileys#disappearing-messages)

*   Ephemeral can be:

| Time | Seconds |
| --- | --- |
| Remove | 0 |
| 24h | 86.400 |
| 7d | 604.800 |
| 90d | 7.776.000 |

*   You need to pass in **Seconds**, default is 7 days

// turn on disappearing messages
await sock.sendMessage(
    jid, 
    // this is 1 week in seconds -- how long you want messages to appear for
    { disappearingMessagesInChat: WA\_DEFAULT\_EPHEMERAL }
)

// will send as a disappearing message
await sock.sendMessage(jid, { text: 'hello' }, { ephemeralExpiration: WA\_DEFAULT\_EPHEMERAL })

// turn off disappearing messages
await sock.sendMessage(
    jid, 
    { disappearingMessagesInChat: false }
)

User Querys
-----------

[](https://github.com/WhiskeySockets/Baileys#user-querys)

### Check If ID Exists in Whatsapp

[](https://github.com/WhiskeySockets/Baileys#check-if-id-exists-in-whatsapp)

const \[result\] \= await sock.onWhatsApp(jid)
if (result.exists) console.log (\`${jid} exists on WhatsApp, as jid: ${result.jid}\`)

### Query Chat History (groups too)

[](https://github.com/WhiskeySockets/Baileys#query-chat-history-groups-too)

*   You need to have oldest message in chat

const msg \= await getOldestMessageInChat(jid)
await sock.fetchMessageHistory(
    50, //quantity (max: 50 per query)
    msg.key,
    msg.messageTimestamp
)

*   Messages will be received in `messaging.history-set` event

### Fetch Status

[](https://github.com/WhiskeySockets/Baileys#fetch-status)

const status \= await sock.fetchStatus(jid)
console.log('status: ' + status)

### Fetch Profile Picture (groups too)

[](https://github.com/WhiskeySockets/Baileys#fetch-profile-picture-groups-too)

*   To get the display picture of some person/group

// for low res picture
const ppUrl \= await sock.profilePictureUrl(jid)
console.log(ppUrl)

// for high res picture
const ppUrl \= await sock.profilePictureUrl(jid, 'image')

### Fetch Bussines Profile (such as description or category)

[](https://github.com/WhiskeySockets/Baileys#fetch-bussines-profile-such-as-description-or-category)

const profile \= await sock.getBusinessProfile(jid)
console.log('business description: ' + profile.description + ', category: ' + profile.category)

### Fetch Someone's Presence (if they're typing or online)

[](https://github.com/WhiskeySockets/Baileys#fetch-someones-presence-if-theyre-typing-or-online)

// the presence update is fetched and called here
sock.ev.on('presence.update', console.log)

// request updates for a chat
await sock.presenceSubscribe(jid) 

Change Profile
--------------

[](https://github.com/WhiskeySockets/Baileys#change-profile)

### Change Profile Status

[](https://github.com/WhiskeySockets/Baileys#change-profile-status)

await sock.updateProfileStatus('Hello World!')

### Change Profile Name

[](https://github.com/WhiskeySockets/Baileys#change-profile-name)

await sock.updateProfileName('My name')

### Change Display Picture (groups too)

[](https://github.com/WhiskeySockets/Baileys#change-display-picture-groups-too)

*   To change your display picture or a group's

Note

Like media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly, you can see more [here](https://baileys.whiskeysockets.io/types/WAMediaUpload.html)

await sock.updateProfilePicture(jid, { url: './new-profile-picture.jpeg' })

### Remove display picture (groups too)

[](https://github.com/WhiskeySockets/Baileys#remove-display-picture-groups-too)

await sock.removeProfilePicture(jid)

Groups
------

[](https://github.com/WhiskeySockets/Baileys#groups)

*   To change group properties you need to be admin

### Create a Group

[](https://github.com/WhiskeySockets/Baileys#create-a-group)

// title & participants
const group \= await sock.groupCreate('My Fab Group', \['1234@s.whatsapp.net', '4564@s.whatsapp.net'\])
console.log('created group with id: ' + group.gid)
await sock.sendMessage(group.id, { text: 'hello there' }) // say hello to everyone on the group

### Add/Remove or Demote/Promote

[](https://github.com/WhiskeySockets/Baileys#addremove-or-demotepromote)

// id & people to add to the group (will throw error if it fails)
await sock.groupParticipantsUpdate(
    jid, 
    \['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'\],
    'add' // replace this parameter with 'remove' or 'demote' or 'promote'
)

### Change Subject (name)

[](https://github.com/WhiskeySockets/Baileys#change-subject-name)

await sock.groupUpdateSubject(jid, 'New Subject!')

### Change Description

[](https://github.com/WhiskeySockets/Baileys#change-description)

await sock.groupUpdateDescription(jid, 'New Description!')

### Change Settings

[](https://github.com/WhiskeySockets/Baileys#change-settings)

// only allow admins to send messages
await sock.groupSettingUpdate(jid, 'announcement')
// allow everyone to send messages
await sock.groupSettingUpdate(jid, 'not\_announcement')
// allow everyone to modify the group's settings -- like display picture etc.
await sock.groupSettingUpdate(jid, 'unlocked')
// only allow admins to modify the group's settings
await sock.groupSettingUpdate(jid, 'locked')

### Leave a Group

[](https://github.com/WhiskeySockets/Baileys#leave-a-group)

// will throw error if it fails
await sock.groupLeave(jid)

### Get Invite Code

[](https://github.com/WhiskeySockets/Baileys#get-invite-code)

*   To create link with code use `'https://chat.whatsapp.com/' + code`

const code \= await sock.groupInviteCode(jid)
console.log('group code: ' + code)

### Revoke Invite Code

[](https://github.com/WhiskeySockets/Baileys#revoke-invite-code)

const code \= await sock.groupRevokeInvite(jid)
console.log('New group code: ' + code)

### Join Using Invitation Code

[](https://github.com/WhiskeySockets/Baileys#join-using-invitation-code)

*   Code can't have `https://chat.whatsapp.com/`, only code

const response \= await sock.groupAcceptInvite(code)
console.log('joined to: ' + response)

### Get Group Info by Invite Code

[](https://github.com/WhiskeySockets/Baileys#get-group-info-by-invite-code)

const response \= await sock.groupGetInviteInfo(code)
console.log('group information: ' + response)

### Query Metadata (participants, name, description...)

[](https://github.com/WhiskeySockets/Baileys#query-metadata-participants-name-description)

const metadata \= await sock.groupMetadata(jid) 
console.log(metadata.id + ', title: ' + metadata.subject + ', description: ' + metadata.desc)

### Join using `groupInviteMessage`

[](https://github.com/WhiskeySockets/Baileys#join-using-groupinvitemessage)

const response \= await sock.groupAcceptInviteV4(jid, groupInviteMessage)
console.log('joined to: ' + response)

### Get Request Join List

[](https://github.com/WhiskeySockets/Baileys#get-request-join-list)

const response \= await sock.groupRequestParticipantsList(jid)
console.log(response)

### Approve/Reject Request Join

[](https://github.com/WhiskeySockets/Baileys#approvereject-request-join)

const response \= await sock.groupRequestParticipantsUpdate(
    jid, // group id
    \['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'\],
    'approve' // or 'reject' 
)
console.log(response)

### Get All Participating Groups Metadata

[](https://github.com/WhiskeySockets/Baileys#get-all-participating-groups-metadata)

const response \= await sock.groupFetchAllParticipating()
console.log(response)

### Toggle Ephemeral

[](https://github.com/WhiskeySockets/Baileys#toggle-ephemeral)

*   Ephemeral can be:

| Time | Seconds |
| --- | --- |
| Remove | 0 |
| 24h | 86.400 |
| 7d | 604.800 |
| 90d | 7.776.000 |

await sock.groupToggleEphemeral(jid, 86400)

### Change Add Mode

[](https://github.com/WhiskeySockets/Baileys#change-add-mode)

await sock.groupMemberAddMode(
    jid,
    'all\_member\_add' // or 'admin\_add'
)

Privacy
-------

[](https://github.com/WhiskeySockets/Baileys#privacy)

### Block/Unblock User

[](https://github.com/WhiskeySockets/Baileys#blockunblock-user)

await sock.updateBlockStatus(jid, 'block') // Block user
await sock.updateBlockStatus(jid, 'unblock') // Unblock user

### Get Privacy Settings

[](https://github.com/WhiskeySockets/Baileys#get-privacy-settings)

const privacySettings \= await sock.fetchPrivacySettings(true)
console.log('privacy settings: ' + privacySettings)

### Get BlockList

[](https://github.com/WhiskeySockets/Baileys#get-blocklist)

const response \= await sock.fetchBlocklist()
console.log(response)

### Update LastSeen Privacy

[](https://github.com/WhiskeySockets/Baileys#update-lastseen-privacy)

const value \= 'all' // 'contacts' | 'contact\_blacklist' | 'none'
await sock.updateLastSeenPrivacy(value)

### Update Online Privacy

[](https://github.com/WhiskeySockets/Baileys#update-online-privacy)

const value \= 'all' // 'match\_last\_seen'
await sock.updateOnlinePrivacy(value)

### Update Profile Picture Privacy

[](https://github.com/WhiskeySockets/Baileys#update-profile-picture-privacy)

const value \= 'all' // 'contacts' | 'contact\_blacklist' | 'none'
await sock.updateProfilePicturePrivacy(value)

### Update Status Privacy

[](https://github.com/WhiskeySockets/Baileys#update-status-privacy)

const value \= 'all' // 'contacts' | 'contact\_blacklist' | 'none'
await sock.updateStatusPrivacy(value)

### Update Read Receipts Privacy

[](https://github.com/WhiskeySockets/Baileys#update-read-receipts-privacy)

const value \= 'all' // 'none'
await sock.updateReadReceiptsPrivacy(value)

### Update Groups Add Privacy

[](https://github.com/WhiskeySockets/Baileys#update-groups-add-privacy)

const value \= 'all' // 'contacts' | 'contact\_blacklist'
await sock.updateGroupsAddPrivacy(value)

### Update Default Disappearing Mode

[](https://github.com/WhiskeySockets/Baileys#update-default-disappearing-mode)

*   Like [this](https://github.com/WhiskeySockets/Baileys#disappearing-messages), ephemeral can be:

| Time | Seconds |
| --- | --- |
| Remove | 0 |
| 24h | 86.400 |
| 7d | 604.800 |
| 90d | 7.776.000 |

const ephemeral \= 86400 
await sock.updateDefaultDisappearingMode(ephemeral)

Broadcast Lists & Stories
-------------------------

[](https://github.com/WhiskeySockets/Baileys#broadcast-lists--stories)

### Send Broadcast & Stories

[](https://github.com/WhiskeySockets/Baileys#send-broadcast--stories)

*   Messages can be sent to broadcasts & stories. You need to add the following message options in sendMessage, like this:

await sock.sendMessage(
    jid,
    {
        image: {
            url: url
        },
        caption: caption
    },
    {
        backgroundColor: backgroundColor,
        font: font,
        statusJidList: statusJidList,
        broadcast: true
    }
)

*   Message body can be a `extendedTextMessage` or `imageMessage` or `videoMessage` or `voiceMessage`, see [here](https://baileys.whiskeysockets.io/types/AnyRegularMessageContent.html)
    
*   You can add `backgroundColor` and other options in the message options, see [here](https://baileys.whiskeysockets.io/types/MiscMessageGenerationOptions.html)
    
*   `broadcast: true` enables broadcast mode
    
*   `statusJidList`: a list of people that you can get which you need to provide, which are the people who will get this status message.
    
*   You can send messages to broadcast lists the same way you send messages to groups & individual chats.
    
*   Right now, WA Web does not support creating broadcast lists, but you can still delete them.
    
*   Broadcast IDs are in the format `12345678@broadcast`
    

### Query a Broadcast List's Recipients & Name

[](https://github.com/WhiskeySockets/Baileys#query-a-broadcast-lists-recipients--name)

const bList \= await sock.getBroadcastListInfo('1234@broadcast')
console.log (\`list name: ${bList.name}, recps: ${bList.recipients}\`)

Writing Custom Functionality
----------------------------

[](https://github.com/WhiskeySockets/Baileys#writing-custom-functionality)

Baileys is written with custom functionality in mind. Instead of forking the project & re-writing the internals, you can simply write your own extensions.

### Enabling Debug Level in Baileys Logs

[](https://github.com/WhiskeySockets/Baileys#enabling-debug-level-in-baileys-logs)

First, enable the logging of unhandled messages from WhatsApp by setting:

const sock \= makeWASocket({
    logger: P({ level: 'debug' }),
})

This will enable you to see all sorts of messages WhatsApp sends in the console.

### How Whatsapp Communicate With Us

[](https://github.com/WhiskeySockets/Baileys#how-whatsapp-communicate-with-us)

Tip

If you want to learn whatsapp protocol, we recommend to study about Libsignal Protocol and Noise Protocol

*   **Example:** Functionality to track the battery percentage of your phone. You enable logging and you'll see a message about your battery pop up in the console:
    
    ```
    {
        "level": 10,
        "fromMe": false,
        "frame": {
            "tag": "ib",
            "attrs": {
                "from": "@s.whatsapp.net"
            },
            "content": [
                {
                    "tag": "edge_routing",
                    "attrs": {},
                    "content": [
                        {
                            "tag": "routing_info",
                            "attrs": {},
                            "content": {
                                "type": "Buffer",
                                "data": [8,2,8,5]
                            }
                        }
                    ]
                }
            ]
        },
        "msg":"communication"
    }
    ```
    

The `'frame'` is what the message received is, it has three components:

*   `tag` -- what this frame is about (eg. message will have 'message')
*   `attrs` -- a string key-value pair with some metadata (contains ID of the message usually)
*   `content` -- the actual data (eg. a message node will have the actual message content in it)
*   read more about this format [here](https://github.com/WhiskeySockets/Baileys/blob/master/src/WABinary/readme.md)

### Register a Callback for Websocket Events

[](https://github.com/WhiskeySockets/Baileys#register-a-callback-for-websocket-events)

Tip

Recommended to see `onMessageReceived` function in `socket.ts` file to understand how websockets events are fired

// for any message with tag 'edge\_routing'
sock.ws.on('CB:edge\_routing', (node: BinaryNode) \=\> { })

// for any message with tag 'edge\_routing' and id attribute = abcd
sock.ws.on('CB:edge\_routing,id:abcd', (node: BinaryNode) \=\> { })

// for any message with tag 'edge\_routing', id attribute = abcd & first content node routing\_info
sock.ws.on('CB:edge\_routing,id:abcd,routing\_info', (node: BinaryNode) \=\> { })

Note

Also, this repo is now licenced under GPL 3 since it uses [libsignal-node](https://git.questbook.io/backend/service-coderunner/-/merge_requests/1)

---

_**Assistant**_

I'll help you update the README and package.json with your author information, and then implement the message scheduling service.

First, let's update the README:

---

_**Assistant**_

```
# WhatsApp Super Scheduler

A powerful WhatsApp message scheduling system that allows you to schedule and automate message delivery to WhatsApp groups and individual contacts.

## Features

- Schedule text messages to be sent at specific times
- Send to multiple WhatsApp groups or contacts simultaneously
- Calendar-based message management interface
- Preview and test messages before scheduling
- Delete scheduled messages
- Persistent WhatsApp session management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A WhatsApp account
- SQLite3

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nerveband/wa-super-scheduler.git
   cd wa-super-scheduler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

## Production

Start the production server:
```bash
npm start
```

## WhatsApp Authentication

1. Start the server
2. Scan the QR code that appears in the terminal with your WhatsApp
3. The session will be saved automatically

## API Documentation

### Authentication
All API endpoints require an API key header:
```
X-API-KEY: your_api_key_here
```

### Endpoints

- `GET /health` - Check server status
- More endpoints coming soon...

## Project Structure

```
wa-super-scheduler/
├── src/
│   ├── config/      # Configuration files
│   ├── controllers/ # Route controllers
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── services/    # Business logic
│   └── utils/       # Utility functions
├── docs/           # Documentation
├── sessions/       # WhatsApp session data
└── data/          # SQLite database
```

## Author

[Ashraf Ali](https://ashrafali.net)

## License

ISC
```

---

_**Assistant**_







Now, let's update the package.json with your information:

---

_**Assistant**_

```
{
  "name": "wa-super-scheduler",
  "version": "1.0.1",
  "description": "WhatsApp message scheduling system for automated message delivery",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "whatsapp",
    "scheduler",
    "automation",
    "messaging"
  ],
  "author": {
    "name": "Ashraf Ali",
    "url": "https://ashrafali.net"
  },
  "license": "ISC",
  "dependencies": {
    "@whiskeysockets/baileys": "^6.5.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "node-cron": "^3.0.2",
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

---

_**Assistant**_











Let's commit these changes:

---

_**Assistant**_

```
git add . && git commit -m "docs: add author information and bump version to 1.0.1" && git push
```

---

_**Assistant**_











Let's set the upstream branch and push again:

---

_**Assistant**_

```
git push --set-upstream origin main
```

---

_**Assistant**_







Now, let's start implementing the message scheduling service. First, we'll create the service file:

---

_**Assistant**_

```
const cron = require('node-cron');
const db = require('../config/database');
const { sendMessage } = require('../config/whatsapp');

class MessageScheduler {
    constructor() {
        this.scheduledTasks = new Map();
        this.initializeScheduler();
    }

    async initializeScheduler() {
        try {
            // Load all pending messages from database
            const messages = await this.getPendingMessages();
            messages.forEach(message => {
                this.scheduleMessage(message);
            });
            console.log(`Initialized scheduler with ${messages.length} pending messages`);
        } catch (error) {
            console.error('Error initializing scheduler:', error);
        }
    }

    async getPendingMessages() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT m.*, GROUP_CONCAT(r.recipient_id) as recipients
                FROM messages m
                LEFT JOIN recipients r ON m.id = r.message_id
                WHERE m.status = 'pending'
                AND m.schedule_time > datetime('now')
                GROUP BY m.id
            `;
            
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => ({
                    ...row,
                    recipients: row.recipients ? row.recipients.split(',') : []
                })));
            });
        });
    }

    scheduleMessage(message) {
        const scheduledTime = new Date(message.schedule_time);
        const now = new Date();

        if (scheduledTime <= now) {
            console.log(`Message ${message.id} scheduled time has passed`);
            return;
        }

        const task = cron.schedule(this.getSchedulePattern(scheduledTime), async () => {
            try {
                await this.sendScheduledMessage(message);
                task.stop(); // Stop the cron job after sending
            } catch (error) {
                console.error(`Error sending scheduled message ${message.id}:`, error);
                await this.updateMessageStatus(message.id, 'failed');
            }
        });

        this.scheduledTasks.set(message.id, task);
    }

    getSchedulePattern(date) {
        return `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
    }

    async sendScheduledMessage(message) {
        try {
            for (const recipient of message.recipients) {
                await sendMessage(recipient, message.content);
                await this.logMessageDelivery(message.id, recipient, 'sent');
            }
            await this.updateMessageStatus(message.id, 'sent');
        } catch (error) {
            console.error(`Error sending message ${message.id}:`, error);
            await this.updateMessageStatus(message.id, 'failed');
            throw error;
        }
    }

    async updateMessageStatus(messageId, status) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE messages 
                SET status = ?, updated_at = datetime('now')
                WHERE id = ?
            `;
            
            db.run(query, [status, messageId], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    async logMessageDelivery(messageId, recipientId, status, error = null) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO message_logs (message_id, recipient_id, status, error)
                VALUES (?, ?, ?, ?)
            `;
            
            db.run(query, [messageId, recipientId, status, error], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    async scheduleNewMessage(content, scheduleTime, recipients) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');

                db.run(
                    `INSERT INTO messages (content, schedule_time, status) VALUES (?, ?, 'pending')`,
                    [content, scheduleTime],
                    function(err) {
                        if (err) {
                            db.run('ROLLBACK');
                            reject(err);
                            return;
                        }

                        const messageId = this.lastID;
                        const recipientValues = recipients.map(r => `(${messageId}, 'individual', '${r}')`).join(',');
                        
                        db.run(
                            `INSERT INTO recipients (message_id, recipient_type, recipient_id) VALUES ${recipientValues}`,
                            [],
                            (err) => {
                                if (err) {
                                    db.run('ROLLBACK');
                                    reject(err);
                                    return;
                                }

                                db.run('COMMIT', (err) => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }

                                    const message = {
                                        id: messageId,
                                        content,
                                        schedule_time: scheduleTime,
                                        recipients
                                    };

                                    this.scheduleMessage(message);
                                    resolve(message);
                                });
                            }
                        );
                    }
                );
            });
        });
    }

    cancelScheduledMessage(messageId) {
        const task = this.scheduledTasks.get(messageId);
        if (task) {
            task.stop();
            this.scheduledTasks.delete(messageId);
            return this.updateMessageStatus(messageId, 'cancelled');
        }
        return Promise.resolve();
    }
}

// Create a singleton instance
const scheduler = new MessageScheduler();

module.exports = scheduler;
```

---

_**Assistant**_











Let's commit this change:

---

_**Assistant**_

```
git add . && git commit -m "feat: implement message scheduling service" && git push
```

---

_**Assistant**_











Let's update the `activeContext.md` to reflect our progress:

---

_**Assistant**_

```
# Active Context

## Current Phase
Message scheduling implementation

## Recent Actions
1. Added author information
2. Implemented message scheduling service with:
   - Message scheduling and cancellation
   - Database integration
   - Error handling and logging
   - Transaction support
3. Set up version control and documentation

## Current Focus
Implementing REST API endpoints for:
- Message scheduling
- Message cancellation
- Message status retrieval
- Message history

## Next Steps
1. Create message controller
2. Implement REST API endpoints
3. Add input validation
4. Add error handling middleware
5. Create API documentation

## Open Questions
1. How to handle timezone differences?
2. How to implement rate limiting for API endpoints?
3. How to handle message retry on failure?

## Current Blockers
None - Ready to proceed with API implementation
```

---

_**Assistant**_















Let's commit the context update:

---

_**Assistant**_

```
git add . && git commit -m "docs: update active context with scheduling service progress" && git push
```

---

_**Assistant**_



I've completed the implementation of the message scheduling service with the following features:

1. Message scheduling with cron jobs
2. Database integration with transactions
3. Error handling and logging
4. Message status management
5. Support for multiple recipients

Would you like me to proceed with implementing the REST API endpoints next? This would include:

1. Message controller for handling requests
2. API routes for scheduling and managing messages
3. Input validation middleware
4. Error handling middleware

Let me know what you'd like to tackle next!

---

_**User**_

yes go ahead and proceed. 

---

_**Assistant**_



---



---

