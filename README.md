# Airtel Payment Bank Certification Website

A professional website for Airtel Payment Bank certification training with admin panel.

## Features

- 🏠 **Homepage** - Browse certification questions with search/filter
- 🎯 **Quiz Mode** - Practice with timed quizzes 
- 🔒 **Admin Panel** - Secure question management (Password protected)
- 📱 **Mobile Responsive** - Works on all devices
- 🎨 **Professional Design** - Airtel brand colors and styling

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5000`

## Admin Access

- Go to `/admin` 
- Enter the admin password to manage questions
- Add, edit, or delete certification questions

## Essential Files Structure

```
├── package.json              # Dependencies
├── server/
│   ├── index.ts              # Main server
│   ├── routes.ts             # API routes
│   └── storage.ts            # Database logic
├── shared/
│   └── schema.ts             # Data models
├── client/
│   ├── index.html            # Main HTML
│   └── src/
│       ├── main.tsx          # React entry
│       ├── App.tsx           # Main app
│       ├── index.css         # Styles
│       └── pages/
│           ├── home.tsx      # Homepage
│           └── admin.tsx     # Admin panel
├── tailwind.config.ts        # Styling
├── tsconfig.json             # TypeScript
└── vite.config.ts            # Build config
```

## Technologies Used

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: In-memory storage (easily replaceable with PostgreSQL)
- **Build**: Vite for fast development and production builds

## Deployment

The app is ready for deployment on platforms like Replit, Vercel, or any Node.js hosting service.

---

© 2025 Airtel Payment Bank Certification Training