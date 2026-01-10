# 🚨 RAILWAY DEPLOYMENT TROUBLESHOOTING GUIDE

## Current Issue: ERR_NAME_NOT_RESOLVED

Your Railway backend URL `luitv3-production-86f3.up.railway.app` exists but isn't resolving.

## Quick Fix Steps:

### Option 1: Force Redeploy (2 minutes)
1. Go to Railway Dashboard: https://railway.app
2. Click your `luitv3` service
3. Go to **Deployments** tab
4. Click **"Deploy"** or **"Redeploy Latest"**
5. Wait for "Deployed" status
6. Test: Open `https://luitv3-production-86f3.up.railway.app/health` in browser

### Option 2: Generate New Domain (1 minute)
1. Go to Railway **Settings** → **Networking**
2. Under "Public Networking", click the **trash icon** next to current domain
3. Click **"Generate Domain"**
4. Copy the NEW domain (e.g., `luitv3-production-xyz123.up.railway.app`)
5. Use the **⚙️ API Settings** button on your Vercel site to set this new URL

### Option 3: Check Deployment Logs
1. Railway Dashboard → **Deployments**
2. Click the latest deployment
3. Check for errors:
   ```
   ❌ Missing environment variable
   ❌ Port binding failed
   ❌ Firebase init failed
   ```
4. Fix any errors and redeploy

## Common Issues:

### Issue: "Build Failed"
**Solution:** Check if all files are pushed to GitHub
```bash
git status
git add .
git commit -m "Fix deployment"
git push origin main
```

### Issue: "Firebase initialization failed"
**Solution:** Verify Firebase variables in Railway:
- FIREBASE_PROJECT_ID
- FIREBASE_PRIVATE_KEY
- FIREBASE_CLIENT_EMAIL
- FIREBASE_WEB_API_KEY

### Issue: "Port binding failed"
**Solution:** Ensure `PORT=8000` is set in Railway variables

## Testing Backend Health:

Once deployed, test these URLs:
- `https://YOUR-RAILWAY-URL/health` → Should return `{"status": "healthy"}`
- `https://YOUR-RAILWAY-URL/docs` → Should show API documentation

## If All Else Fails:

1. Delete the Railway service
2. Create a new one from scratch
3. Reconnect to GitHub repo `HyperPenetrator02/luitv3`
4. Set root directory to `backend`
5. Add all environment variables
6. Generate domain
7. Update frontend using ⚙️ API Settings button
