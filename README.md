# Arto App

A modern React-based dashboard application built with Material-UI. Arto App provides a sleek and intuitive interface for managing your business operations.

## 🌟 Features

- **Modern UI/UX**: Built with Material-UI (MUI) v5.13.4 components for a polished and responsive design

- **Simple Authentication**: Demo login system with username and password
- **Conversations**: Manage your customer conversations
- **Theme Customization**: Choose from a variety of pre-built themes and customize the application to match your brand with ease, including support for both light and dark themes and right-to-left (RTL) layouts

- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices

## 🚀 Live Demo

Check out the live demos:
- GitHub Pages: [Arto App on GitHub Pages](https://brendan-carikas.github.io/prototype/#/login)
- Firebase Hosting: [Arto App on Firebase](https://artoadmin.web.app/)


## 🛠️ Development

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Building and Deployment
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

#### Deploy to Firebase Hosting (Recommended)
The simplest and most reliable method is to deploy directly from your local machine:

```bash
# 1. Build the application
CI=false npm run build

# 2. Deploy directly to Firebase
firebase deploy --only hosting
```

This approach bypasses GitHub Actions entirely and deploys directly from your local machine, which is faster and avoids any potential issues with the GitHub Actions environment.

### Code Quality
This project uses ESLint to maintain code quality. The build process treats warnings as errors, ensuring clean code in production.

```bash
# Run ESLint
npx eslint --ext .js,.jsx src/
```

## 📜 Documentation