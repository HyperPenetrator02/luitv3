# 🔑 How to Get Your Firebase Web API Key

## Quick Guide

### Method 1: Firebase Console (Recommended)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Sign in with your Google account

2. **Select Your Project**
   - Click on your LUIT project

3. **Open Project Settings**
   - Click the gear icon (⚙️) next to "Project Overview"
   - Select "Project settings"

4. **Find Web API Key**
   - Under the "General" tab
   - Scroll down to "Your apps" section
   - Look for "Web API Key"
   - Copy the value (starts with `AIzaSy...`)

5. **Add to .env File**
   ```bash
   FIREBASE_WEB_API_KEY=AIzaSy...your_actual_key_here
   ```

---

### Method 2: From Firebase Config Object

If you already have a Firebase web app configured, you can find it in your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",  // <-- This is your Web API Key
  authDomain: "...",
  projectId: "...",
  // ...
};
```

The `apiKey` field is your Firebase Web API Key.

---

### Method 3: Firebase CLI

If you have Firebase CLI installed:

```bash
firebase apps:sdkconfig web
```

This will display your Firebase configuration including the Web API Key.

---

## ⚠️ Important Notes

### Security
- **This key is safe to expose** in frontend code (it's meant to be public)
- Firebase security is handled by **Security Rules**, not by hiding the API key
- However, you should still:
  - Enable **App Check** for production
  - Set proper **Firestore Security Rules**
  - Enable **Authentication** restrictions

### Where to Use It
- ✅ Backend `.env` file: `FIREBASE_WEB_API_KEY=...`
- ✅ Frontend `.env.local` file: `VITE_FIREBASE_API_KEY=...`
- ✅ Railway environment variables (for backend)
- ✅ Vercel environment variables (for frontend)

### Common Mistakes
- ❌ Don't confuse it with the **Service Account Private Key**
- ❌ Don't use the **Server Key** (that's for FCM)
- ❌ Don't use the **OAuth Client ID**

---

## 🧪 Testing

After adding the key, test that it works:

```bash
# In backend directory
cd backend
python main.py
```

Try to register a new user. If you see this error:
```
❌ Registration error: 'firebase_web_api_key'
```

Then the key is not set correctly in your `.env` file.

If registration works, you should see:
```
✅ User registered: <user_id> (individual)
```

---

## 📝 Full Example

Your `backend/.env` should look like this:

```bash
# Firebase (Firestore & Auth)
FIREBASE_PROJECT_ID=luit-project-123
FIREBASE_PRIVATE_KEY_ID=abc123def456...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIE...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xyz@luit-project-123.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789012345678901
FIREBASE_WEB_API_KEY=AIzaSyABC123def456GHI789jkl012MNO345pqr

# Google Cloud (optional)
GOOGLE_CLOUD_PROJECT_ID=luit-project-123

# Cloudinary (images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz

# Backend
BACKEND_PORT=5000
BACKEND_ENV=development
PORT=5000

# Frontend URL (CORS allowlist)
FRONTEND_URL=http://localhost:3000
```

---

## 🆘 Troubleshooting

### "Invalid API key" error
- Double-check you copied the entire key
- Make sure there are no extra spaces
- Verify you're using the correct Firebase project

### "API key not found" error
- Check the `.env` file exists in the `backend` directory
- Verify the variable name is exactly `FIREBASE_WEB_API_KEY`
- Restart the backend server after adding the key

### Still not working?
1. Check Firebase Console → Project Settings → General
2. Verify your project is active (not deleted)
3. Check if you have billing enabled (required for some features)
4. Verify your Firebase project has Authentication enabled

---

## ✅ Verification

Once you've added the key, verify it's loaded correctly:

```python
# In Python console or add to main.py temporarily
from config import get_settings
settings = get_settings()
print(f"Web API Key: {settings.firebase_web_api_key[:10]}...")  # Shows first 10 chars
```

You should see something like:
```
Web API Key: AIzaSyABC1...
```

If you see an empty string, the key is not loaded correctly.

---

**Need more help?** Check the official Firebase documentation:
https://firebase.google.com/docs/web/setup
