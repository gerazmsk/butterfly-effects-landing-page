# Railway Deployment Troubleshooting

## Current Setup
- Node.js server with Express
- Static file serving
- Email API endpoint

## Railway Configuration Steps

### 1. Check Project Settings in Railway Dashboard

Go to your Railway project → **Settings** tab:

1. **Service Type**: Make sure it's set to "Web Service" (not Static Site)
2. **Root Directory**: Should be `/` (root)
3. **Build Command**: Should be empty (Railway auto-detects `npm install`)
4. **Start Command**: Should be `npm start` or `node server.js`

### 2. Check Environment Variables

Go to **Variables** tab and ensure:
- `PORT` is automatically set by Railway (don't add this manually)
- `SMTP_USER` and `SMTP_PASS` if you want email to work (optional for now)

### 3. Check Deployment Logs

In the **Deployments** tab, click on the latest deployment and check:

**Look for these success messages:**
- ✅ `npm install` or `npm ci` completing
- ✅ `Server started successfully!`
- ✅ `Listening on port: [number]`

**Common errors:**
- ❌ `Cannot find module` → Dependencies not installing
- ❌ `EADDRINUSE` → Port conflict
- ❌ `Build Failed` → Check the build logs above

### 4. If Still Not Working

**Option A: Redeploy from Scratch**
1. In Railway dashboard, go to your service
2. Click **Settings** → **Delete Service** (or create a new one)
3. Connect to the same GitHub repo
4. Railway should auto-detect Node.js from `package.json`

**Option B: Check Railway Service Type**
- Make sure the service is NOT set to "Static Site"
- It should be "Web Service" or "Node.js"

**Option C: Manual Start Command**
In Railway dashboard → Settings → Deploy:
- Set **Start Command** to: `node server.js`

## Quick Test

Once deployed, test these URLs:
- `https://your-app.railway.app/health` → Should return `{"status":"ok"}`
- `https://your-app.railway.app/` → Should show landing page

## Still Having Issues?

Please share:
1. Screenshot of Railway deployment logs
2. Any error messages from the logs
3. What you see when visiting the URL

