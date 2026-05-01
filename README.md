# ByteBank

ByteBank is a financial control system that allows users to manage income and expenses

Built as a FIAP postgraduate project focusing on scalable frontend architecture.

## Preview

![Preview](/public/gif/preview.gif)

## Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Component Development**: Storybook
- **Validation**: Zod
- **Code Quality**: ESLint + Prettier

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

## Mock API

This project uses JSON Server to simulate a backend during development.

### Run the API

```bash
npm run json-server
```

The API will be available at [http://localhost:3001](http://localhost:3001).

### Example Endpoints

- `GET /transactions`
- `GET /transactions/:id`
- `POST /transactions`
- `PATCH /transactions/:id`
- `DELETE /transactions/:id`

Make sure your `.env.local` is configured:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
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
