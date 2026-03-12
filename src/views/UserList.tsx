'use client';

import { useEffect } from 'react';
import { useUserViewModel } from '@/viewmodels/UserViewModel';

/**
 * UserList View
 *
 * Displays a list of users
 * Uses UserViewModel for state management and logic
 */
export function UserListView() {
  const { users, isLoading, error, loadUsers } = useUserViewModel();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div className="p-4">No users found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 border border-gray-200 rounded">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
