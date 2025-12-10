/**
 * Aziz Prompt Forge - Utility Functions
 * Helper functions for copy, share, prompt generation, etc.
 */

const Utils = {
    /**
     * CLIPBOARD & SHARING
     */

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} - True if successful
     */
    async copyToClipboard(text) {
        try {
            // Modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            return success;
        } catch (error) {
            console.error('Copy failed:', error);
            return false;
        }
    },

    /**
     * Share using Web Share API (if available) or fallback to copy
     * @param {string} text - Text to share
     * @param {string} title - Share title
     * @returns {Promise<string>} - 'shared', 'copied', or 'failed'
     */
    async share(text, title = 'Prompt from Aziz Prompt Forge') {
        try {
            // Check if Web Share API is available
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: text
                });
                return 'shared';
            }
            
            // Fallback to copy
            const copied = await this.copyToClipboard(text);
            return copied ? 'copied' : 'failed';
        } catch (error) {
            // User cancelled or error occurred
            if (error.name === 'AbortError') {
                return 'cancelled';
            }
            
            // Try fallback copy
            const copied = await this.copyToClipboard(text);
            return copied ? 'copied' : 'failed';
        }
    },

    /**
     * Share via WhatsApp
     * @param {string} text - Text to share
     */
    shareWhatsApp(text) {
        const encoded = encodeURIComponent(text);
        const url = `https://wa.me/?text=${encoded}`;
        window.open(url, '_blank');
    },

    /**
     * Share via Email
     * @param {string} text - Text to share
     * @param {string} subject - Email subject
     */
    shareEmail(text, subject = 'AI Prompt from Aziz Prompt Forge') {
        const encodedSubject = encodeURIComponent(subject);
        const encodedText = encodeURIComponent(text);
        const url = `mailto:?subject=${encodedSubject}&body=${encodedText}`;
        window.location.href = url;
    },

    /**
     * PROMPT GENERATION
     */

    /**
     * Generate prompt from template and inputs
     * @param {Object} prompt - Prompt object from PromptsData
     * @param {Object} inputs - User input values
     * @returns {string} - Generated prompt text
     */
    generatePrompt(prompt, inputs) {
        let text = '';

        // For AI-only prompts, use the aiPrompt
        if (prompt.type === 'ai-only') {
            text = prompt.aiPrompt;
        }
        // For hybrid prompts, use the template first
        else if (prompt.type === 'hybrid') {
            text = prompt.template;
        }

        // Replace all placeholders
        text = this._replacePlaceholders(text, inputs);

        return text;
    },

    /**
     * Generate refined prompt (for hybrid prompts)
     * @param {Object} prompt - Prompt object
     * @param {Object} inputs - User inputs
     * @param {string} refineOption - Refine option ID
     * @returns {string} - Generated AI refine prompt
     */
    generateRefinePrompt(prompt, inputs, refineOption) {
        // First generate the template
        const template = this.generatePrompt(prompt, inputs);
        
        // Get the refine option
        const option = prompt.aiRefineOptions?.find(opt => opt.id === refineOption);
        if (!option) {
            return template;
        }

        // Replace {template} in the refine prompt
        let refinePrompt = option.prompt.replace('{template}', template);
        
        // Replace any other placeholders
        refinePrompt = this._replacePlaceholders(refinePrompt, inputs);

        return refinePrompt;
    },

    /**
     * Replace placeholders in text
     * @param {string} text - Text with placeholders
     * @param {Object} inputs - Input values
     * @returns {string} - Text with replaced placeholders
     */
    _replacePlaceholders(text, inputs) {
        let result = text;

        // Add timestamp if needed
        inputs.timestamp = inputs.timestamp || this.formatDateTime(new Date());
        inputs.reporter = inputs.reporter || 'Aziz (OIM)';

        // Replace simple placeholders {key}
        Object.keys(inputs).forEach(key => {
            const value = inputs[key] || '';
            const regex = new RegExp(`\\{${key}\\}`, 'g');
            result = result.replace(regex, value);
        });

        // Handle conditional blocks {if key}...{endif}
        result = this._handleConditionals(result, inputs);

        // Handle checkbox arrays (convert to comma-separated)
        Object.keys(inputs).forEach(key => {
            if (Array.isArray(inputs[key])) {
                const value = inputs[key].join(', ');
                const regex = new RegExp(`\\{${key}\\}`, 'g');
                result = result.replace(regex, value);
            }
        });

        return result;
    },

    /**
     * Handle conditional blocks in template
     * @param {string} text - Text with conditionals
     * @param {Object} inputs - Input values
     * @returns {string} - Processed text
     */
    _handleConditionals(text, inputs) {
        // Match {if key}...{endif} blocks
        const regex = /\{if\s+(\w+)\}(.*?)\{endif\}/gs;
        
        return text.replace(regex, (match, key, content) => {
            // Check if the key exists and has a truthy value
            if (inputs[key] && inputs[key] !== '' && inputs[key] !== null) {
                // Replace the placeholder in the content
                return content.replace(`{${key}}`, inputs[key]);
            }
            // Remove the block if condition is false
            return '';
        });
    },

    /**
     * FILE OPERATIONS
     */

    /**
     * Download text as file
     * @param {string} text - Text content
     * @param {string} filename - File name
     * @param {string} mimeType - MIME type
     */
    downloadTextFile(text, filename, mimeType = 'text/plain') {
        const blob = new Blob([text], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Download JSON data
     * @param {Object} data - Data to download
     * @param {string} filename - File name
     */
    downloadJSON(data, filename = 'history-export.json') {
        const jsonString = JSON.stringify(data, null, 2);
        this.downloadTextFile(jsonString, filename, 'application/json');
    },

    /**
     * DATE & TIME FORMATTING
     */

    /**
     * Format date to readable string
     * @param {Date|string} date - Date object or ISO string
     * @returns {string} - Formatted date
     */
    formatDate(date) {
        const d = typeof date === 'string' ? new Date(date) : date;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Check if today
        if (this._isSameDay(d, today)) {
            return 'Today';
        }
        // Check if yesterday
        if (this._isSameDay(d, yesterday)) {
            return 'Yesterday';
        }
        
        // Format as "Dec 10, 2024"
        return d.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    },

    /**
     * Format time to readable string
     * @param {Date|string} date - Date object or ISO string
     * @returns {string} - Formatted time
     */
    formatTime(date) {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    },

    /**
     * Format date and time
     * @param {Date|string} date - Date object or ISO string
     * @returns {string} - Formatted date and time
     */
    formatDateTime(date) {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    },

    /**
     * Format relative time (e.g., "2 hours ago")
     * @param {Date|string} date - Date object or ISO string
     * @returns {string} - Relative time string
     */
    formatRelativeTime(date) {
        const d = typeof date === 'string' ? new Date(date) : date;
        const now = new Date();
        const diffMs = now - d;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return this.formatDate(date);
    },

    /**
     * Check if two dates are the same day
     * @param {Date} date1 - First date
     * @param {Date} date2 - Second date
     * @returns {boolean} - True if same day
     */
    _isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    },

    /**
     * STRING UTILITIES
     */

    /**
     * Truncate text to specified length
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} - Truncated text
     */
    truncate(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Generate a unique ID
     * @returns {string} - Unique ID
     */
    generateId() {
        return 'pf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Group array by key
     * @param {Array} array - Array to group
     * @param {string} key - Key to group by
     * @returns {Object} - Grouped object
     */
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const groupKey = item[key];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
            return result;
        }, {});
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} - Debounced function
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
