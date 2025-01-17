# WhatsApp Super Scheduler

A powerful WhatsApp message scheduling system that allows you to schedule and automate message delivery.

## Author
**Ashraf Ali**  
Website: [https://ashrafali.net](https://ashrafali.net)

## Project Structure
```
wa-super-scheduler/
├── backend/             # Backend Node.js application
│   ├── src/            # Source code
│   ├── .env            # Environment variables
│   └── package.json    # Backend dependencies
└── frontend/           # Frontend React application
    ├── src/           # Source code
    ├── .env           # Environment variables
    └── package.json   # Frontend dependencies
```

## Prerequisites
- Node.js >= 14
- npm >= 6
- WhatsApp account for testing

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_PATH=./data/scheduler.sqlite
   WA_SESSION_DIR=./sessions
   WA_RECONNECT_INTERVAL=5000
   API_KEY=your_api_key_here
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_API_KEY=your_api_key_here
   ```

## Running the Application

### Start Backend Server
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start on http://localhost:3000

### Start Frontend Development Server
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:5173

## WhatsApp Authentication
1. Start the backend server
2. Open the frontend application
3. Look for the QR code in the WhatsApp Status section
4. Scan the QR code with your WhatsApp mobile app
5. Once connected, you can start scheduling messages

## Features
- Schedule WhatsApp messages for future delivery
- Support for multiple recipients
- Message status tracking
- Real-time WhatsApp connection status
- Modern, responsive UI

## API Documentation
The backend provides the following endpoints:

- `GET /api/health` - Check server status
- `GET /api/whatsapp/status` - Get WhatsApp connection status
- `POST /api/messages/schedule` - Schedule a new message
- `GET /api/messages` - Get list of scheduled messages
- `DELETE /api/messages/:id/cancel` - Cancel a scheduled message

All endpoints require the `X-API-KEY` header with your API key.