import { User, FriendRequest } from "@/lib/types";

const USERS_STORAGE_KEY = "cet_compass_users";
const CURRENT_USER_STORAGE_KEY = "cet_compass_current_user";
const FRIEND_REQUESTS_STORAGE_KEY = "cet_compass_friend_requests";

// Helper to get all registered users
export function getAllUsers(): User[] {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

// Helper to save all registered users
function saveAllUsers(users: User[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Helper to get all friend requests
export function getAllFriendRequests(): FriendRequest[] {
  const requestsJson = localStorage.getItem(FRIEND_REQUESTS_STORAGE_KEY);
  return requestsJson ? JSON.parse(requestsJson) : [];
}

// Helper to save all friend requests
function saveAllFriendRequests(requests: FriendRequest[]) {
  localStorage.setItem(FRIEND_REQUESTS_STORAGE_KEY, JSON.stringify(requests));
}

// Get a user by ID
export function getUserById(userId: string): User | undefined {
  const users = getAllUsers();
  return users.find(user => user.id === userId);
}

// Get a user by email
export function getUserByEmail(email: string): User | undefined {
  const users = getAllUsers();
  return users.find(user => user.email === email);
}

// Update a user's data in local storage
export function updateUserInStorage(updatedUser: User): void {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.id === updatedUser.id);
  if (userIndex > -1) {
    users[userIndex] = updatedUser;
    saveAllUsers(users);
    // If the updated user is the current user, also update CURRENT_USER_STORAGE_KEY
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === updatedUser.id) {
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(updatedUser));
    }
  }
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
    friendIds: [],
    sentFriendRequests: [],
    receivedFriendRequests: [],
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
  localStorage.removeItem(CURRENT_USER_KEY);
}

// --- Friend Request Logic ---

export function sendFriendRequest(senderId: string, receiverId: string): boolean {
  const sender = getUserById(senderId);
  const receiver = getUserById(receiverId);
  let requests = getAllFriendRequests();

  if (!sender || !receiver) {
    console.error("Sender or receiver not found.");
    return false;
  }

  // Check if already friends
  if (sender.friendIds.includes(receiverId)) {
    console.log("Already friends.");
    return false;
  }

  // Check if request already sent
  if (sender.sentFriendRequests.includes(receiverId) || receiver.receivedFriendRequests.includes(senderId)) {
    console.log("Friend request already sent.");
    return false;
  }

  // Check if receiver has sent a request to sender (mutual request)
  if (sender.receivedFriendRequests.includes(receiverId)) {
    // If so, accept it automatically
    acceptFriendRequest(receiverId, senderId);
    return true;
  }

  const newRequest: FriendRequest = {
    id: `fr-${Date.now()}-${senderId}-${receiverId}`,
    senderId,
    receiverId,
    status: "pending",
    timestamp: new Date().toISOString(),
  };

  requests.push(newRequest);
  saveAllFriendRequests(requests);

  sender.sentFriendRequests.push(receiverId);
  receiver.receivedFriendRequests.push(senderId);
  updateUserInStorage(sender);
  updateUserInStorage(receiver);

  return true;
}

export function acceptFriendRequest(senderId: string, receiverId: string): boolean {
  const sender = getUserById(senderId);
  const receiver = getUserById(receiverId);
  let requests = getAllFriendRequests();

  if (!sender || !receiver) {
    console.error("Sender or receiver not found.");
    return false;
  }

  // Find and update the request status
  const requestIndex = requests.findIndex(
    (req) => req.senderId === senderId && req.receiverId === receiverId && req.status === "pending"
  );

  if (requestIndex === -1) {
    console.error("Pending friend request not found.");
    return false;
  }

  requests[requestIndex].status = "accepted";
  saveAllFriendRequests(requests);

  // Update both users' friend lists
  sender.friendIds.push(receiverId);
  receiver.friendIds.push(senderId);

  // Remove from sent/received requests
  sender.sentFriendRequests = sender.sentFriendRequests.filter(id => id !== receiverId);
  receiver.receivedFriendRequests = receiver.receivedFriendRequests.filter(id => id !== senderId);

  updateUserInStorage(sender);
  updateUserInStorage(receiver);

  return true;
}

export function declineFriendRequest(senderId: string, receiverId: string): boolean {
  const sender = getUserById(senderId);
  const receiver = getUserById(receiverId);
  let requests = getAllFriendRequests();

  if (!sender || !receiver) {
    console.error("Sender or receiver not found.");
    return false;
  }

  const requestIndex = requests.findIndex(
    (req) => req.senderId === senderId && req.receiverId === receiverId && req.status === "pending"
  );

  if (requestIndex === -1) {
    console.error("Pending friend request not found.");
    return false;
  }

  requests[requestIndex].status = "declined";
  saveAllFriendRequests(requests);

  // Remove from sent/received requests
  sender.sentFriendRequests = sender.sentFriendRequests.filter(id => id !== receiverId);
  receiver.receivedFriendRequests = receiver.receivedFriendRequests.filter(id => id !== senderId);

  updateUserInStorage(sender);
  updateUserInStorage(receiver);

  return true;
}