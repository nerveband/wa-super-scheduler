# Technical Context

## Technology Stack

### Backend
- Node.js
- Express.js
- SQLite3 (Database)
- @whiskeysockets/baileys (WhatsApp Web API)
- node-cron (Scheduling)

### Frontend
- React
- TypeScript
- Vite
- Chakra UI
- React Query
- React Router

## Development Setup
1. Node.js >= 14
2. npm >= 6
3. Git
4. SQLite3

## Project Structure
```
wa-super-scheduler/
├── backend/             # Backend Node.js application
│   ├── src/            # Source code
│   │   ├── config/     # Configuration
│   │   ├── routes/     # API routes
│   │   └── services/   # Business logic
│   ├── .env            # Environment variables
│   └── package.json    # Dependencies
├── frontend/           # Frontend React application
│   ├── src/           # Source code
│   │   ├── components/ # React components
│   │   ├── pages/     # Page components
│   │   ├── services/  # API services
│   │   └── theme/     # UI theme
│   ├── .env           # Environment variables
│   └── package.json   # Dependencies
└── docs/              # Documentation
```

## Technical Constraints
1. WhatsApp Web API limitations
2. Message delivery timing precision
3. Session persistence requirements
4. SQLite concurrent access
5. Frontend-backend communication security 