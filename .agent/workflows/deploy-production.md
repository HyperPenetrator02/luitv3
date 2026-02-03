---
description: Deploy backend to Railway and frontend to Vercel
---

# Production Deployment Guide for LUIT-Clean-Water

This workflow will guide you through deploying both the backend (Railway) and frontend (Vercel) to production.

## Prerequisites

Before starting, ensure you have:
- ✅ GitHub account with the repository `HyperPenetrator02/luitv3`
- ✅ All code committed and pushed to GitHub
- ✅ Firebase project created with credentials
- ✅ Cloudinary account with API credentials

## Part 1: Deploy Backend to Railway (15 minutes)

### Step 1: Sign Up for Railway

1. Go to **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with **GitHub** (recommended for auto-deployment)
4. Authorize Railway to access your GitHub repositories

### Step 2: Create New Project from GitHub

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select **"HyperPenetrator02/luitv3"**
4. Railway will detect your repository

### Step 3: Configure Root Directory

**IMPORTANT:** Railway needs to know where the backend code is located.

1. After selecting the repo, Railway will start analyzing
2. Go to **Settings** tab
3. Find **"Root Directory"** section
4. Set it to: `backend`
5. Click **"Save"**

### Step 4: Add Environment Variables

Go to the **Variables** tab and add ALL of these environment variables:

#### Firebase Configuration
```
FIREBASE_PROJECT_ID=luit-redeployed
FIREBASE_PRIVATE_KEY_ID=<your_private_key_id>
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n<your_key_here>\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@luit-redeployed.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=<your_client_id>
FIREBASE_WEB_API_KEY=<your_web_api_key>
```

**IMPORTANT for FIREBASE_PRIVATE_KEY:**
- Copy the ENTIRE private key from your Firebase service account JSON
- Replace actual newlines with `\n` (literal backslash-n)
- Include the BEGIN and END markers
- Do NOT add quotes around the value in Railway

#### Cloudinary Configuration
```
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

#### Backend Configuration
```
BACKEND_PORT=8000
BACKEND_ENV=production
PORT=8000
```

#### Frontend URL (Update after deploying frontend)
```
FRONTEND_URL=https://luitv3.vercel.app
```

**Note:** You'll update `FRONTEND_URL` after deploying the frontend in Part 2.

### Step 5: Deploy Backend

1. Railway will automatically start deploying after you save the variables
2. Go to **Deployments** tab to watch the build progress
3. Wait 3-5 minutes for the build to complete
4. Look for success messages like:
   - "✅ Firebase initialized"
   - "Application startup complete"

### Step 6: Generate Domain

1. Go to **Settings** tab
2. Scroll to **"Networking"** or **"Domains"** section
3. Click **"Generate Domain"**
4. Railway will provide a URL like: `https://luit-production-xxxx.up.railway.app`
5. **COPY THIS URL** - you'll need it for the frontend!

### Step 7: Test Backend Health

1. Open your Railway URL in a browser
2. Add `/health` to the end: `https://your-railway-url.up.railway.app/health`
3. You should see a JSON response like:
```json
{
  "status": "healthy",
  "message": "LUIT Backend is running",
  "timestamp": "2026-02-03T...",
  "admin_enabled": true
}
```

✅ **If you see this response, your backend is successfully deployed!**

---

## Part 2: Deploy Frontend to Vercel (10 minutes)

### Step 1: Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Sign in with **GitHub** (use the same GitHub account)
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find **"HyperPenetrator02/luitv3"** in the repository list
3. Click **"Import"**

### Step 3: Configure Build Settings

Vercel will show configuration options:

1. **Framework Preset:** Select **"Vite"** (should auto-detect)
2. **Root Directory:** Click **"Edit"** and set to `frontend`
3. **Build Command:** Should auto-fill as `npm run build`
4. **Output Directory:** Should auto-fill as `dist`
5. **Install Command:** Should auto-fill as `npm install`

### Step 4: Add Environment Variables

Click **"Environment Variables"** section and add these:

