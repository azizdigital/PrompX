/**
 * PromptForge OIM - Storage Manager
 * Handles localStorage operations for settings, favorites, history
 */

const Storage = {
    // Keys
    KEYS: {
        SETTINGS: 'promptforge_settings',
        FAVORITES: 'promptforge_favorites',
        USAGE: 'promptforge_usage',
        HISTORY: 'promptforge_history',
        LAST_CATEGORY: 'promptforge_last_category'
    },

    /**
     * Get settings
     */
    getSettings() {
        try {
            const settings = localStorage.getItem(this.KEYS.SETTINGS);
            return settings ? JSON.parse(settings) : this.getDefaultSettings();
        } catch (e) {
            console.error('Error reading settings:', e);
            return this.getDefaultSettings();
        }
    },

    /**
     * Default settings
     */
    getDefaultSettings() {
        return {
            oimName: 'Aziz Mohamad',
            oimTitle: 'OIM Irong Barat',
            platform: 'IbA',
            bossName: 'FM Azri',
            darkMode: true,
            showTooltips: true
        };
    },

    /**
     * Save settings
     */
    saveSettings(settings) {
        try {
            localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
            return true;
        } catch (e) {
            console.error('Error saving settings:', e);
            return false;
        }
    },

    /**
     * Get single setting
     */
    getSetting(key) {
        const settings = this.getSettings();
        return settings[key];
    },

    /**
     * Update single setting
     */
    updateSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        return this.saveSettings(settings);
    },

    /**
     * Get favorites
     */
    getFavorites() {
        try {
            const favorites = localStorage.getItem(this.KEYS.FAVORITES);
            return favorites ? JSON.parse(favorites) : [];
        } catch (e) {
            console.error('Error reading favorites:', e);
            return [];
        }
    },

    /**
     * Check if prompt is favorited
     */
    isFavorite(promptId) {
        const favorites = this.getFavorites();
        return favorites.includes(promptId);
    },

    /**
     * Toggle favorite
     */
    toggleFavorite(promptId) {
        let favorites = this.getFavorites();
        
        if (favorites.includes(promptId)) {
            favorites = favorites.filter(id => id !== promptId);
        } else {
            favorites.push(promptId);
        }
        
        try {
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
            return true;
        } catch (e) {
            console.error('Error saving favorites:', e);
            return false;
        }
    },

    /**
     * Get usage stats
     */
    getUsageStats() {
        try {
            const usage = localStorage.getItem(this.KEYS.USAGE);
            return usage ? JSON.parse(usage) : {};
        } catch (e) {
            console.error('Error reading usage stats:', e);
            return {};
        }
    },

    /**
     * Increment usage count
     */
    incrementUsage(promptId) {
        const usage = this.getUsageStats();
        usage[promptId] = (usage[promptId] || 0) + 1;
        
        try {
            localStorage.setItem(this.KEYS.USAGE, JSON.stringify(usage));
            return true;
        } catch (e) {
            console.error('Error saving usage:', e);
            return false;
        }
    },

    /**
     * Get usage count for prompt
     */
    getUsageCount(promptId) {
        const usage = this.getUsageStats();
        return usage[promptId] || 0;
    },

    /**
     * Get most used prompts
     */
    getMostUsed(limit = 5) {
        const usage = this.getUsageStats();
        const sorted = Object.entries(usage)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
        
        return sorted.map(([promptId, count]) => ({ promptId, count }));
    },

    /**
     * Get history
     */
    getHistory() {
        try {
            const history = localStorage.getItem(this.KEYS.HISTORY);
            return history ? JSON.parse(history) : [];
        } catch (e) {
            console.error('Error reading history:', e);
            return [];
        }
    },

    /**
     * Add to history
     */
    addToHistory(item) {
        let history = this.getHistory();
        
        // Add timestamp
        item.timestamp = new Date().toISOString();
        item.id = Utils.generateId();
        
        // Add to beginning
        history.unshift(item);
        
        // Keep only last 50
        if (history.length > 50) {
            history = history.slice(0, 50);
        }
        
        try {
            localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(history));
            return true;
        } catch (e) {
            console.error('Error saving history:', e);
            return false;
        }
    },

    /**
     * Clear history
     */
    clearHistory() {
        try {
            localStorage.setItem(this.KEYS.HISTORY, JSON.stringify([]));
            return true;
        } catch (e) {
            console.error('Error clearing history:', e);
            return false;
        }
    },

    /**
     * Export all data
     */
    exportData() {
        return {
            settings: this.getSettings(),
            favorites: this.getFavorites(),
            usage: this.getUsageStats(),
            history: this.getHistory(),
            exportDate: new Date().toISOString()
        };
    },

    /**
     * Import data
     */
    importData(data) {
        try {
            if (data.settings) {
                localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(data.settings));
            }
            if (data.favorites) {
                localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(data.favorites));
            }
            if (data.usage) {
                localStorage.setItem(this.KEYS.USAGE, JSON.stringify(data.usage));
            }
            if (data.history) {
                localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(data.history));
            }
            return true;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    },

    /**
     * Clear all data
     */
    clearAll() {
        try {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (e) {
            console.error('Error clearing data:', e);
            return false;
        }
    },

    /**
     * Get last visited category
     */
    getLastCategory() {
        return localStorage.getItem(this.KEYS.LAST_CATEGORY) || null;
    },

    /**
     * Save last visited category
     */
    saveLastCategory(categoryId) {
        localStorage.setItem(this.KEYS.LAST_CATEGORY, categoryId);
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}