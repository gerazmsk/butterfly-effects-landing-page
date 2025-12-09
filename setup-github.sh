#!/bin/bash

# GitHub Setup Script for Butterfly Effects Landing Page
# Replace YOUR_USERNAME and REPO_NAME before running

echo "🚀 Setting up GitHub repository..."
echo ""
echo "Before running this script:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository (name it whatever you like)"
echo "3. DO NOT initialize with README, .gitignore, or license"
echo "4. Copy the repository URL"
echo ""
read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo ""
echo "📦 Adding remote origin..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

echo "🌿 Setting branch to main..."
git branch -M main

echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Your repository: $REPO_URL"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. You're logged into GitHub (git config --global user.name)"
    echo "   2. You have access to the repository"
    echo "   3. The repository URL is correct"
fi

