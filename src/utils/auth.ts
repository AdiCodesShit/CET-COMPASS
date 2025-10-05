import { User } from "@/lib/types";

const USERS_STORAGE_KEY = "cet_compass_users";
const CURRENT_USER_STORAGE_KEY = "cet_compass_current_user";

// Helper to get all registered users
export function getAllUsers(): User[] {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

// Helper to save all registered users
function saveAllUsers(users: User[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Register a new user
export function registerUser(username: string, email: string, passwordHash: string, cetCollegeCode?: string): User | null {
  const users = getAllUsers();
  if (users.some(user => user.email === email)) {
    return null; // User with this email already exists
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    username,
    email,
    cetCollegeCode,
  };
  users.push(newUser);
  saveAllUsers(users);
  // For simplicity, we're storing password hash directly. In a real app, this would be server-side.
  localStorage.setItem(`user_password_${newUser.id}`, passwordHash);
  return newUser;
}

// Login a user
export function loginUser(email: string, passwordHash: string): User | null {
  const users = getAllUsers();
  const user = users.find(u => u.email === email);

  if (user && localStorage.getItem(`user_password_${user.id}`) === passwordHash) {
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

// Get the currently logged-in user
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

// Logout the current user
export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}