# Holidaze – Venue Booking Platform

Holidaze is a venue booking web application where users can browse venues, make bookings, and manage their profile.  
Users can also upgrade their account to a **Venue Manager**, allowing them to create, edit, and manage venues and view bookings.

This project is built as part of a Noroff frontend assignment and integrates with the Noroff Holidaze API.

---

## Features

### General

- User authentication (login / register)
- Persistent authentication using Zustand + localStorage
- Profile page with editable avatar, banner, and bio
- Global alert system for user feedback
- Responsive design

### Customer

- Browse venues
- View venue details
- Make bookings
- View own bookings in dashboard

### Venue Manager

- Upgrade account to Venue Manager
- Create, edit, and delete venues
- View bookings per venue
- Manager-specific dashboard

---

## Tech Stack

- **React**
- **TypeScript**
- **React Router**
- **Zustand** (state management)
- **Bootstrap** (styling)
- **Noroff Holidaze API**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mayamariaruth/holidaze
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a .env file in the root of the project and add:

```bash
VITE_API_BASE_URL=https://api.noroff.dev/api/v1
VITE_API_KEY=your_api_key_here
```

The API key is required for authenticated requests.

### 4. Run the project locally

```bash
npm run dev
```

The app will be available at:
http://localhost:5173

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run deploy    # Deploy the build to GitHub Pages
npm run lint      # Run ESLint to check for code issues
npm run lint:fix  # Run ESLint and automatically fix issues
npm run format    # Run Prettier to format the code
```
