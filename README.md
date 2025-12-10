# 🔨 Aziz Prompt Forge

**All Your AI Prompts. One Smart Hub.**

A Progressive Web App (PWA) for managing and generating AI prompts for offshore operations and professional use.

## 📋 Features

- ✅ **41 Professional Prompts** across 5 categories
- ✅ **Browse by Category** - OIM Operations, Report Refining, Language, Personal Development, General Purpose
- ✅ **Smart Search** - Find prompts quickly
- ✅ **Favorites** - Bookmark frequently used prompts
- ✅ **History** - Track your generated prompts (up to 50)
- ✅ **Export History** - Save as JSON file
- ✅ **Copy & Share** - Copy to clipboard, share via WhatsApp/Email
- ✅ **100% Offline** - Works without internet connection
- ✅ **Responsive Design** - iPhone, iPad, and Android optimized
- ✅ **Dark/Light compatible** - Clean professional interface

## 🚀 Installation

### Option 1: Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files maintaining the folder structure:
   ```
   your-repo/
   ├── index.html
   ├── manifest.json
   ├── service-worker.js
   ├── css/
   │   └── style.css
   ├── js/
   │   ├── app.js
   │   ├── prompts.js
   │   ├── ui.js
   │   ├── storage.js
   │   └── utils.js
   └── icons/
       ├── icon-192.png
       ├── icon-512.png
       ├── apple-touch-icon.png
       └── favicon.ico
   ```
3. Enable GitHub Pages in repository settings
4. Access via: `https://yourusername.github.io/your-repo/`

### Option 2: Local Testing

1. Extract all files to a folder
2. Use a local web server (required for Service Worker):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
3. Open browser to `http://localhost:8000`

### Option 3: Deploy to Web Hosting

1. Upload all files to your web hosting (cPanel, Netlify, Vercel, etc.)
2. Ensure HTTPS is enabled (required for PWA)
3. Access via your domain

## 📱 Installing as PWA on Device

### iPhone/iPad:
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

### Android:
1. Open the app in Chrome
2. Tap the menu (3 dots)
3. Tap "Add to Home Screen"
4. Tap "Add"

## 🎨 Generating Icons

You need to create 4 icon files. Use one of these methods:

### Method 1: Using Canva (Easiest)
1. Go to Canva.com
2. Create a 512x512px design
3. Add text "🔨 PF" or your logo
4. Use colors: Primary #2563EB, Background #FFFFFF
5. Download as PNG
6. Resize to required sizes using online tools

### Method 2: Using RealFaviconGenerator
1. Visit https://realfavicongenerator.net
2. Upload your source image
3. Adjust settings for iOS, Android, etc.
4. Download and extract to `/icons/` folder

### Required Icon Sizes:
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels
- `apple-touch-icon.png` - 180x180 pixels
- `favicon.ico` - 32x32 pixels (or multi-size ICO)

## 📖 Usage Guide

### Generating a Prompt

1. **Browse** - Select a category from the home page
2. **Choose** - Pick the prompt you want to use
3. **Fill Form** - Enter required information
4. **Generate** - Click "Generate Prompt" button
5. **Copy** - Copy the generated prompt
6. **Use** - Paste into Claude or ChatGPT

### AI-Only Prompts
These prompts combine your inputs into a ready-to-use AI prompt. Just copy and paste!

### Hybrid Prompts
These prompts have two modes:
- **Template Mode** - Generates a formatted document
- **Refine Mode** - Generates a prompt to refine the document with AI

### Managing Favorites
- **Add** - Click the star icon on any prompt
- **View** - Access from the bottom navigation
- **Remove** - Click the star again to unfavorite

### History Management
- **Automatic** - Every generated prompt is saved
- **Limit** - Maximum 50 items
- **Export** - Save as JSON before reaching limit
- **Delete** - Remove individual items or clear all

## 🔧 Customization

### Modifying Prompts
Edit `js/prompts.js` to:
- Add new prompts
- Modify existing prompts
- Add new categories
- Change prompt templates

### Styling
Edit `css/style.css` to:
- Change colors (see `:root` variables)
- Adjust spacing and sizing
- Modify responsive breakpoints

### Adding Features
Main files:
- `js/app.js` - Application logic and routing
- `js/ui.js` - UI rendering
- `js/storage.js` - localStorage management
- `js/utils.js` - Helper functions

## 🛠️ Technical Details

### Technology Stack
- **Frontend**: Pure HTML, CSS, JavaScript (Vanilla)
- **Storage**: localStorage
- **Offline**: Service Worker (PWA)
- **Dependencies**: None (no external libraries)

### Browser Compatibility
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet

### Storage Limits
- **History**: 50 items max
- **Favorites**: Unlimited (practical limit ~100)
- **localStorage**: ~5-10MB browser dependent

### Privacy & Security
- ✅ All data stored locally on device
- ✅ No external API calls
- ✅ No analytics or tracking
- ✅ No cloud sync
- ✅ Works completely offline

## 🐛 Troubleshooting

### PWA Not Installing
- Ensure you're using HTTPS (or localhost)
- Check browser console for errors
- Verify `manifest.json` and `service-worker.js` paths

### Icons Not Showing
- Verify icon files exist in `/icons/` folder
- Check file names match exactly
- Clear browser cache and reload

### Service Worker Not Working
- Must use HTTPS or localhost
- Check browser console for errors
- Try unregistering old service workers in DevTools

### History Not Saving
- Check localStorage is enabled in browser
- Check browser storage limits
- Try clearing app data and resetting

## 📝 License

This project is for personal/internal use. Modify as needed for your requirements.

## 👨‍💻 Developer

Created for Aziz - Offshore Installation Manager at PETRONAS

## 🔄 Version History

### v1.0.0 (December 2024)
- Initial release
- 41 prompts across 5 categories
- Full PWA functionality
- Offline support
- History and favorites
- Export to JSON
- Responsive design

## 🎯 Future Enhancements (Ideas)

- [ ] Import history from JSON
- [ ] Prompt templates customization
- [ ] Dark mode toggle
- [ ] Category color customization
- [ ] Export individual prompts
- [ ] Cloud backup (optional)
- [ ] Multi-language support

## 📧 Support

For issues or suggestions, contact Aziz or modify the code directly.

---

**Made with ❤️ for offshore professionals**
