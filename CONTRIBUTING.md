# Contributing to ByteBank

Thank you for your interest in contributing to ByteBank! This guide will help you understand the structure and development workflow.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bytebank
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Start Storybook for component development**
   ```bash
   npm run storybook
   ```

## Architecture Guidelines

ByteBank follows the **MVVM** (Model-View-ViewModel) pattern. See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed guidelines.

### Quick Summary

- **Models** (`src/models/`): Define data structures with Zod validation
- **Services** (`src/services/`): Handle API calls and business logic
- **ViewModels** (`src/viewmodels/`): Custom hooks managing state
- **Views** (`src/views/`): React components consuming ViewModels
- **Components** (`src/components/`): Reusable UI components

## Code Style

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Format code with **Prettier**
- Use **Tailwind CSS** for styling

### Before Committing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Creating a New Feature

### 1. Create the Model
Define your data structure in `src/models/`:
```typescript
// src/models/MyModel.ts
import { z } from 'zod';

export const MyModelSchema = z.object({
  id: z.string(),
  // ... fields
});

export type MyModel = z.infer<typeof MyModelSchema>;
```

### 2. Create the Service
Implement API calls in `src/services/`:
```typescript
// src/services/MyModelService.ts
import { MyModel } from '@/models/MyModel';

export class MyModelService {
  async fetchData(): Promise<MyModel[]> {
    // API call
  }
}

export const myModelService = new MyModelService();
```

### 3. Create the ViewModel
Manage state in `src/viewmodels/`:
```typescript
// src/viewmodels/MyModelViewModel.ts
import { useState, useCallback } from 'react';
import { MyModel } from '@/models/MyModel';
import { myModelService } from '@/services/MyModelService';

export function useMyModelViewModel() {
  const [data, setData] = useState<MyModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await myModelService.fetchData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchData };
}
```

### 4. Create the View
Build the UI in `src/views/`:
```typescript
// src/views/MyModelList.tsx
'use client';

import { useEffect } from 'react';
import { useMyModelViewModel } from '@/viewmodels/MyModelViewModel';

export function MyModelListView() {
  const { data, isLoading, error, fetchData } = useMyModelViewModel();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ... render UI
}
```

### 5. Add shadcn/ui Components (if needed)
```bash
npx shadcn-ui@latest add component-name
```

### 6. Create Stories for Components
```typescript
// src/components/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // ... props
  },
};
```

## Commit Convention

Use clear, descriptive commit messages:

```
type(scope): description

body (optional)
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `refactor`: Code refactoring
- `style`: Code style changes
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `chore`: Build, dependencies, or configuration changes

**Examples:**
- `feat(auth): add login form component`
- `fix(user-list): correct data loading issue`
- `docs(architecture): update MVVM guide`

## Pull Request Process

1. Create a feature branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

3. Ensure code quality
   ```bash
   npm run lint:fix
   npm run format
   ```

4. Push to your branch
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request with:
   - Clear title and description
   - Reference to any related issues
   - List of changes made

## Testing

While test infrastructure isn't set up yet, you should:

- Test components in Storybook
- Manually test features in the dev server
- Verify no ESLint or TypeScript errors

## Questions?

If you have questions about the architecture or development process, refer to:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture guide
- [README.md](./README.md) - Project overview
- Project issues and discussions

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
