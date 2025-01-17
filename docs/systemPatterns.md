# System Patterns

## Architecture Overview
The system follows a client-server architecture with:
- Frontend (React SPA)
- Backend (Node.js REST API)
- SQLite Database
- WhatsApp Web Client

## Key Technical Decisions

### 1. Database Choice
- SQLite for simplicity and portability
- Single-file database
- No separate database server needed
- Suitable for moderate load

### 2. WhatsApp Integration
- Using @whiskeysockets/baileys
- Web-based authentication
- Session persistence
- Automated reconnection

### 3. Message Scheduling
- node-cron for scheduling
- In-memory job queue
- Database-backed persistence
- Status tracking

### 4. Frontend Framework
- React with TypeScript
- Vite for development
- Chakra UI for components
- React Query for data fetching

### 5. API Design
- RESTful endpoints
- API key authentication
- JSON response format
- Standardized error handling

## Data Flow
1. User schedules message via frontend
2. Backend validates and stores in database
3. Scheduler checks for pending messages
4. WhatsApp service sends messages
5. Status updates stored in database
6. Frontend polls for updates 