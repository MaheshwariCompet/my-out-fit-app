import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  isPro: boolean;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginAsGuest: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: "00000000-0000-0000-0000-000000000001",
    email: "elena.rostova@myoutfit.app",
    fullName: "Elena Rostova",
    isPro: true,
    isGuest: false
  });

  const loginAsGuest = () => {
    setUser({
      id: "guest-user",
      email: "guest@myoutfit.app",
      fullName: "Guest Stylist",
      isPro: false,
      isGuest: true
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);