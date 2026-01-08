# Portfolio Dev Showcase

A modern, responsive developer portfolio website built with React and TypeScript, featuring a clean design with sections for showcasing skills, experience, projects, certificates, and contact information. Includes an admin panel for content management with Firebase authentication.

## Features

- **Hero Section**: Eye-catching introduction with animated elements
- **About Section**: Personal information and skills
- **Experience Section**: Interactive timeline of professional experience
- **Projects Section**: Showcase of development projects with links
- **Certificates Section**: Display of certifications and achievements
- **Contact Section**: Contact form for inquiries
- **Admin Panel**: Protected route for managing portfolio content
- **Responsive Design**: Optimized for all devices
- **Theme Support**: Light and dark mode toggle
- **Animations**: Smooth scroll animations and interactive elements

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Backend/Authentication**: Firebase
- **Charts**: Recharts (for potential data visualization)
- **Other Libraries**: TanStack Query, Next Themes, React Helmet Async

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or Bun package manager

### Installation

1. **Clone the repository**:
   ```sh
   git clone <YOUR_GIT_URL>
   cd my-dev-showcase
   ```

2. **Install dependencies**:
   ```sh
   npm install
   # or if using Bun
   bun install
   ```

3. **Environment Setup** (if using Firebase):
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration variables

4. **Start the development server**:
   ```sh
   npm run dev
   # or
   bun run dev
   ```

5. **Open your browser** and navigate to [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
my-dev-showcase/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ui/            # shadcn/ui components
│   │   └── ...            # Other components
│   ├── contexts/          # React contexts (Auth, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── types/             # TypeScript definitions
│   └── assets/            # Images and other assets
├── .github/               # GitHub Actions/workflows
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

## Deployment

### Vercel/Netlify (Recommended for static sites)

1. Connect your repository to Vercel or Netlify
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize hosting: `firebase init hosting`
4. Build the project: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms

The built `dist` folder can be deployed to any static hosting service.

## Customization

- **Personal Information**: Update `src/hooks/usePortfolioData.tsx` with your details
- **Projects**: Modify the projects array in the portfolio data
- **Styling**: Tailwind classes and custom CSS in `src/App.css` and `src/index.css`
- **Components**: Customize UI components in `src/components/`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is private and not licensed for public use.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- Icons from [Lucide](https://lucide.dev/)
- Inspired by modern developer portfolios
