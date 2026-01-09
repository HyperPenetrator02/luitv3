# ✅ LUIT v3 - Quick Start Checklist

Use this checklist to set up your project step by step.

---

## 🔥 FIREBASE SETUP

### Get Firebase Web App Config
- [ ] Go to Firebase Console: https://console.firebase.google.com
- [ ] Select project: **luit-redeployed**
- [ ] Go to **Project Settings** (gear icon) → **General** tab
- [ ] Scroll to **"Your apps"** section
- [ ] If no web app exists, click **"Add app"** → **Web** (</> icon)
- [ ] Copy the `firebaseConfig` object values:
  - [ ] `apiKey` → This is your **FIREBASE_WEB_API_KEY**
  - [ ] `authDomain`
  - [ ] `projectId`
  - [ ] `storageBucket`
  - [ ] `messagingSenderId`
  - [ ] `appId`

### Get Service Account Key (Backend)
- [ ] Go to **Project Settings** → **Service accounts** tab
- [ ] Click **"Generate new private key"**
- [ ] Download the JSON file
- [ ] Open JSON and copy:
  - [ ] `project_id`
  - [ ] `private_key_id`
  - [ ] `private_key` (entire key)
  - [ ] `client_email`
  - [ ] `client_id`

### Enable Firebase Services
- [ ] **Authentication:**
  - [ ] Go to **Build** → **Authentication**
  - [ ] Click **"Get started"**
  - [ ] Enable **Email/Password** provider
  
- [ ] **Firestore Database:**
  - [ ] Go to **Build** → **Firestore Database**
  - [ ] Click **"Create database"**
  - [ ] Choose **Production mode**
  - [ ] Select location (closest to users)
  
- [ ] **Storage:**
  - [ ] Go to **Build** → **Storage**
  - [ ] Click **"Get started"**
  - [ ] Use default rules

---

## ☁️ CLOUDINARY SETUP

- [ ] Sign up at https://cloudinary.com/users/register/free
- [ ] Verify email
- [ ] Go to Dashboard
- [ ] Copy credentials:
  - [ ] **Cloud Name**
  - [ ] **API Key**
  - [ ] **API Secret** (click "Reveal")

---

## 🐍 BACKEND SETUP

