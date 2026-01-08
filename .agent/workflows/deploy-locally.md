---
description: Deploy frontend and backend locally
---

# Local Deployment Guide

This workflow will help you deploy both the frontend and backend locally for development.

## Prerequisites

1. Python 3.9 or higher installed
2. Node.js 18 or higher installed
3. Environment variables configured

## Steps

### 1. Set up Backend Environment

First, navigate to the backend directory and create a virtual environment:

```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment

On Windows:
```bash
.\venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Backend Environment Variables

Copy the `.env.example` file to `.env` in the `backend` directory and fill in your actual credentials:
- Firebase credentials
- Cloudinary credentials
- Set `FRONTEND_URL=http://localhost:5173`
- Set `BACKEND_PORT=5000`

### 5. Start the Backend Server

// turbo
```bash
python main.py
```

The backend should now be running at `http://localhost:5000`

### 6. Set up Frontend (in a new terminal)

Navigate to the frontend directory:

```bash
cd frontend
```

### 7. Install Frontend Dependencies

// turbo
```bash
npm install
```

### 8. Configure Frontend Environment Variables

Copy the `.env.example` file to `.env.local` in the `frontend` directory and set:
- `VITE_API_URL=http://localhost:5000`
- Add your Firebase configuration values

### 9. Start the Frontend Development Server

// turbo
```bash
npm run dev
```

The frontend should now be running at `http://localhost:5173`

## Verification

1. Backend health check: Open `http://localhost:5000/health` in your browser
2. Frontend: Open `http://localhost:5173` in your browser
3. Test the connection between frontend and backend by trying a feature

## Troubleshooting

- **Backend won't start**: Check if port 5000 is already in use
- **Frontend can't connect to backend**: Verify CORS settings in `backend/main.py` include your frontend URL
- **Environment variables not loading**: Ensure `.env` (backend) and `.env.local` (frontend) files exist and are properly formatted
