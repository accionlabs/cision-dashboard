# Cision Dashboard - GitHub Pages Deployment Guide

## Prerequisites
- Git installed on your machine
- GitHub account with access to AccionLabs organization
- Node.js and npm installed

## Deployment Steps

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Cision Dashboard Angular app"
```

### 2. Create GitHub Repository
1. Go to https://github.com/accionlabs
2. Click "New repository"
3. Name it `cision-dashboard`
4. Keep it public (for GitHub Pages)
5. Don't initialize with README (we already have files)
6. Create repository

### 3. Connect Local Repository to GitHub
```bash
git remote add origin https://github.com/accionlabs/cision-dashboard.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Under "Source", select "Deploy from a branch"
4. Under "Branch", select `main`
5. Under "Folder", select `/docs`
6. Click Save

### 5. Access Your Deployed Application
After a few minutes, your app will be available at:
```
https://accionlabs.github.io/cision-dashboard/
```

## Building for Production

The production build has already been created in the `docs` folder. If you need to rebuild:

```bash
# Install dependencies
npm install

# Build for production with GitHub Pages base href
npx ng build --configuration production --output-path docs --base-href /cision-dashboard/

# Move files from docs/browser to docs root (for Angular 19)
mv docs/browser/* docs/
rm -rf docs/browser

# Create 404.html for SPA routing
cp docs/index.html docs/404.html
```

## Important Notes

1. **Base HREF**: The app is configured with base-href `/cision-dashboard/` for GitHub Pages deployment
2. **404 Handling**: The `404.html` file ensures client-side routing works on GitHub Pages
3. **Assets**: The logo and other assets are included in the build
4. **Updates**: After making changes, rebuild and push to update the live site

## Updating the Deployment

To update the deployed application:

```bash
# Make your changes
# ...

# Rebuild the application
npm run build:ghpages

# Or manually:
npx ng build --configuration production --output-path docs --base-href /cision-dashboard/
mv docs/browser/* docs/
rm -rf docs/browser
cp docs/index.html docs/404.html

# Commit and push
git add .
git commit -m "Update dashboard"
git push
```

The GitHub Pages site will automatically update within a few minutes.

## Troubleshooting

- **Blank Page**: Check browser console for errors. Ensure base-href is correct.
- **404 Errors**: Ensure 404.html exists in docs folder
- **Assets Not Loading**: Check that logo.png is in the docs folder
- **Routing Issues**: The 404.html file should be identical to index.html

## Repository Structure
```
cision-dashboard-angular/
├── src/                  # Source code
├── docs/                 # GitHub Pages deployment folder
│   ├── index.html
│   ├── 404.html
│   ├── logo.png
│   ├── favicon.ico
│   └── ...
└── package.json
```