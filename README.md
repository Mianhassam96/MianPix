# MianPix - Simple Image Editor

A modern, browser-based image editing tool built with React. Edit, resize, crop, and compress your images online without uploading to any server.

## Features

- 📤 **Upload Images**: From device, URL, or drag-and-drop
- ✂️ **Crop**: Interactive cropping with precise controls
- 📏 **Resize**: Custom dimensions
- 🔄 **Transform**: Rotate and flip (horizontal/vertical)
- 🗜️ **Compress**: Adjustable quality slider
- 💾 **Export**: Download as PNG, JPG, or WEBP
- 🌓 **Dark/Light Theme**: Toggle between themes
- 🔒 **Privacy**: All processing happens in your browser

## Tech Stack

- React 18
- React Router
- react-dropzone (file uploads)
- react-image-crop (cropping)
- react-icons (UI icons)
- HTML5 Canvas API (image processing)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view in browser

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from create-react-app (one-way operation)

## Usage

1. Navigate to the **Tool** page
2. Upload an image (drag-drop, file picker, or URL)
3. Use the sidebar controls to:
   - Rotate or flip the image
   - Crop with interactive handles
   - Resize to custom dimensions
   - Adjust compression quality
   - Select output format
4. Click **Download** to save your edited image

## Project Structure

```
MianPix/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ImageUpload.js
│   │   └── ImageEditor.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Tool.js
│   │   ├── About.js
│   │   └── Contact.js
│   ├── App.js
│   ├── index.js
│   └── [CSS files]
├── package.json
└── README.md
```

## License

MIT License - Free to use and modify

## Author

Built with ❤️ for simple image editing needs
