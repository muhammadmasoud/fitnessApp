import { createContext, useState, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = (userData) => {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Create new user with ID
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Add to users array
    users.push(newUser);

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    return newUser;
  };

  // Login user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user with matching email and password
    const user = users.find(user =>
      user.email === email && user.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Create a user object without the password for security
    const userWithoutPassword = {
      id: user.id,
      fullName: user.fullName,
      email: user.email
    };

    // Save to sessionStorage and state
    sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    setCurrentUser(userWithoutPassword);

    return userWithoutPassword;
  };

  // Logout user
  const logout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = (userData) => {
    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find and update the user
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return { ...user, ...userData };
      }
      return user;
    });

    // Update localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update current user
    const updatedUser = { ...currentUser, ...userData };
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    return updatedUser;
  };

  // Context value
  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Export the context and provider
export { AuthContext, AuthProvider };
