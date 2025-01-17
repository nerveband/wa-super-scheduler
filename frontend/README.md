# WA Super Scheduler Frontend

The frontend application for the WhatsApp Super Scheduler, built with React, TypeScript, and Vite.

## Features

- Modern UI with Chakra UI
- Calendar view for message scheduling
- Real-time message status updates
- Responsive design
- Type-safe development with TypeScript

## Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- Backend API running (see main project README)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nerveband/wa-super-scheduler.git
cd wa-super-scheduler/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your configuration.

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── hooks/         # Custom React hooks
  ├── layouts/       # Page layouts
  ├── pages/         # Page components
  ├── services/      # API services
  ├── theme/         # Chakra UI theme
  ├── types/         # TypeScript types
  └── utils/         # Utility functions
```

## Author

Ashraf Ali (https://ashrafali.net)
