# 🚨 EMERGENCY FIX - Railway Domain Not Resolving

## Problem
Railway backend is running but domain `luitv3-production-86f3.up.railway.app` returns `ERR_NAME_NOT_RESOLVED`

## SOLUTION: Generate New Railway Domain

### Step 1: Delete Current Domain
1. Go to Railway Dashboard: https://railway.app
2. Click your `luitv3` service
3. Go to **Settings** tab
4. Scroll to **Networking** section
5. Find `luitv3-production-86f3.up.railway.app`
6. Click the **trash icon** 🗑️ to delete it

### Step 2: Generate Fresh Domain
1. Still in **Settings** → **Networking**
2. Click **"Generate Domain"** button
3. Railway will create a NEW URL like: `luitv3-production-abc123.up.railway.app`
4. **COPY THIS NEW URL**

### Step 3: Test New Domain
1. Open: `https://YOUR-NEW-RAILWAY-URL/health`
2. Should see: `{"status":"healthy","message":"LUIT Backend is running"}`

### Step 4: Update Vercel Environment Variable
1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click your `luitv3` project
3. Go to **Settings** → **Environment Variables**
4. Find `VITE_API_URL`
5. Click **Edit**
6. Paste your NEW Railway URL
7. Click **Save**

### Step 5: Redeploy Frontend
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2 minutes

### Step 6: Test
1. Open: `https://luitv3-dun.vercel.app`
2. Try to register
3. Should work! ✅

## Alternative: Use API Settings Button (Faster)
1. Open: `https://luitv3-dun.vercel.app`
2. Click red **"⚙️ API Settings"** button (bottom-right)
3. Paste your NEW Railway URL
4. Click **"Save & Reload"**
5. Try registration immediately!

## Why This Happens
- Railway sometimes has DNS propagation delays
- Old domains can become "stale" and stop resolving
- Generating a fresh domain fixes it instantly

## Expected Result
After following these steps, registration should work perfectly!
