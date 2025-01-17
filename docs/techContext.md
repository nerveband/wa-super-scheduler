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