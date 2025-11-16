# MianPix Setup Instructions

## Quick Start

Follow these steps to get MianPix running on your machine:

### 1. Install Dependencies

Run the following command in the project directory:

```bash
npm install
```

This will install all required packages:
- react
- react-dom
- react-router-dom
- react-dropzone
- react-image-crop
- react-icons
- react-scripts
- web-vitals

### 2. Start Development Server

Once dependencies are installed, start the development server:

```bash
npm start
```

The app should automatically open in your browser at `http://localhost:3000`

### 3. Build for Production (Optional)

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

## Troubleshooting

### If `npm install` fails:

1. Make sure you have Node.js installed (version 14 or higher recommended)
2. Check your internet connection
3. Try clearing npm cache: `npm cache clean --force`
4. Delete `node_modules` folder (if exists) and `package-lock.json`, then try again

### If the app doesn't start:

1. Make sure port 3000 is not being used by another application
2. Check the terminal for any error messages
3. Try deleting `node_modules` and reinstalling

## Project Structure

```
MianPix/
├── public/              # Static files
│   └── index.html      # Main HTML file
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Navbar.js
│   │   ├── ImageUpload.js
│   │   └── ImageEditor.js
│   ├── pages/          # Page components
│   │   ├── Home.js     # Landing page
│   │   ├── Tool.js     # Main editing tool
│   │   ├── About.js    # About page
│   │   └── Contact.js  # Contact form
│   ├── App.js          # Main app component with routing
│   └── index.js        # Entry point
└── package.json        # Dependencies and scripts

## Features Implemented

✅ Image upload (device, URL, drag-drop)
✅ Live preview
✅ Resize with custom dimensions
✅ Rotate (90° increments)
✅ Flip (horizontal/vertical)
✅ Interactive cropping
✅ Compression quality slider
✅ Multi-format download (PNG, JPG, WEBP)
✅ Dark/Light theme toggle
✅ Responsive design
✅ Full routing (Home, Tool, About, Contact)

## Next Steps (Optional Enhancements)

- Add loading animations during image processing
- Implement before/after comparison slider
- Add undo/redo functionality
- Save edit history to localStorage
- Add PWA support for offline usage
- Implement image filters (brightness, contrast, saturation)
- Add batch image processing

## Browser Compatibility

MianPix works best on modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Requires JavaScript enabled and HTML5 Canvas API support.
