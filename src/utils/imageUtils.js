import Pica from 'pica';

const pica = Pica();

/**
 * Resize image using high-quality pica algorithm
 */
export const resizeImage = async (image, targetWidth, targetHeight) => {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  try {
    await pica.resize(image, canvas, {
      quality: 3,
      alpha: true,
    });
    return canvas;
  } catch (error) {
    console.error('Error resizing image:', error);
    return null;
  }
};

/**
 * Convert canvas to blob with specified format and quality
 */
export const canvasToBlob = (canvas, format = 'png', quality = 0.9) => {
  return new Promise((resolve) => {
    const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
};

/**
 * Load image from URL or File
 */
export const loadImage = (source) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));

    if (typeof source === 'string') {
      img.src = source;
    } else if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(source);
    }
  });
};

/**
 * Calculate aspect ratio dimensions
 */
export const calculateAspectRatio = (originalWidth, originalHeight, targetWidth, targetHeight, lockRatio = false) => {
  if (!lockRatio) {
    return { width: targetWidth, height: targetHeight };
  }

  const ratio = originalWidth / originalHeight;

  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / ratio),
    };
  }

  if (targetHeight && !targetWidth) {
    return {
      width: Math.round(targetHeight * ratio),
      height: targetHeight,
    };
  }

  return { width: targetWidth, height: targetHeight };
};

/**
 * Get image dimensions
 */
export const getImageDimensions = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
};

/**
 * Crop presets
 */
export const cropPresets = {
  square: { aspect: 1 },
  instagram: { aspect: 1 },
  landscape: { aspect: 16 / 9 },
  portrait: { aspect: 9 / 16 },
  thumbnail: { aspect: 4 / 3 },
  banner: { aspect: 3 / 1 },
};

/**
 * Download blob as file
 */
export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
