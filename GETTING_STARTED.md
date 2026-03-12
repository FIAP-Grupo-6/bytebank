# Getting Started with ByteBank

Welcome to ByteBank! This guide will help you get started with the development environment.

## Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher (or yarn/pnpm)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

The project uses `legacy-peer-deps` due to Storybook compatibility. This is configured in `.npmrc`.

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` if needed for your local configuration.

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Common Commands

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

### Storybook

```bash
# Start Storybook dev server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## Project Structure Overview

```
bytebank/
├── .storybook/              # Storybook configuration
├── .vscode/                 # VS Code settings
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   └── ui/              # UI components (shadcn/ui)
│   ├── hooks/               # Custom React hooks
│   ├── models/              # Data models (Zod schemas)
│   ├── services/            # API services
│   ├── styles/              # Global styles
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── views/               # MVVM Views
│   └── viewmodels/          # MVVM ViewModels (hooks)
├── .eslintrc.json           # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── ARCHITECTURE.md          # Architecture documentation
├── CONTRIBUTING.md          # Contribution guidelines
├── README.md                # Project README
├── components.json          # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Adding Components

### Adding shadcn/ui Components

Use the shadcn CLI to add pre-built components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
```

Available components: https://ui.shadcn.com/docs/components

### Creating Custom Components

1. Create component file in `src/components/`
2. Create story file for Storybook (`.stories.tsx`)
3. Export from component's index file (if using folders)

Example:
```typescript
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>My Component</div>;
}

// src/components/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: 'Components/MyComponent',
};

export default meta;
export const Default: StoryObj<typeof meta> = {};
```

## Creating Features with MVVM

Follow the pattern in `ARCHITECTURE.md`:

1. **Create Model** in `src/models/`
   - Define Zod schema
   - Export TypeScript type

2. **Create Service** in `src/services/`
   - Handle API calls
   - Use models for types

3. **Create ViewModel** in `src/viewmodels/`
   - Custom hook with `use` prefix
   - Manage state and logic

4. **Create View** in `src/views/`
   - React component
   - Consume ViewModel hook

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed examples.

## VS Code Setup

Recommended extensions:
- Prettier - Code formatter
- ESLint - Code quality
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

These are configured in `.vscode/extensions.json`. Install them for the best experience.

## Troubleshooting

### Port 3000 is already in use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Dependencies installation fails

If you encounter dependency conflicts:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

The `.npmrc` file includes `legacy-peer-deps=true` to handle Storybook compatibility.

### TypeScript errors

```bash
# Type check your code
npx tsc --noEmit
```

### ESLint issues

```bash
# Fix all fixable issues
npm run lint:fix
```

## Next Steps

1. **Read the documentation**
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand MVVM pattern
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

2. **Explore examples**
   - Check `src/models/User.ts` for model example
   - Check `src/services/UserService.ts` for service example
   - Check `src/viewmodels/UserViewModel.ts` for ViewModel example
   - Check `src/views/UserList.tsx` for View example

3. **Start building**
   - Create a new feature following the MVVM pattern
   - Add components to Storybook
   - Use `npm run dev` to test changes

4. **Join development**
   - Follow [CONTRIBUTING.md](./CONTRIBUTING.md)
   - Create feature branches
   - Write clear commit messages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Zod Documentation](https://zod.dev/)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)

## Questions?

Check the [README.md](./README.md) or [ARCHITECTURE.md](./ARCHITECTURE.md) for more information.

Happy coding! 🚀
