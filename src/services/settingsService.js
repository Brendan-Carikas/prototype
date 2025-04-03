import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const settingsService = {
  // Get user settings
  async getUserSettings() {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      
      const docRef = doc(db, 'userSettings', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Create default settings if none exist
        const defaultSettings = {
          showBackground: false,
          alignLeft: false,
          customImage: null,
          isModal: false,
          isTwoColumn: false,
          displayLoginDetails: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        await setDoc(docRef, defaultSettings);
        return defaultSettings;
      }
    } catch (error) {
      console.error('Error getting user settings:', error);
      return null;
    }
  },
  
  // Save user settings
  async saveUserSettings(settings) {
    try {
      const user = auth.currentUser;
      if (!user) return false;
      
      const docRef = doc(db, 'userSettings', user.uid);
      
      // Check if document exists
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // Update existing document
        await updateDoc(docRef, {
          ...settings,
          updatedAt: new Date()
        });
      } else {
        // Create new document
        await setDoc(docRef, {
          ...settings,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error saving user settings:', error);
      return false;
    }
  },
  
  // For demo mode - save settings to localStorage as fallback
  saveSettingsToLocalStorage(settings) {
    try {
      Object.entries(settings).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          localStorage.removeItem(`auth_${key}`);
        } else {
          localStorage.setItem(`auth_${key}`, typeof value === 'string' ? value : JSON.stringify(value));
        }
      });
      return true;
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
      return false;
    }
  },
  
  // For demo mode - get settings from localStorage as fallback
  getSettingsFromLocalStorage() {
    try {
      return {
        showBackground: JSON.parse(localStorage.getItem('auth_background_visible') || 'false'),
        alignLeft: JSON.parse(localStorage.getItem('auth_background_align') || 'false'),
        customImage: localStorage.getItem('auth_background_image') || null,
        isModal: JSON.parse(localStorage.getItem('auth_background_modal') || 'false'),
        isTwoColumn: JSON.parse(localStorage.getItem('auth_background_two_column') || 'false'),
        displayLoginDetails: JSON.parse(localStorage.getItem('auth_display_login_details') || 'true')
      };
    } catch (error) {
      console.error('Error getting settings from localStorage:', error);
      return null;
    }
  }
};
