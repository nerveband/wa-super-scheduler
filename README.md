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

#### Health Check
- `GET /health` - Check server status

#### Message Management
- `POST /api/messages/schedule` - Schedule a new message
  ```json
  {
    "content": "Hello World",
    "scheduleTime": "2024-03-15T10:00:00Z",
    "recipients": ["1234567890@s.whatsapp.net"]
  }
  ```

- `DELETE /api/messages/:messageId/cancel` - Cancel a scheduled message

- `GET /api/messages/:messageId` - Get message details

- `GET /api/messages` - Get message history
  - Query parameters:
    - `page` (optional, default: 1)
    - `limit` (optional, default: 10)
    - `status` (optional) - Filter by status

- `GET /api/messages/:messageId/logs` - Get message delivery logs

### Response Format

Success Response:
```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```

Error Response:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Project Structure

```
wa-super-scheduler/
├── src/
│   ├── config/      # Configuration files
│   ├── controllers/ # Route controllers
│   ├── middleware/  # Express middleware
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