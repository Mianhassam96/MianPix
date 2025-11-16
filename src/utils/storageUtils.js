const STORAGE_KEY = 'mianpix_edit_history';
const MAX_HISTORY_SIZE = 10;

/**
 * Save edit history to localStorage
 */
export const saveHistory = (history) => {
  try {
    // Limit history size
    const limitedHistory = history.slice(-MAX_HISTORY_SIZE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error saving history:', error);
  }
};

/**
 * Load edit history from localStorage
 */
export const loadHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

/**
 * Clear edit history
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

/**
 * Add edit to history
 */
export const addToHistory = (editData) => {
  const history = loadHistory();
  history.push({
    ...editData,
    timestamp: Date.now(),
  });
  saveHistory(history);
};

/**
 * Get recent edits
 */
export const getRecentEdits = (count = 5) => {
  const history = loadHistory();
  return history.slice(-count).reverse();
};

/**
 * Save user preferences
 */
export const savePreferences = (preferences) => {
  try {
    localStorage.setItem('mianpix_preferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
};

/**
 * Load user preferences
 */
export const loadPreferences = () => {
  try {
    const stored = localStorage.getItem('mianpix_preferences');
    return stored ? JSON.parse(stored) : {
      theme: 'light',
      defaultFormat: 'png',
      defaultQuality: 0.9,
    };
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {};
  }
};
