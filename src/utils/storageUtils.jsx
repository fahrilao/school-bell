// Storage utility functions for handling localStorage operations

const STORAGE_KEY = 'schoolBellSchedules';

export const saveSchedulesToStorage = (schedules) => {
  try {
    const dataToSave = JSON.stringify(schedules);
    localStorage.setItem(STORAGE_KEY, dataToSave);
    console.log('Schedules saved to localStorage:', schedules.length, 'items');
    return true;
  } catch (error) {
    console.error('Error saving schedules to localStorage:', error);
    return false;
  }
};

export const loadSchedulesFromStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedSchedules = JSON.parse(savedData);
      if (Array.isArray(parsedSchedules)) {
        console.log('Schedules loaded from localStorage:', parsedSchedules.length, 'items');
        return parsedSchedules;
      }
    }
    console.log('No valid schedules found in localStorage');
    return [];
  } catch (error) {
    console.error('Error loading schedules from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

export const clearSchedulesFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Schedules cleared from localStorage');
    return true;
  } catch (error) {
    console.error('Error clearing schedules from localStorage:', error);
    return false;
  }
};

// Check if localStorage is available
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
};
