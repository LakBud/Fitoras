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
- pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fitora
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build the production bundle
- `pnpm run preview` - Preview the production build locally
- `pnpm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
fitora/
├── .github/
│   └── dependabot.yml             # Automated dependency updates
├── node_modules/                  # Installed dependencies
├── public/
│   ├── data/                      # Static data assets
│   ├── favicon.png
│   ├── preview.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── calendar/              # Calendar related UI
│   │   ├── common/                # Shared/general components
│   │   ├── exercise/              # Exercise browsing/listing
│   │   ├── exerciseDetail/        # Exercise detail views
│   │   ├── filters/               # Filter UI and logic
│   │   ├── home/                  # Home dashboard components
│   │   ├── split/                 # Workout split main components
│   │   ├── splitControl/          # Split control logic/UI
│   │   ├── splitDetail/           # Split details views
│   │   └── ui/                    # Reusable UI primitives (buttons, modals, etc.)
│   ├── hooks/                     # Custom hooks
│   ├── lib/                       # Utils/helpers
│   ├── pages/                     # Higher-level routed page components
│   ├── routes/                    # Route definitions
│   ├── stores/                    # Zustand stores
│   ├── types/                     # Global TypeScript types
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
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

### Form 

- **React Hook Form** - Form management


### Drag & Drop

- **@dnd-kit** - Modern drag-and-drop toolkit

### Utilities

- **class-variance-authority** - Component variants
- **clsx** - Conditional classNames
- **tailwind-merge** - Merge Tailwind classes
- **axios** - HTTP client
- **uuid** - Unique ID generation

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
pnpm i -g vercel
```

2. Deploy:

```bash
vercel
```

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

- `FITORA_BASE_PATH` - Base path for the application (default: `/`)

## 📄 License

This project is open source

## 🤝 Contributing

Contributions are welcome! Please ensure:

- Code passes linting (`pnpm run lint`)
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