#### Backend API URL (Use your Railway URL from Part 1)
```
VITE_API_URL=https://luit-production-xxxx.up.railway.app
```

#### Firebase Configuration
```
VITE_FIREBASE_API_KEY=AIzaSy...your_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=luit-redeployed.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=luit-redeployed
VITE_FIREBASE_STORAGE_BUCKET=luit-redeployed.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=760872311190
VITE_FIREBASE_APP_ID=1:760872311190:web:your_app_id
```

**Where to find Firebase values:**
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project (luit-redeployed)
3. Click the gear icon → Project Settings
4. Scroll to "Your apps" section
5. Copy the values from the Firebase SDK snippet

### Step 5: Deploy Frontend

1. Click **"Deploy"**
2. Vercel will start building (takes 2-3 minutes)
3. You'll see build logs in real-time
4. Wait for **"Deployment Ready"** message

### Step 6: Get Your Frontend URL

1. After deployment completes, Vercel will show your URL
2. It will be something like: `https://luitv3.vercel.app` or `https://luitv3-<hash>.vercel.app`
3. **COPY THIS URL**
4. Click on it to open your deployed app!

### Step 7: Test Frontend

1. Open your Vercel URL in a browser
2. You should see the LUIT main page
3. Try the following:
   - Click "Login" → "Register"
   - Create a test account
   - Navigate through the app

✅ **If the app loads and you can navigate, your frontend is deployed!**

---

## Part 3: Connect Backend & Frontend (5 minutes)

### Step 1: Update Backend CORS

Now that you have your Vercel URL, update the backend to allow requests from it:

1. Go back to **Railway** dashboard
2. Go to **Variables** tab
3. Find `FRONTEND_URL` variable
4. Update it to your actual Vercel URL:
```
FRONTEND_URL=https://luitv3.vercel.app
```
5. Click **"Save"**
6. Railway will automatically redeploy (takes 1-2 minutes)

### Step 2: Verify CORS in Code (Optional)

Your `backend/main.py` should already have proper CORS configuration. If you need to verify or update:

1. Check that `backend/main.py` includes your Vercel domain in allowed origins
2. If needed, add your specific Vercel URL to the allowed origins list
3. Commit and push changes:
```bash
git add backend/main.py
git commit -m "Update CORS for production Vercel URL"
git push origin main
```
4. Railway will auto-deploy the update

### Step 3: Test Complete Integration

Now test the full stack:

1. **Open your Vercel URL**
2. **Test Registration:**
   - Click "Login" → "Register"
   - Create a new user account
   - Verify you can log in
3. **Test Reporting:**
   - Navigate to "Report" page
   - Allow camera and location permissions
   - Capture an image
   - Submit a report
4. **Test Cleaning:**
   - Navigate to "Cleaner" page
   - Select a report
   - Try the cleaning flow
5. **Test Dashboards:**
   - Check User Dashboard
   - Check Analytics
   - Check Leaderboard

✅ **If all features work end-to-end, your deployment is complete!**

---

## Quick Reference

### Your Live URLs

```
Backend (Railway):  https://luit-production-xxxx.up.railway.app
Frontend (Vercel):  https://luitv3.vercel.app
Health Check:       https://luit-production-xxxx.up.railway.app/health
Admin Dashboard:    https://luitv3.vercel.app/admin
```

### Environment Variables Summary

**Railway (Backend):**
- FIREBASE_PROJECT_ID
- FIREBASE_PRIVATE_KEY_ID
- FIREBASE_PRIVATE_KEY
- FIREBASE_CLIENT_EMAIL
- FIREBASE_CLIENT_ID
- FIREBASE_WEB_API_KEY
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- BACKEND_PORT=8000
- BACKEND_ENV=production
- PORT=8000
- FRONTEND_URL (your Vercel URL)

**Vercel (Frontend):**
- VITE_API_URL (your Railway URL)
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

---

## Troubleshooting

### Backend Issues

