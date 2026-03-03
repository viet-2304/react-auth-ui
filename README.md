# React Auth UI

A simple React + Redux login/register UI with form validation and password strength meter. No backend required — pure frontend demo.

## Features

- Login & Register forms with tab-based navigation
- Client-side form validation (email format, required fields, password match)
- Password strength meter (Weak / Fair / Good / Strong)
- Show/hide password toggle
- Redux Toolkit for global auth state management
- Simulated user "database" stored in Redux state
- Dashboard with avatar and sign-out after successful auth
- Responsive design (mobile-friendly)

## Tech Stack

- React 18
- Redux Toolkit
- React-Redux
- Vite
- CSS (no framework)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 16
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/react-auth-ui.git
cd react-auth-ui

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will open at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
react-auth-ui/
├── index.html
├── package.json
├── vite.config.js
├── preview.html            ← Standalone preview (no build needed)
└── src/
    ├── main.jsx             ← Entry point
    ├── App.jsx              ← Provider wrapper
    ├── styles.css           ← All styles
    ├── store/
    │   ├── store.js         ← Redux store config
    │   └── authSlice.js     ← Auth reducers & actions
    └── components/
        ├── AuthPage.jsx     ← Main page with tab switching
        ├── LoginForm.jsx    ← Login form with validation
        ├── RegisterForm.jsx ← Register form with password strength
        └── Dashboard.jsx    ← Post-login welcome screen
```

## Quick Preview

Don't want to install anything? Just open `preview.html` in your browser — it's a fully working standalone version with all dependencies loaded via CDN.

## License

MIT
