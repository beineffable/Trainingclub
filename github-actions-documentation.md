# GitHub Actions Automation Documentation

## Overview

This document explains the automated GitHub workflow that has been implemented for the Training Club website. This automation eliminates the need to manually create pull requests when making updates to the codebase.

## Automated Workflows

Two GitHub Actions workflows have been implemented:

1. **Automatic Pull Request Creation** - Creates pull requests automatically when changes are pushed to development branches
2. **Automatic Pull Request Merging** - Automatically merges pull requests that have the "automated-pr" label

## How It Works

### Automatic Pull Request Creation

When you push changes to any of these branches:
- `feature/*` (e.g., feature/new-homepage)
- `bugfix/*` (e.g., bugfix/login-issue)
- `enhancement/*` (e.g., enhancement/better-forms)
- `icon-enhancements`
- `mobile-responsiveness-improvements`

The system will automatically:
1. Create a new pull request to merge your changes into the main branch
2. Add a descriptive title and body to the pull request
3. Apply the "automated-pr" label to the pull request

### Automatic Pull Request Merging

When a pull request with the "automated-pr" label is created:
1. The system will automatically review the pull request
2. If there are no conflicts, it will automatically merge the pull request into the main branch
3. The branch will be deleted after successful merging
4. Vercel will automatically deploy the changes to your production site

## How to Use This Automation

### For New Features or Bug Fixes

1. Create a new branch with an appropriate prefix:
   ```
   git checkout -b feature/your-feature-name
   ```
   or
   ```
   git checkout -b bugfix/issue-description
   ```

2. Make your changes and commit them:
   ```
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your changes to GitHub:
   ```
   git push origin feature/your-feature-name
   ```

4. The system will automatically create a pull request and merge it if there are no conflicts

5. Vercel will automatically deploy the changes to your production site

### For Existing Branches

If you're working on an existing branch like `icon-enhancements`:

1. Make your changes and commit them:
   ```
   git add .
   git commit -m "Description of your changes"
   ```

2. Push your changes to GitHub:
   ```
   git push origin icon-enhancements
   ```

3. The system will automatically create a pull request and merge it

## Benefits

- **Time-saving**: No need to manually create pull requests
- **Consistency**: All pull requests have standardized titles and descriptions
- **Automation**: Changes are automatically deployed to production after merging
- **Traceability**: All changes are properly documented in GitHub

## Customizing the Workflow

If you need to add more development branches to the automation, edit the `.github/workflows/auto-pr.yml` file and add your branch names to the `branches` list under the `on.push` section.

## Troubleshooting

If a pull request is not automatically created or merged:

1. Check if you pushed to one of the branches listed in the automation configuration
2. Verify there are no merge conflicts with the main branch
3. Check the GitHub Actions tab in your repository to see if there were any errors in the workflow

For any issues with the automation, you can always create pull requests manually as before.