**"Build Failed" on Railway**
- Check Railway logs for specific error
- Verify `requirements.txt` is correct
- Ensure Root Directory is set to `backend`
- Try redeploying

**"Firebase initialization failed"**
- Double-check all Firebase variables
- Ensure `FIREBASE_PRIVATE_KEY` has `\n` not actual newlines
- Verify service account JSON is correct
- Redeploy after fixing

**"Health check returns 500"**
- Check Railway logs for error messages
- Verify all environment variables are set
- Check Cloudinary credentials
- Ensure PORT is set to 8000

### Frontend Issues

**"Build Failed" on Vercel**
- Check Vercel build logs
- Verify `frontend` is set as root directory
- Check `package.json` has correct scripts
- Try redeploying

**"Cannot connect to backend"**
- Verify `VITE_API_URL` in Vercel matches Railway URL
- Check CORS settings in `backend/main.py`
- Ensure `FRONTEND_URL` in Railway matches Vercel URL
- Check browser console for CORS errors

**"Firebase not initialized"**
- Verify all `VITE_FIREBASE_*` variables in Vercel
- Check Firebase Console for correct values
- Redeploy after adding variables

**"White screen on Vercel"**
- Check browser console for errors
- Verify all environment variables are set
- Check that build completed successfully
- Try clearing Vercel cache and redeploying

### Integration Issues

**"CORS Error"**
- Update `FRONTEND_URL` in Railway to match your Vercel URL
- Ensure no trailing slash in URLs
- Check that Railway has redeployed after updating CORS
- Clear browser cache and try again

**"502 Bad Gateway"**
- Backend is down or restarting
- Wait 1-2 minutes for Railway to restart
- Check Railway service status
- Verify environment variables

---

## Post-Deployment Checklist

- [ ] Backend health check returns 200 OK
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Reporting flow works (camera, location, submit)
- [ ] Image upload to Cloudinary works
- [ ] Cleaning flow works
- [ ] Dashboards display data correctly
- [ ] Leaderboard works
- [ ] Analytics display correctly
- [ ] Mobile responsiveness verified
- [ ] CORS configured correctly
- [ ] All environment variables set

---

## Monitoring & Maintenance

### Railway Monitoring
1. Go to Railway dashboard
2. Check **Metrics** tab for:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### Vercel Monitoring
1. Go to Vercel dashboard
2. Check **Analytics** for:
   - Page views
   - Unique visitors
   - Performance metrics
   - Error rates

### Set Up Alerts (Optional)
- Railway: Enable email alerts for crashes
- Vercel: Enable deployment notifications
- Firebase: Set up quota alerts

---

## Cost Breakdown (Free Tier)

**Railway (Free Plan):**
- $5 free credit per month
- ~500 hours of runtime
- Sleeps after 15 min of inactivity (free tier)

**Vercel (Hobby Plan):**
- Unlimited deployments
- 100 GB bandwidth per month
- Automatic HTTPS
- No sleep/downtime

**Firebase (Spark Plan - Free):**
- 1 GB storage
- 10 GB/month transfer
- 50K reads/day
- 20K writes/day

**Cloudinary (Free Plan):**
- 25 GB storage
- 25 GB bandwidth/month
- 25K transformations/month

**Total Cost:** **$0/month** for small to medium usage! 🎉

---

## Next Steps

Once deployed:

1. **Share your URLs** with your team
2. **Test on mobile devices** (the app is mobile-first)
3. **Monitor usage** through Railway, Vercel, and Firebase dashboards
4. **Set up custom domain** (optional) through Vercel
5. **Enable Firebase security rules** for production
6. **Set up monitoring alerts** for uptime and errors

---

## Support Resources

**Railway:**
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
- Status: https://status.railway.app

**Vercel:**
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Status: https://vercel-status.com

**Firebase:**
- Docs: https://firebase.google.com/docs
- Stack Overflow: Tag `firebase`
- Status: https://status.firebase.google.com

---

🎉 **Congratulations! Your LUIT Clean Water platform is now live!** 🎉

**Made with ❤️ to clean the Brahmaputra River**
