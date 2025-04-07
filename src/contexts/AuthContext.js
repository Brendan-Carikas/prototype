import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const navigate = useNavigate();
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);



  const login = async (email, password) => {
    try {
      // Demo mode login
      if (email === 'Demo' && password === 'Demo') {
        setUser({ email: 'Demo', uid: 'demo-user-id' });
        setIsDemoMode(true);
        navigate('/app/dashboards/dashboard2');
        return { success: true };
      }
      
      // Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsDemoMode(false);
      navigate('/app/dashboards/dashboard2');
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error logging in:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Specific login method for IDS login page
  const loginWithIDS = async (username, password) => {
    try {
      // Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      setIsDemoMode(false);
      // Redirect to Login.js instead of dashboard
      navigate('/auth/login');
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error logging in with IDS:', error.message);
      return { 
        success: false, 
        error: error.code, 
        message: error.message 
      };
    }
  };

  const logout = async () => {
    try {
      if (isDemoMode) {
        setUser(null);
        setIsDemoMode(false);
      } else {
        await signOut(auth);
      }
      // Redirect to IDS login page instead of the standard login
      navigate('/ids-login');
      return true;
    } catch (error) {
      console.error('Error logging out:', error.message);
      return false;
    }
  };

  const signup = async (email, password) => {
    try {
      // Demo mode signup
      if (email === 'Demo' && password === 'Demo') {
        setUser({ email: 'Demo', uid: 'demo-user-id' });
        setIsDemoMode(true);
        navigate('/app/dashboards/dashboard2');
        return { success: true };
      }
      
      // Firebase Auth signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setIsDemoMode(false);
      navigate('/app/dashboards/dashboard2');
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Error signing up:', error.message);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginWithIDS, 
      logout, 
      signup, 
      loading,
      isDemoMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
