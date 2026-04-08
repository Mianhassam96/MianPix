import React from 'react';
import ToolPage from '../components/ToolPage';
import ColorPalette from '../components/ColorPalette';

const PaletteExtractor = () => (
  <ToolPage icon="🎨" title="Color Palette Extractor" description="Extract dominant colors, hex codes, and generate gradient CSS from any image.">
    {(imageSrc) => <ColorPalette imageSrc={imageSrc} />}
  </ToolPage>
);

export default PaletteExtractor;
