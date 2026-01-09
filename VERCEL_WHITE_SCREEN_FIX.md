# 🔧 Fix White Screen on Vercel Deployment

**Issue:** Vercel shows white screen, but localhost works fine  
**Status:** Fixing now...

---

## 🔍 DIAGNOSIS

### Symptoms:
- ✅ Local dev works: `npm run dev` shows everything
- ✅ Local build works: `npm run build` completes successfully
- ❌ Vercel deployment: White screen, no content
- ❌ Missing logos, buttons, and UI elements

### Root Cause:
The issue is likely one of these:

1. **Wrong Root Directory** - Vercel building from wrong folder
2. **Missing Environment Variables** - Firebase config not set
3. **Build Configuration** - Vite config issue
4. **Routing Issue** - SPA routing not configured

---

## ✅ SOLUTION: Step-by-Step Fix

### Step 1: Verify Vercel Project Settings

1. Go to: https://vercel.com/dashboard
2. Click on your `luitv3` project
3. Go to **Settings** tab
4. Check **General** section:

**Required Settings:**
```
Framework Preset: Vite
Root Directory: frontend  ← MUST BE SET!
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**If Root Directory is NOT set to `frontend`:**
1. Click "Edit" next to Root Directory
2. Type: `frontend`
3. Click "Save"
4. Redeploy

---

### Step 2: Verify Environment Variables

1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Make sure ALL these are set:

```bash
VITE_API_URL=https://your-railway-url.up.railway.app
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=luit-redeployed.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=luit-redeployed
VITE_FIREBASE_STORAGE_BUCKET=luit-redeployed.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=760872311190
VITE_FIREBASE_APP_ID=1:760872311190:web:...
```

**If any are missing:**
1. Click "Add New"
2. Enter Name and Value
3. Select "Production", "Preview", and "Development"
4. Click "Save"

---

### Step 3: Update vercel.json (Already Done)

Your `frontend/vercel.json` should have:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This is already correct! ✅

---

### Step 4: Force Redeploy

After fixing settings:

**Option A: From Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the three dots (...) on latest deployment
3. Click "Redeploy"
4. Wait 2-3 minutes

**Option B: Push a Small Change**
```bash
# Add a comment to trigger rebuild
git commit --allow-empty -m "Trigger Vercel rebuild"
git push origin main
```

---

## 🐛 COMMON ISSUES & FIXES

### Issue 1: Root Directory Not Set
**Symptom:** White screen, build fails, or wrong files deployed

**Fix:**
1. Vercel Settings → General
2. Root Directory = `frontend`
3. Save and redeploy

---

### Issue 2: Environment Variables Missing
**Symptom:** White screen, Firebase errors in console

**Fix:**
1. Vercel Settings → Environment Variables
2. Add all `VITE_*` variables
3. Make sure they're set for "Production"
4. Redeploy

---

### Issue 3: Build Output Wrong
**Symptom:** 404 errors, assets not found

**Fix:**
1. Vercel Settings → General
2. Output Directory = `dist`
3. Build Command = `npm run build`
4. Redeploy

---

### Issue 4: Routing Breaks on Refresh
**Symptom:** Works on homepage, breaks on other routes

**Fix:**
Already fixed with `vercel.json` rewrites! ✅

---

## 🧪 TESTING AFTER FIX

### Step 1: Wait for Deployment
- Go to Vercel dashboard
- Check "Deployments" tab
- Wait for "Ready" status (2-3 min)

### Step 2: Test Your Site
1. Open your Vercel URL
2. Should see LUIT main page with:
   - ✅ 💧 Logo
   - ✅ "LUIT" title
   - ✅ "Login" button
   - ✅ "Clean Brahmaputra River" heading
   - ✅ Analytics numbers
   - ✅ "How It Works" section

### Step 3: Test Navigation
- Click "Login" → Should show login page
- Click "Leaderboard" → Should work
- Click "Analytics" → Should work
- Refresh page → Should still work

### Step 4: Check Console
- Press F12
- Go to Console tab
- Should see NO errors
- Should see API requests succeeding

---

## 📋 VERIFICATION CHECKLIST

Before declaring success:

- [ ] Vercel Root Directory = `frontend`
- [ ] All environment variables set
- [ ] Build completes successfully
- [ ] Deployment shows "Ready"
- [ ] Main page loads (not white screen)
- [ ] Logo and buttons visible
- [ ] Navigation works
- [ ] No console errors
- [ ] Can login/register
- [ ] Features work

---

## 🔍 DEBUGGING TIPS

### Check Build Logs
1. Vercel Dashboard → Deployments
2. Click on latest deployment
3. Click "Building" or "View Function Logs"
4. Look for errors

### Common Build Errors:

**"Module not found"**
- Missing dependency in package.json
- Run `npm install` locally
- Commit package-lock.json

**"Environment variable not found"**
- Add missing VITE_* variable in Vercel
- Redeploy

**"Build failed"**
- Check if `npm run build` works locally
- Fix any TypeScript/ESLint errors
- Push fixes

---

## 🚀 QUICK FIX COMMANDS

If you need to trigger a rebuild:

```bash
# Method 1: Empty commit
git commit --allow-empty -m "Trigger rebuild"
git push origin main

# Method 2: Touch a file
cd frontend
echo "// rebuild" >> src/main.jsx
git add src/main.jsx
git commit -m "Trigger rebuild"
git push origin main
```

---

## 📊 EXPECTED RESULT

### Before Fix:
```
❌ White screen
❌ No content visible
❌ Console shows errors
❌ Assets not loading
```

### After Fix:
```
✅ Full page loads
✅ Logo and buttons visible
✅ Proper styling
✅ All features work
✅ No console errors
```

---

## 🎯 MOST LIKELY FIX

Based on your symptoms, the issue is probably:

**Root Directory not set to `frontend`**

**Quick Fix:**
1. Go to Vercel → Settings → General
2. Find "Root Directory"
3. Click "Edit"
4. Enter: `frontend`
5. Click "Save"
6. Go to Deployments → Click "..." → "Redeploy"
7. Wait 2-3 minutes
8. Refresh your site

**This should fix it!** 🎉

---

## 📞 STILL NOT WORKING?

If the white screen persists:

### 1. Check Browser Console
- Press F12
- Go to Console tab
- Share the error messages

### 2. Check Network Tab
- Press F12
- Go to Network tab
- Refresh page
- Look for failed requests (red)
- Check what's failing

### 3. Check Vercel Logs
- Vercel Dashboard → Deployments
- Click latest deployment
- Check build logs for errors

### 4. Compare with Local
- Run `npm run build` locally
- Run `npm run preview` locally
- If preview works but Vercel doesn't:
  - It's a Vercel configuration issue
  - Double-check Root Directory setting

---

## ✅ ACTION ITEMS

**Do this NOW:**

1. **Go to Vercel Dashboard**
   - URL: https://vercel.com/dashboard

2. **Check Root Directory**
   - Settings → General → Root Directory
   - Should be: `frontend`
   - If not, edit and save

3. **Check Environment Variables**
   - Settings → Environment Variables
   - Verify all VITE_* variables exist
   - Add any missing ones

4. **Redeploy**
   - Deployments → Latest → "..." → Redeploy
   - Wait 2-3 minutes

5. **Test**
   - Open your Vercel URL
   - Should see full page with logo and buttons!

---

**The fix is simple - just make sure Root Directory is set to `frontend` in Vercel!** 🚀

Let me know if you need help with any step!
