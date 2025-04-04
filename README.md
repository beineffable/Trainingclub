# GitHub Repository for Training Club Website

This repository contains the updated Training Club website with fixes for:
1. Intro animation - now loads properly every time
2. Theme toggle - properly switches between light and dark modes
3. Skip button - works correctly to bypass the animation

## Deployment Instructions

### Connecting to Vercel

1. Create a new project on Vercel
2. Connect this GitHub repository
3. Configure the project with the following settings:
   - Framework Preset: Static Site
   - Build Command: None (pre-built)
   - Output Directory: ./
   - Install Command: None

4. Set the custom domain to: trainingclub.vercel.app

### Configuration

The repository includes a `vercel.json` file with the necessary configuration for deployment.

## Recent Changes

- Fixed intro animation to load consistently on every page visit
- Fixed theme toggle functionality across all pages
- Improved skip button functionality and styling
- Enhanced cross-browser compatibility
- Improved mobile responsiveness

## File Structure

- `/assets/css/` - Stylesheet files including dark mode and theme toggle styles
- `/assets/js/` - JavaScript files for animation, theme toggle, and skip button
- `/assets/images/` - Image assets for the website
- `*.html` - HTML pages for the website
