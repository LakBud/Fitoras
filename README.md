# Fitoras

A modern, privacy-focused fitness web application for managing workout routines, tracking exercises, and planning your fitness journey. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **800+ Exercises**: Browse a comprehensive collection of exercises targeting every muscle group
- **Workout Splits**: Create, edit, and manage custom workout splits with multiple days
- **Exercise Library**: Filter and search exercises by category, equipment, difficulty level, and muscle groups
- **Calendar Planning**: Track and plan your workouts on an interactive calendar
- **Privacy First**: All data is stored locally on your device - no external servers
- **Responsive Design**: Beautiful, modern UI that works seamlessly on desktop and mobile
- **Drag & Drop**: Intuitive drag-and-drop interface for organizing exercises in your splits
- **Category Management**: Organize exercises within workout days using custom categories

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fitora
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
fitora/
├── public/
│   └── data/
│       ├── allExercises.json      # Exercise database
│       └── exercises/             # Exercise-specific data
├── src/
│   ├── components/
│   │   ├── calendar/              # Calendar view components
│   │   ├── common/                # Shared components (NavBar, etc.)
│   │   ├── exercise/              # Exercise browsing components
│   │   ├── split/                 # Workout split management
│   │   └── ui/                    # Reusable UI components
│   ├── hooks/
│   │   ├── control/               # Business logic hooks
│   │   └── ui/                    # UI-related hooks
│   ├── lib/                       # Utility functions
│   ├── pages/                     # Page components
│   ├── routes/                    # Routing configuration
│   ├── stores/                    # Zustand state management
│   └── types/                     # TypeScript type definitions
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🛠️ Tech Stack

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### State Management

- **Zustand** - Lightweight state management

### Database

- **IndexedDB** - Lightweight Browser Database (50MB+)

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Accessible UI components
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Icons** - Additional icons

### Form & Validation

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Drag & Drop

- **@dnd-kit** - Modern drag-and-drop toolkit
- **react-movable** - Alternative drag-and-drop solution

### Utilities

- **class-variance-authority** - Component variants
- **clsx** - Conditional classNames
- **tailwind-merge** - Merge Tailwind classes
- **axios** - HTTP client
- **uuid** - Unique ID generation
- **sift** - MongoDB-like query language for filtering

## 📱 Pages & Routes

| Route              | Description                          |
| ------------------ | ------------------------------------ |
| `/`                | Home page with app overview          |
| `/exercise`        | Browse all exercises with filtering  |
| `/exercise/:id`    | Detailed view of a specific exercise |
| `/splits`          | View all workout splits              |
| `/splits/:id`      | View details of a specific split     |
| `/splits/:id/edit` | Edit/create workout splits           |
| `/calendar`        | Calendar view for workout planning   |

## 🎨 Key Features Details

### Home/Dashboard

- CTA Buttons
- Statsitics cards based on Total Splits, Workouts this week, Workout Streaks, and Total Splits.

### Exercise Management

- Filter by category, equipment, difficulty level, and muscle groups
- Detailed exercise information including instructions and muscle groups
- Visual exercise demonstrations (when available)
- Infinite scroll for smooth browsing

### Workout Splits

- Create custom workout splits with multiple days
- Add exercises to specific days
- Organize exercises into categories with custom colors
- Set custom sets and reps for each exercise
- Drag-and-drop to reorder exercises
- Full CRUD operations (Create, Read, Update, Delete)

### Calendar Integration

- Visual workout planning
- Track completed workouts
- Monthly/weekly views
- Quick navigation between dates

## 🔒 Privacy & Data Storage

Fitoras prioritizes your privacy:

- All workout data is stored locally in your browser
- No data is sent to external servers
- No account creation required
- Only Google Analytics is used

## 🌐 Deployment

The project is configured for deployment on Vercel (see `vercel.json`). To deploy:

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

- `FITORA_BASE_PATH` - Base path for the application (default: `/`)

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Contributions are welcome! Please ensure:

- Code passes linting (`npm run lint`)
- TypeScript types are properly defined
- Components follow existing patterns
- UI is responsive and accessible

## 🐛 Known Issues

- Exercise data is loaded from a single JSON file
- No backup/export functionality yet

## 🔮 Future Enhancements

- Export/import workout data
- Custom exercise creation

---

Built with ❤️ for fitness enthusiasts
