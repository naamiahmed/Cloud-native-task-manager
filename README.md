# Cloud-Native Task Manager

A full-stack task management application with a Next.js frontend and ASP.NET Core backend.

## Project Structure

```
Cloud-native-task-manager/
├── backend/
│   └── TaskApi/          # ASP.NET Core Web API
├── frontend/             # Next.js application
└── README.md
```

## Prerequisites

### Backend Requirements
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) or later
- Windows, macOS, or Linux

### Frontend Requirements
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm, yarn, pnpm, or bun

## Getting Started

### 1. Backend Setup and Run

1. Navigate to the backend directory:
```bash
cd backend/TaskApi
```

2. Restore dependencies (if needed):
```bash
dotnet restore
```

3. Run the backend API:
```bash
dotnet run
```

The backend will start on:
- **HTTP**: `http://localhost:5107`
- **HTTPS**: `https://localhost:7070` (if configured)

The API endpoints will be available at:
- `GET http://localhost:5107/api/task` - Get all tasks
- `POST http://localhost:5107/api/task` - Create a new task

### 2. Frontend Setup and Run

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will start on:
- **URL**: `http://localhost:3000`

4. Open your browser and navigate to `http://localhost:3000`

## Running Both Services

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend/TaskApi
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using Scripts (Windows PowerShell)

Create a script to run both services simultaneously, or use your preferred process manager.

## API Endpoints

### Get All Tasks
```
GET http://localhost:5107/api/task
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Task 1"
  },
  {
    "id": 2,
    "name": "Task 2"
  }
]
```

### Create Task
```
POST http://localhost:5107/api/task
Content-Type: application/json

{
  "name": "New Task"
}
```

**Response:**
```json
{
  "id": 3,
  "name": "New Task"
}
```

## Features

- ✅ Add new tasks
- ✅ View all tasks
- ✅ Real-time task list updates
- ✅ Error handling and validation
- ✅ Responsive UI with dark mode support
- ✅ CORS enabled for frontend-backend communication

## Troubleshooting

### Backend Issues

1. **Port already in use**: Change the port in `backend/TaskApi/Properties/launchSettings.json`
2. **CORS errors**: Ensure the backend is running and CORS is configured correctly in `Program.cs`
3. **Build errors**: Run `dotnet clean` and `dotnet restore` then rebuild

### Frontend Issues

1. **Cannot connect to backend**: 
   - Ensure the backend is running on `http://localhost:5107`
   - Check that the API_URL in `frontend/app/page.tsx` matches your backend URL
2. **Module not found**: Run `npm install` in the frontend directory
3. **Port 3000 in use**: Next.js will automatically use the next available port

### Connection Issues

- Ensure both services are running
- Check that the backend URL in the frontend matches the actual backend port
- Verify CORS is properly configured in the backend
- Check browser console for detailed error messages

## Development

### Backend
- Framework: ASP.NET Core 9.0
- Language: C#
- API Style: RESTful API with Controllers

### Frontend
- Framework: Next.js 16.1.1
- Language: TypeScript/React
- Styling: Tailwind CSS

## Notes

- Tasks are stored in memory (will be lost on backend restart)
- The backend uses CORS to allow requests from `http://localhost:3000`
- Both services must be running for the application to work properly

