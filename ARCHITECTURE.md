# ByteBank Architecture Guide

## MVVM Pattern Implementation

ByteBank follows the **Model-View-ViewModel** (MVVM) architectural pattern for frontend development. This guide explains how to structure components and manage state following this pattern.

## Components of MVVM

### 1. Model (`/src/models`)

Models represent the data structure and business rules. They use **Zod** for runtime validation.

**Example: `User.ts`**
```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
```

**Best Practices:**
- Define schema with Zod for validation
- Export types from schema using `z.infer`
- Keep models pure, without side effects
- Validation should be done at system boundaries

### 2. Service (`/src/services`)

Services handle API calls and external communication. They use models for type safety.

**Example: `UserService.ts`**
```typescript
import { User } from '@/models/User';

export class UserService {
  async getUserById(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  }
}
```

**Best Practices:**
- Separate API logic from UI logic
- Handle errors at the service level
- Use models for type checking
- Keep services stateless

### 3. ViewModel (`/src/viewmodels`)

ViewModels manage state and business logic using React hooks. They bridge between Services and Views.

**Example: `UserViewModel.ts`**
```typescript
import { useState, useCallback } from 'react';
import { User } from '@/models/User';
import { userService } from '@/services/UserService';

export function useUserViewModel() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { users, isLoading, error, loadUsers };
}
```

**Best Practices:**
- Export as custom React hooks (use prefix)
- Manage UI state (loading, error, data)
- Encapsulate business logic
- Return stable references to avoid unnecessary re-renders
- Use `useCallback` for memoization

### 4. View (`/src/views`)

Views are React components that consume ViewModels and render the UI. They should be dumb and only display data.

**Example: `UserList.tsx`**
```typescript
'use client';

import { useEffect } from 'react';
import { useUserViewModel } from '@/viewmodels/UserViewModel';

export function UserListView() {
  const { users, isLoading, error, loadUsers } = useUserViewModel();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (users.length === 0) return <div>No users</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Best Practices:**
- Keep components focused on presentation
- Use the `'use client'` directive in Next.js
- Avoid direct API calls
- Delegate business logic to ViewModel
- Pass data as props when possible

## Data Flow

```
View Component
     ↓
ViewModel Hook (useUserViewModel)
     ↓
Service (UserService)
     ↓
API Endpoint
     ↓
Backend/Server
```

## File Organization

```
src/
├── models/           # Data schemas with Zod
│   └── User.ts
├── services/         # API and business logic
│   └── UserService.ts
├── viewmodels/       # State management hooks
│   └── UserViewModel.ts
├── views/            # UI Components
│   └── UserList.tsx
└── components/       # Reusable UI components
    └── ui/
```

## Best Practices

### 1. Separation of Concerns
- **Models** define structure
- **Services** handle data fetching
- **ViewModels** manage state and logic
- **Views** handle presentation

### 2. Type Safety
- Use Zod for runtime validation
- Infer TypeScript types from Zod schemas
- Avoid `any` types

### 3. Error Handling
- Handle errors in Services
- Propagate errors to ViewModels
- Display errors in Views

### 4. State Management
- Keep state in ViewModels
- Avoid state duplication
- Use callbacks for mutations

### 5. Performance
- Memoize callbacks with `useCallback`
- Use `useEffect` to sync with external state
- Avoid unnecessary re-renders

## Example: Creating a New Feature

### Step 1: Define the Model
Create `src/models/Account.ts`:
```typescript
import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string(),
  balance: z.number(),
  currency: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;
```

### Step 2: Create the Service
Create `src/services/AccountService.ts`:
```typescript
import { Account } from '@/models/Account';

export class AccountService {
  async getAccount(id: string): Promise<Account> {
    const response = await fetch(`/api/accounts/${id}`);
    return response.json();
  }
}
```

### Step 3: Create the ViewModel
Create `src/viewmodels/AccountViewModel.ts`:
```typescript
import { useState, useCallback } from 'react';
import { Account } from '@/models/Account';
import { accountService } from '@/services/AccountService';

export function useAccountViewModel() {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAccount = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const data = await accountService.getAccount(id);
      setAccount(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { account, isLoading, loadAccount };
}
```

### Step 4: Create the View
Create `src/views/AccountDetail.tsx`:
```typescript
'use client';

import { useEffect } from 'react';
import { useAccountViewModel } from '@/viewmodels/AccountViewModel';

export function AccountDetailView({ accountId }: { accountId: string }) {
  const { account, isLoading, loadAccount } = useAccountViewModel();

  useEffect(() => {
    loadAccount(accountId);
  }, [accountId, loadAccount]);

  if (isLoading) return <div>Loading...</div>;
  if (!account) return <div>Not found</div>;

  return (
    <div>
      <h1>Account: {account.id}</h1>
      <p>Balance: {account.balance} {account.currency}</p>
    </div>
  );
}
```

## Testing Strategy

### Model Testing
- Validate Zod schemas
- Test model edge cases

### Service Testing
- Mock API calls
- Test error handling
- Verify data transformation

### ViewModel Testing
- Test hook logic in isolation
- Mock services
- Verify state transitions

### View Testing
- Test component rendering
- Test user interactions
- Mock ViewModels

## Conclusion

The MVVM pattern provides clear separation of concerns, making the codebase more maintainable, testable, and scalable. Each layer has a single responsibility, and data flows unidirectionally through the architecture.
