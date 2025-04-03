import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { settingsService } from '../services/settingsService';

const AUTH_BG_KEY = 'auth_background_visible';
const AUTH_BG_IMAGE_KEY = 'auth_background_image';
const AUTH_BG_ALIGN_KEY = 'auth_background_align';
const AUTH_MODAL_KEY = 'auth_background_modal';
const AUTH_TWO_COLUMN_KEY = 'auth_background_two_column';
const AUTH_DISPLAY_LOGIN_DETAILS_KEY = 'auth_display_login_details';
const AuthBackgroundContext = createContext();

export function useAuthBackground() {
  const context = useContext(AuthBackgroundContext);
  if (!context) {
    throw new Error('useAuthBackground must be used within an AuthBackgroundProvider');
  }
  return context;
}

export function AuthBackgroundProvider({ children }) {
  const { user, isDemoMode } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // Initialize with default values
  const [showBackground, setShowBackground] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isTwoColumn, setIsTwoColumn] = useState(false);
  const [displayLoginDetails, setDisplayLoginDetails] = useState(true);
  
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  const handleShowBackgroundChange = (newValue) => {
    setShowBackground(newValue);
    setUnsavedChanges(true);
  };

  const handleAlignLeftChange = (newValue) => {
    setAlignLeft(newValue);
    setUnsavedChanges(true);
  };

  const handleCustomImageChange = (newValue) => {
    setCustomImage(newValue);
    setUnsavedChanges(true);
  };

  const handleIsModalChange = (newValue) => {
    setIsModal(newValue);
    setUnsavedChanges(true);
  };

  const handleIsTwoColumnChange = (newValue) => {
    setIsTwoColumn(newValue);
    setUnsavedChanges(true);
  };

  const handleDisplayLoginDetailsChange = (newValue) => {
    setDisplayLoginDetails(newValue);
    setUnsavedChanges(true);
  };
  
  const saveChanges = async () => {
    try {
      const settings = {
        showBackground,
        alignLeft,
        customImage,
        isModal,
        isTwoColumn,
        displayLoginDetails
      };
      
      let success = false;
      
      if (isDemoMode) {
        // In demo mode, save to localStorage
        success = settingsService.saveSettingsToLocalStorage({
          'auth_background_visible': showBackground,
          'auth_background_align': alignLeft,
          'auth_background_image': customImage,
          'auth_background_modal': isModal,
          'auth_background_two_column': isTwoColumn,
          'auth_display_login_details': displayLoginDetails
        });
      } else if (user) {
        // If authenticated with Firebase, save to Firestore
        success = await settingsService.saveUserSettings(settings);
      }
      
      if (success) {
        setUnsavedChanges(false);
        console.log('Settings saved successfully');
      } else {
        console.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Load settings when user changes
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        let settings = null;
        
        if (isDemoMode) {
          // In demo mode, load from localStorage
          const localSettings = {
            showBackground: JSON.parse(localStorage.getItem(AUTH_BG_KEY) || 'false'),
            alignLeft: JSON.parse(localStorage.getItem(AUTH_BG_ALIGN_KEY) || 'false'),
            customImage: localStorage.getItem(AUTH_BG_IMAGE_KEY) || null,
            isModal: JSON.parse(localStorage.getItem(AUTH_MODAL_KEY) || 'false'),
            isTwoColumn: JSON.parse(localStorage.getItem(AUTH_TWO_COLUMN_KEY) || 'false'),
            displayLoginDetails: JSON.parse(localStorage.getItem(AUTH_DISPLAY_LOGIN_DETAILS_KEY) || 'true')
          };
          settings = localSettings;
        } else if (user) {
          // If authenticated with Firebase, load from Firestore
          settings = await settingsService.getUserSettings();
        }
        
        if (settings) {
          setShowBackground(settings.showBackground);
          setAlignLeft(settings.alignLeft);
          setCustomImage(settings.customImage);
          setIsModal(settings.isModal);
          setIsTwoColumn(settings.isTwoColumn);
          setDisplayLoginDetails(settings.displayLoginDetails);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
        setUnsavedChanges(false);
      }
    };
    
    if (user || isDemoMode) {
      loadSettings();
    }
  }, [user, isDemoMode]);
  
  // Track changes to mark as unsaved
  useEffect(() => {
    if (!isLoading) {
      setUnsavedChanges(true);
    }
  }, [showBackground, alignLeft, customImage, isModal, isTwoColumn, displayLoginDetails, isLoading]);

  const value = {
    showBackground,
    setShowBackground: handleShowBackgroundChange,
    alignLeft,
    setAlignLeft: handleAlignLeftChange,
    customImage,
    setCustomImage: handleCustomImageChange,
    isModal,
    setIsModal: handleIsModalChange,
    isTwoColumn,
    setIsTwoColumn: handleIsTwoColumnChange,
    displayLoginDetails,
    setDisplayLoginDetails: handleDisplayLoginDetailsChange,
    unsavedChanges,
    saveChanges,
    isLoading
  };

  return (
    <AuthBackgroundContext.Provider value={value}>
      {children}
    </AuthBackgroundContext.Provider>
  );
}
