# ByteBank

ByteBank is a financial control system that allows users to manage income and expenses.

Built as a FIAP postgraduate project focusing on scalable frontend architecture.

## Preview

![Preview](/public/gif/preview.gif)

## Features

- **Dashboard**: View balance, income/expense summary, and recent transactions extract.
- **Transaction Listing**: Full list with filters, search, and actions (view, edit, delete).
- **Add/Edit Transactions**: Modal with form to create or edit transactions (type, value, date, category).
- **Design System**: Reusable components documented in Storybook.

## Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Component Development**: Storybook
- **Validation**: Zod
- **Code Quality**: ESLint + Prettier
- **Mock API**: JSON Server

## Architecture

The project follows a **domain-driven design (DDD)** architecture to separate responsibilities:

- **`src/app/`**: Next.js pages (App Router) with server components for data fetching.
- **`src/domain/`**: Business logic, types, and use cases (e.g., `Transaction`, `Dashboard`).
- **`src/features/`**: Feature-specific components (e.g., dashboard cards).
- **`src/components/`**: Reusable components (`ui/` for design system, `shared/` for common ones).
- **`src/hooks/`**: Custom hooks (e.g., `useDeleteTransaction`).
- **`src/utils/`**: Utilities (formatters, helpers).
- **`src/types/`**: TypeScript type definitions.
- **`mock/`**: Mocked data for development.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

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

## Mock API

This project uses JSON Server to simulate a backend during development.

### Run the API

```bash
npm run json-server
```

The API will be available at [http://localhost:3001](http://localhost:3001).

### Example Endpoints

- `GET /transactions` - List transactions
- `GET /transactions/:id` - Get transaction by ID
- `POST /transactions` - Create transaction
- `PATCH /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

Make sure your `.env.local` is configured:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Storybook

To view and test components in isolation:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) in your browser.

For static build:

```bash
npm run build-storybook
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook
- `npm run json-server` - Start mock API

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

## Code Style

The project uses ESLint and Prettier for code quality. Configuration files:

- `.eslintrc.json` - ESLint rules
- `.prettierrc.json` - Prettier formatting rules

## Demo Video

For a complete demonstration of the application flow, watch the video located in the `public/video/` folder.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Storybook](https://storybook.js.org/)
- [Zod](https://zod.dev/)

## License

MIT
