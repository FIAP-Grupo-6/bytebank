import { useState, useCallback } from 'react';
import { User } from '@/domain/User/user.types';
import { userService } from '@/domain/User/user.service';

/**
 * UserViewModel
 *
 * Manages the state and logic for user-related views
 * Follows the MVVM pattern to separate UI logic from presentation
 */
export function useUserViewModel() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load all users
   */
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Load a single user by ID
   */
  const loadUserById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await userService.getUserById(id);
      setSelectedUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a new user
   */
  const createUser = useCallback(
    async (userData: Omit<User, 'id' | 'createdAt'>) => {
      setIsLoading(true);
      setError(null);
      try {
        const newUser = await userService.createUser(userData);
        setUsers((prevUsers) => [...prevUsers, newUser]);
        return newUser;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Clear selected user
   */
  const clearSelectedUser = useCallback(() => {
    setSelectedUser(null);
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    users,
    selectedUser,
    isLoading,
    error,
    // Actions
    loadUsers,
    loadUserById,
    createUser,
    clearSelectedUser,
    clearError,
  };
}
