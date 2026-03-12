# ByteBank

A modern banking application built with Next.js for FIAP POS graduation project.

## Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Component Development**: Storybook
- **Validation**: Zod
- **Code Quality**: ESLint + Prettier
- **Architecture**: MVVM

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── models/          # Data models with Zod schemas
├── services/        # API and business logic services
├── styles/          # Global styles
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── views/           # MVVM view components
└── viewmodels/      # MVVM view models (state & logic hooks)

.storybook/          # Storybook configuration
```

## Architecture: MVVM

The project follows the **Model-View-ViewModel** (MVVM) pattern:

- **Model**: Data structures defined in `/src/models` with Zod validation
- **ViewModel**: Custom hooks in `/src/viewmodels` managing state and business logic
- **View**: React components in `/src/views` consuming the ViewModel

### Example Flow

1. **Model** (`src/models/User.ts`): Defines User schema with Zod
2. **Service** (`src/services/UserService.ts`): Handles API calls
3. **ViewModel** (`src/viewmodels/UserViewModel.ts`): Custom hook managing user state
4. **View** (`src/views/UserList.tsx`): Component using the ViewModel

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## Adding Components with shadcn/ui

To add a new shadcn/ui component:

```bash
npx shadcn-ui@latest add [component-name]
```

Example:
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Code Style

The project uses ESLint and Prettier for code quality. Configuration files:

- `.eslintrc.json` - ESLint rules
- `.prettierrc.json` - Prettier formatting rules
- `tsconfig.json` - TypeScript compiler options

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Storybook](https://storybook.js.org/)
- [Zod](https://zod.dev/)
- [MVVM Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

## License

MIT
