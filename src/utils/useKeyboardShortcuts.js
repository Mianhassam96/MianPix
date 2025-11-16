import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to handlers
 * Example: { 'ctrl+z': handleUndo, 'ctrl+s': handleSave }
 */
export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
      
      // Build the key combination string
      const combination = [
        ctrlKey && 'ctrl',
        metaKey && 'meta',
        shiftKey && 'shift',
        altKey && 'alt',
        key.toLowerCase(),
      ]
        .filter(Boolean)
        .join('+');

      // Check if there's a matching shortcut
      if (shortcuts[combination]) {
        event.preventDefault();
        shortcuts[combination](event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

/**
 * Default shortcuts configuration
 */
export const defaultShortcuts = {
  'ctrl+z': 'undo',
  'ctrl+y': 'redo',
  'ctrl+shift+z': 'redo',
  'ctrl+s': 'save',
  'ctrl+o': 'open',
  'ctrl+n': 'new',
  'r': 'rotate',
  'f': 'flip',
  'c': 'crop',
  'escape': 'cancel',
  'delete': 'delete',
  'ctrl+d': 'download',
};