### Install Python Dependencies
```bash
cd d:\Projects\Luitv3\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

- [ ] Virtual environment created
- [ ] Dependencies installed (should see "Successfully installed...")

### Create .env File
- [ ] Create file: `backend\.env`
- [ ] Copy template from `backend\.env.example`
- [ ] Fill in ALL values:
  - [ ] FIREBASE_PROJECT_ID=luit-redeployed
  - [ ] FIREBASE_PRIVATE_KEY_ID=...
  - [ ] FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
  - [ ] FIREBASE_CLIENT_EMAIL=...
  - [ ] FIREBASE_CLIENT_ID=...
  - [ ] FIREBASE_WEB_API_KEY=AIzaSy...
  - [ ] CLOUDINARY_CLOUD_NAME=...
  - [ ] CLOUDINARY_API_KEY=...
  - [ ] CLOUDINARY_API_SECRET=...
  - [ ] BACKEND_PORT=5000
  - [ ] BACKEND_ENV=development
  - [ ] PORT=5000
  - [ ] FRONTEND_URL=http://localhost:5173

### Test Backend
```bash
python main.py
```

- [ ] Server starts without errors
- [ ] See: "✅ Firebase initialized"
- [ ] See: "✅ All routes registered"
- [ ] See: "🚀 Starting LUIT Desktop version"
- [ ] Open http://localhost:5000/health in browser
- [ ] Should see: `{"status": "healthy", ...}`

---

## ⚛️ FRONTEND SETUP

### Install Node Dependencies
```bash
cd d:\Projects\Luitv3\frontend
npm install
```

- [ ] Dependencies installed (should see "added XXX packages")

### Create .env.local File
- [ ] Create file: `frontend\.env.local`
- [ ] Copy template from `frontend\.env.example`
- [ ] Fill in ALL values:
  - [ ] VITE_API_URL=http://localhost:5000
  - [ ] VITE_FIREBASE_API_KEY=AIzaSy... (same as FIREBASE_WEB_API_KEY)
  - [ ] VITE_FIREBASE_AUTH_DOMAIN=luit-redeployed.firebaseapp.com
  - [ ] VITE_FIREBASE_PROJECT_ID=luit-redeployed
  - [ ] VITE_FIREBASE_STORAGE_BUCKET=luit-redeployed.firebasestorage.app
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID=760872311190
  - [ ] VITE_FIREBASE_APP_ID=1:760872311190:web:...

### Test Frontend
```bash
npm run dev
```

- [ ] Dev server starts
- [ ] See: "VITE v7.3.0 ready in XXX ms"
- [ ] See: "Local: http://localhost:5173/"
- [ ] Open http://localhost:5173 in browser
- [ ] Should see LUIT main page

---

## 🧪 TESTING

### Test 1: Backend Health
- [ ] Open: http://localhost:5000/health
- [ ] Should see JSON response with "status": "healthy"

### Test 2: Frontend Loads
- [ ] Open: http://localhost:5173
- [ ] Should see LUIT main page
- [ ] No errors in browser console (F12)

### Test 3: User Registration
- [ ] Click "Login" button
- [ ] Click "Register" tab
- [ ] Select "Individual User"
- [ ] Fill form:
  - Name: Test User
  - Email: test@example.com
  - Password: Test123!
- [ ] Click "Register"
- [ ] Should redirect to dashboard
- [ ] Check backend terminal: should see "✅ User registered"

### Test 4: User Login
- [ ] Logout (if logged in)
- [ ] Click "Login"
- [ ] Enter email: test@example.com
- [ ] Enter password: Test123!
- [ ] Click "Login"
- [ ] Should redirect to dashboard

### Test 5: Create Report
- [ ] From dashboard, click "Report Garbage"
- [ ] Allow location access
- [ ] Take/upload a photo
- [ ] Select waste type (e.g., "Plastic")
- [ ] Click "Submit Report"
- [ ] Should see success message
- [ ] Check Cloudinary dashboard - image should be uploaded

### Test 6: Admin Dashboard
- [ ] Open: http://localhost:5173/admin
- [ ] Should see stats (reports, cleanings, users, NGOs)
- [ ] Should see data tables
- [ ] Try switching tabs (Reports, Cleanings, Users, NGOs)

---

## 🚀 DEPLOYMENT (Optional)

### Deploy Backend to Railway
- [ ] Push code to GitHub
- [ ] Create Railway project
- [ ] Connect GitHub repo
- [ ] Set all environment variables
- [ ] Deploy
- [ ] Copy Railway URL

### Deploy Frontend to Vercel
- [ ] Create Vercel project
- [ ] Connect GitHub repo
- [ ] Set root directory: `frontend`
- [ ] Set all environment variables
- [ ] Set VITE_API_URL to Railway URL
- [ ] Deploy
- [ ] Copy Vercel URL

### Update CORS
- [ ] Update `backend/main.py` allowed_origins
- [ ] Add Vercel URL to list
- [ ] Redeploy backend

### Update Railway
- [ ] Set FRONTEND_URL to Vercel URL
- [ ] Redeploy

---

## ✅ FINAL CHECKS

- [ ] Both servers running without errors
- [ ] Can register new users
- [ ] Can login
- [ ] Can create reports
- [ ] Images upload to Cloudinary
- [ ] Admin dashboard works
- [ ] No console errors
- [ ] All features tested

---

## 🎉 YOU'RE DONE!

If all checkboxes are checked, your LUIT v3 project is fully set up and ready to use!

---

## 📝 NOTES

**Common Issues:**

1. **"Firebase initialization failed"**
   - Check `.env` file has all Firebase variables
   - Verify FIREBASE_PRIVATE_KEY has `\n` not actual newlines
   - Restart backend

2. **"Cannot connect to backend"**
   - Verify backend is running on port 5000
   - Check VITE_API_URL in frontend `.env.local`
   - Check CORS settings

3. **"Permission denied" in Firestore**
   - Update Firestore security rules (see SETUP_GUIDE.md)

4. **"Module not found"**
   - Run `pip install -r requirements.txt` (backend)
   - Run `npm install` (frontend)

---

**Need detailed help?** See `SETUP_GUIDE.md` for complete instructions.
