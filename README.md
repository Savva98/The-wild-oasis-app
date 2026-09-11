# 🏞️ The Wild Oasis App

A modern cabin booking management system built with React, TypeScript, and Vite. This application provides a comprehensive platform for managing cabins, bookings, guests, and operations for a luxury cabin resort.

## 🎯 Features

- **Cabin Management** - Add, edit, and manage cabin inventory with detailed descriptions and pricing
- **Booking System** - Handle guest reservations with calendar view and booking status tracking
- **Guest Management** - Maintain guest profiles and booking history
- **Dashboard** - Overview of key metrics and recent activities
- **User Authentication** - Secure login and role-based access control
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: [Add your CSS/styling library here]
- **State Management**: [Add if applicable]
- **Backend**: [Add your backend setup]

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Savva98/The-wild-oasis-app.git

# Navigate to project directory
cd The-wild-oasis-app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components
├── features/       # Feature modules
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── App.tsx         # Main application component
```

## 🔧 Development Guidelines

### ESLint Configuration

This project uses ESLint with TypeScript support for code quality. To enable type-aware linting rules:

```js
// eslint.config.js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### React Plugin

For enhanced React linting, install and configure the React plugin:

```bash
npm install --save-dev eslint-plugin-react
```

Then update your ESLint config:

```js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is part of a course. Please refer to the course materials for licensing information.

## 👤 Author

Created by Savva98

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [ESLint Documentation](https://eslint.org)

---

**Happy coding! 🚀**
