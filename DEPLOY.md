# Deployment Instructions

## Step 1: Push to GitHub

### Option A: Create Repository on GitHub Website

1. Go to https://github.com/new
2. Repository name: `butterfly-effects-landing-page` (or any name you prefer)
3. Description: "Landing page for Butterfly Effects Deerfield Beach ABA Therapy Center"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option B: Use the commands below

After creating the repository on GitHub, run these commands:

```bash
cd "/Users/zalygingeorgy/Downloads/Landing Page DB"

# Replace YOUR_USERNAME with your GitHub username
# Replace REPO_NAME with your repository name
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Railway

### Method 1: Deploy from GitHub (Recommended)

1. Go to https://railway.app
2. Sign in with your GitHub account
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository (`butterfly-effects-landing-page`)
6. Railway will automatically detect it's a static site
7. Add a custom domain (optional) in the Settings tab

### Method 2: Deploy via Railway CLI

```bash
# Install Railway CLI (if not installed)
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Deploy
railway up
```

### Railway Configuration

The project includes:
- `package.json` - Defines the start command
- `railway.json` - Railway-specific configuration

Railway will automatically:
- Serve the static files using `npx serve`
- Listen on port 3000 (Railway will assign the port automatically)

### Environment Variables

No environment variables needed for this static site.

### Custom Domain Setup

1. In Railway dashboard, go to your project
2. Click on "Settings"
3. Scroll to "Domains"
4. Add your custom domain
5. Follow the DNS configuration instructions

## Troubleshooting

### If Railway doesn't detect the site:

1. Make sure `package.json` is in the root directory
2. Railway should automatically use the `start` script
3. If issues persist, check Railway logs in the dashboard

### If you need to change the port:

Railway automatically assigns a `PORT` environment variable. The `serve` package will use it automatically.

