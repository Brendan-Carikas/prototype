import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Removed unused loading state
  const navigate = useNavigate();



  const login = async (email, password) => {
    try {
      if (email === 'Demo' && password === 'Demo') {
        setUser({ email: 'Demo' });
        navigate('/app/dashboards/dashboard1');
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Error logging in:', error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const signup = async (email, password) => {
    try {
      // For demo purposes, we'll just log in the user
      if (email === 'Demo' && password === 'Demo') {
        setUser({ email: 'Demo' });
        navigate('/app/dashboards/dashboard1');
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Error signing up:', error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
