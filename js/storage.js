/**
 * Aziz Prompt Forge - Storage Manager
 * Handles localStorage for history, favorites, and settings
 */

const Storage = {
    // Storage keys
    KEYS: {
        HISTORY: 'promptforge_history',
        FAVORITES: 'promptforge_favorites',
        SETTINGS: 'promptforge_settings'
    },

    // History limit
    HISTORY_LIMIT: 50,

    /**
     * HISTORY MANAGEMENT
     */

    /**
     * Save a generated prompt to history
     * @param {Object} item - History item to save
     * @returns {boolean} - True if limit reached
     */
    saveHistory(item) {
        const history = this.getHistory();
        
        // Add timestamp and ID if not present
        if (!item.timestamp) {
            item.timestamp = new Date().toISOString();
        }
        if (!item.id) {
            item.id = this._generateId();
        }

        // Add to beginning of array (most recent first)
        history.unshift(item);

        // Check if limit reached
        if (history.length >= this.HISTORY_LIMIT) {
            // Return true to indicate limit reached
            localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(history));
            return true;
        }

        // Save to localStorage
        localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(history));
        return false;
    },

    /**
     * Get all history items
     * @returns {Array} - Array of history items
     */
    getHistory() {
        try {
            const data = localStorage.getItem(this.KEYS.HISTORY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    },

    /**
     * Get a single history item by ID
     * @param {string} id - History item ID
     * @returns {Object|null} - History item or null
     */
    getHistoryItem(id) {
        const history = this.getHistory();
        return history.find(item => item.id === id) || null;
    },

    /**
     * Delete a history item
     * @param {string} id - History item ID
     */
    deleteHistoryItem(id) {
        const history = this.getHistory();
        const filtered = history.filter(item => item.id !== id);
        localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(filtered));
    },

    /**
     * Clear all history
     */
    clearHistory() {
        localStorage.removeItem(this.KEYS.HISTORY);
    },

    /**
     * Delete oldest history items (for after export)
     * @param {number} count - Number of items to delete from end
     */
    deleteOldestHistory(count = 10) {
        const history = this.getHistory();
        const remaining = history.slice(0, -count);
        localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(remaining));
    },

    /**
     * Check if history limit reached
     * @returns {boolean} - True if limit reached
     */
    isHistoryLimitReached() {
        return this.getHistory().length >= this.HISTORY_LIMIT;
    },

    /**
     * Get history count
     * @returns {number} - Number of history items
     */
    getHistoryCount() {
        return this.getHistory().length;
    },

    /**
     * Export history as JSON
     * @returns {Object} - Exportable history object
     */
    exportHistoryJSON() {
        const history = this.getHistory();
        return {
            exportDate: new Date().toISOString(),
            appName: 'Aziz Prompt Forge',
            appVersion: '1.0.0',
            totalPrompts: history.length,
            history: history
        };
    },

    /**
     * FAVORITES MANAGEMENT
     */

    /**
     * Add a prompt to favorites
     * @param {string} promptId - Prompt ID to favorite
     */
    addFavorite(promptId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(promptId)) {
            favorites.push(promptId);
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
        }
    },

    /**
     * Remove a prompt from favorites
     * @param {string} promptId - Prompt ID to unfavorite
     */
    removeFavorite(promptId) {
        const favorites = this.getFavorites();
        const filtered = favorites.filter(id => id !== promptId);
        localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(filtered));
    },

    /**
     * Toggle favorite status
     * @param {string} promptId - Prompt ID
     * @returns {boolean} - New favorite status
     */
    toggleFavorite(promptId) {
        if (this.isFavorite(promptId)) {
            this.removeFavorite(promptId);
            return false;
        } else {
            this.addFavorite(promptId);
            return true;
        }
    },

    /**
     * Check if a prompt is favorited
     * @param {string} promptId - Prompt ID
     * @returns {boolean} - True if favorited
     */
    isFavorite(promptId) {
        return this.getFavorites().includes(promptId);
    },

    /**
     * Get all favorite prompt IDs
     * @returns {Array} - Array of prompt IDs
     */
    getFavorites() {
        try {
            const data = localStorage.getItem(this.KEYS.FAVORITES);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    },

    /**
     * Get count of favorites
     * @returns {number} - Number of favorites
     */
    getFavoritesCount() {
        return this.getFavorites().length;
    },

    /**
     * Clear all favorites
     */
    clearFavorites() {
        localStorage.removeItem(this.KEYS.FAVORITES);
    },

    /**
     * SETTINGS MANAGEMENT
     */

    /**
     * Save a setting
     * @param {string} key - Setting key
     * @param {*} value - Setting value
     */
    saveSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    },

    /**
     * Get a setting
     * @param {string} key - Setting key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} - Setting value
     */
    getSetting(key, defaultValue = null) {
        const settings = this.getSettings();
        return settings[key] !== undefined ? settings[key] : defaultValue;
    },

    /**
     * Get all settings
     * @returns {Object} - Settings object
     */
    getSettings() {
        try {
            const data = localStorage.getItem(this.KEYS.SETTINGS);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error loading settings:', error);
            return {};
        }
    },

    /**
     * Clear all settings
     */
    clearSettings() {
        localStorage.removeItem(this.KEYS.SETTINGS);
    },

    /**
     * UTILITY FUNCTIONS
     */

    /**
     * Generate a unique ID
     * @returns {string} - Unique ID
     */
    _generateId() {
        return 'pf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Get storage usage info
     * @returns {Object} - Storage info
     */
    getStorageInfo() {
        return {
            historyCount: this.getHistoryCount(),
            favoritesCount: this.getFavoritesCount(),
            historyLimit: this.HISTORY_LIMIT,
            historyLimitReached: this.isHistoryLimitReached()
        };
    },

    /**
     * Clear all data (reset app)
     */
    clearAll() {
        this.clearHistory();
        this.clearFavorites();
        this.clearSettings();
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
