# 🚀 LUIT v3 - Complete Setup Guide (New Project)

**Welcome to LUIT v3!** This guide will walk you through setting up your project from scratch.

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Cloudinary Setup](#cloudinary-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running Locally](#running-locally)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## 1. PREREQUISITES

### Required Software:
- ✅ **Python 3.9+** - [Download](https://www.python.org/downloads/)
- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **Code Editor** (VS Code recommended)

### Required Accounts:
- ✅ **Firebase Account** - [Sign up](https://console.firebase.google.com)
- ✅ **Cloudinary Account** - [Sign up](https://cloudinary.com/users/register/free)
- ✅ **Railway Account** (for backend deployment) - [Sign up](https://railway.app)
- ✅ **Vercel Account** (for frontend deployment) - [Sign up](https://vercel.com)

---

## 2. FIREBASE SETUP

### Step 1: Get Firebase Configuration

I can see you already have a Firebase project: **`luit-redeployed`**

#### A. Get Web API Key
1. In Firebase Console, you're already on **Project Settings → General**
2. Scroll down to **"Your apps"** section
3. If you don't have a web app, click **"Add app"** → Select **Web** (</> icon)
4. Register your app with a nickname (e.g., "LUIT Web App")
5. You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",           // ← This is your FIREBASE_WEB_API_KEY
  authDomain: "luit-redeployed.firebaseapp.com",
  projectId: "luit-redeployed",
  storageBucket: "luit-redeployed.firebasestorage.app",
  messagingSenderId: "760872311190",
  appId: "1:760872311190:web:..."
};
```

**Copy these values - you'll need them!**

#### B. Get Service Account Key (for Backend)
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"** - a JSON file will download
5. Open the JSON file and copy these values:
   - `project_id`
   - `private_key_id`
   - `private_key` (the entire key including `-----BEGIN PRIVATE KEY-----`)
   - `client_email`
   - `client_id`

#### C. Enable Firebase Services
1. **Authentication:**
   - Go to **Build → Authentication**
   - Click **"Get started"**
   - Enable **Email/Password** sign-in method
   
2. **Firestore Database:**
   - Go to **Build → Firestore Database**
   - Click **"Create database"**
   - Choose **"Start in production mode"** (we'll set rules later)
   - Select a location (choose closest to your users)
   
3. **Storage:**
   - Go to **Build → Storage**
   - Click **"Get started"**
   - Use default security rules for now

---

## 3. CLOUDINARY SETUP

### Step 1: Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. Verify your email

### Step 2: Get Cloudinary Credentials
1. After login, you'll see your **Dashboard**
2. Copy these values:
   - **Cloud Name** (e.g., `dxxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Reveal" to see it)

---

## 4. BACKEND SETUP

### Step 1: Navigate to Backend Directory
```bash
cd d:\Projects\Luitv3\backend
```

### Step 2: Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# You should see (venv) in your terminal
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- FastAPI, Uvicorn (web framework)
- Firebase Admin SDK
- Cloudinary SDK
- OpenCV (image processing)
- And other dependencies

### Step 4: Create .env File

Create a file named `.env` in the `backend` directory with this content:

```bash
# Firebase (Firestore & Auth)
FIREBASE_PROJECT_ID=luit-redeployed
FIREBASE_PRIVATE_KEY_ID=your_private_key_id_from_json
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour_private_key_here\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@luit-redeployed.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789012345678901
FIREBASE_WEB_API_KEY=AIzaSy...your_web_api_key

# Google Cloud (optional - same as Firebase Project ID)
GOOGLE_CLOUD_PROJECT_ID=luit-redeployed

# Cloudinary (images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Backend
BACKEND_PORT=5000
BACKEND_ENV=development
PORT=5000

# Frontend URL (CORS allowlist)
FRONTEND_URL=http://localhost:5173
```

**Important Notes:**
- Replace all `your_*` placeholders with actual values
- For `FIREBASE_PRIVATE_KEY`: Replace actual newlines with `\n` (literal backslash-n)
- Don't add quotes around values
- No spaces around `=`

### Step 5: Test Backend
```bash
python main.py
```

You should see:
```
📋 Firebase Project ID: luit-redeployed
📋 Firebase Client Email: firebase-adminsdk-xxxxx@...
✅ Firebase initialized with project: luit-redeployed
✅ CORS enabled for origins: ...
✅ All routes registered
🚀 Starting LUIT Desktop version on http://0.0.0.0:5000
```

**If you see errors**, check the [Troubleshooting](#troubleshooting) section.

---

## 5. FRONTEND SETUP

### Step 1: Navigate to Frontend Directory
```bash
# Open a NEW terminal (keep backend running)
cd d:\Projects\Luitv3\frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React, React Router
- Vite (build tool)
- Tailwind CSS
- Firebase SDK
- Axios (API client)
- Zustand (state management)

### Step 3: Create .env.local File

Create a file named `.env.local` in the `frontend` directory:

```bash
# Backend API URL
VITE_API_URL=http://localhost:5000

# Firebase Configuration (from Firebase Console)
VITE_FIREBASE_API_KEY=AIzaSy...your_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=luit-redeployed.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=luit-redeployed
VITE_FIREBASE_STORAGE_BUCKET=luit-redeployed.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=760872311190
VITE_FIREBASE_APP_ID=1:760872311190:web:your_app_id
```

**Replace with your actual Firebase config values!**

### Step 4: Test Frontend
```bash
npm run dev
```

You should see:
```
VITE v7.3.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

---

## 6. RUNNING LOCALLY

### Terminal 1: Backend
```bash
cd d:\Projects\Luitv3\backend
venv\Scripts\activate
python main.py
```

### Terminal 2: Frontend
```bash
cd d:\Projects\Luitv3\frontend
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/health

---

## 7. TESTING

### Test 1: Backend Health Check
Open browser: http://localhost:5000/health

You should see:
```json
{
  "status": "healthy",
  "message": "LUIT Backend is running",
  "timestamp": "2026-01-09T...",
  "admin_enabled": true
}
```

### Test 2: User Registration
1. Open http://localhost:5173
2. Click **"Login"**
3. Click **"Register"**
4. Select **"Individual User"**
5. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
6. Click **"Register"**

**Expected Result:** You should be redirected to the dashboard.

**Check Backend Terminal:** You should see:
```
✅ User registered: <user_id> (individual)
```

### Test 3: Create a Report
1. From dashboard, click **"Report Garbage"**
2. Allow location access
3. Take a photo (or use camera)
4. Select waste type
5. Submit

**Expected Result:** Report created successfully, image uploaded to Cloudinary.

### Test 4: Admin Dashboard
1. Open http://localhost:5173/admin
2. You should see all reports, users, cleanings, NGOs
3. Try the "Clear All" buttons (be careful - this deletes data!)

---

## 8. DEPLOYMENT

### A. Deploy Backend to Railway

1. **Push to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Railway Project**
   - Go to [Railway](https://railway.app)
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your `luitv3` repository
   - Railway will auto-detect the Dockerfile

3. **Set Environment Variables**
   In Railway dashboard, go to **Variables** and add ALL variables from `backend/.env`:
   - FIREBASE_PROJECT_ID
   - FIREBASE_PRIVATE_KEY_ID
   - FIREBASE_PRIVATE_KEY (paste the entire key with \n)
   - FIREBASE_CLIENT_EMAIL
   - FIREBASE_CLIENT_ID
   - FIREBASE_WEB_API_KEY
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - FRONTEND_URL (set to your Vercel URL later)

4. **Deploy**
   - Railway will automatically deploy
   - Copy your Railway URL (e.g., `https://luit-production.up.railway.app`)

### B. Deploy Frontend to Vercel

1. **Create Vercel Project**
   - Go to [Vercel](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Framework: **Vite**
   - Root Directory: `frontend`

2. **Set Environment Variables**
   In Vercel dashboard, go to **Settings → Environment Variables** and add:
   - VITE_API_URL = `https://your-railway-url.up.railway.app`
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID

3. **Deploy**
   - Click **"Deploy"**
   - Copy your Vercel URL (e.g., `https://luit.vercel.app`)

4. **Update Railway FRONTEND_URL**
   - Go back to Railway
   - Update `FRONTEND_URL` variable to your Vercel URL
   - Redeploy

### C. Update CORS
Make sure `backend/main.py` includes your Vercel URL in allowed origins:
```python
allowed_origins = [
    "https://luit.vercel.app",  # Your Vercel URL
    "http://localhost:5173",
    # ...
]
```

---

## 9. TROUBLESHOOTING

### Backend Issues

#### "Firebase initialization failed"
**Problem:** Missing or incorrect Firebase credentials

**Solution:**
1. Check `.env` file exists in `backend` directory
2. Verify all Firebase variables are set
3. Check `FIREBASE_PRIVATE_KEY` has `\n` (not actual newlines)
4. Restart backend server

#### "Cloudinary upload failed"
**Problem:** Missing or incorrect Cloudinary credentials

**Solution:**
1. Verify Cloudinary credentials in `.env`
2. Check cloud name, API key, and secret are correct
3. Test at https://cloudinary.com/console

#### "Port already in use"
**Problem:** Another process is using port 5000

**Solution:**
```bash
# Change port in .env
BACKEND_PORT=5001

# Or kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Issues

#### "Cannot connect to backend"
**Problem:** Backend not running or wrong URL

**Solution:**
1. Verify backend is running on http://localhost:5000
2. Check `VITE_API_URL` in `.env.local`
3. Check browser console for CORS errors
4. Verify CORS settings in `backend/main.py`

#### "Firebase not initialized"
**Problem:** Missing Firebase config

**Solution:**
1. Check all `VITE_FIREBASE_*` variables in `.env.local`
2. Verify values match Firebase Console
3. Restart frontend dev server

#### "Module not found" errors
**Problem:** Dependencies not installed

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

#### "Permission denied" in Firestore
**Problem:** Firestore security rules too restrictive

**Solution:**
1. Go to Firebase Console → Firestore Database → Rules
2. For development, use:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // ⚠️ Development only!
    }
  }
}
```
3. For production, implement proper security rules

---

## 🎉 NEXT STEPS

Once everything is working:

1. ✅ **Test all features** thoroughly
2. ✅ **Set up proper Firestore security rules**
3. ✅ **Enable Firebase App Check** for production
4. ✅ **Set up monitoring** (Sentry, LogRocket, etc.)
5. ✅ **Add custom domain** to Vercel
6. ✅ **Set up CI/CD** with GitHub Actions
7. ✅ **Add analytics** (Google Analytics, Mixpanel, etc.)

---

## 📞 NEED HELP?

- **Firebase Docs:** https://firebase.google.com/docs
- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs

---

**You're all set! Happy coding! 🚀**
