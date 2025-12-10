/**
 * PromptForge OIM - Clipboard Manager
 * Handles copy-to-clipboard functionality
 */

const Clipboard = {
    /**
     * Copy text to clipboard
     */
    async copy(text) {
        try {
            // Modern Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            
            // Fallback for older browsers
            return this.fallbackCopy(text);
            
        } catch (err) {
            console.error('Failed to copy:', err);
            return this.fallbackCopy(text);
        }
    },

    /**
     * Fallback copy method
     */
    fallbackCopy(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            return successful;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            return false;
        }
    },

    /**
     * Copy with user feedback
     */
    async copyWithFeedback(text, buttonElement = null) {
        const success = await this.copy(text);
        
        if (success) {
            Utils.showToast('Copied to clipboard!', 'success');
            
            // Update button if provided
            if (buttonElement) {
                const originalText = buttonElement.innerHTML;
                buttonElement.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Copied!
                `;
                buttonElement.classList.add('btn-success');
                
                setTimeout(() => {
                    buttonElement.innerHTML = originalText;
                    buttonElement.classList.remove('btn-success');
                }, 2000);
            }
        } else {
            Utils.showToast('Failed to copy. Please try again.', 'error');
        }
        
        return success;
    },

    /**
     * Copy code/prompt with formatting
     */
    async copyFormatted(text, language = 'text') {
        // For now, just copy as-is
        // Could add syntax highlighting or formatting in future
        return this.copy(text);
    },

    /**
     * Check if clipboard API is available
     */
    isAvailable() {
        return !!(navigator.clipboard && navigator.clipboard.writeText);
    },

    /**
     * Read from clipboard (requires user permission)
     */
    async paste() {
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                const text = await navigator.clipboard.readText();
                return text;
            }
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
        return null;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Clipboard;
}