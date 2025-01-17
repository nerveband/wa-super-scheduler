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