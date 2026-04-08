import React from 'react';
import ToolPage from '../components/ToolPage';
import FaviconGenerator from '../components/FaviconGenerator';

const FaviconGen = () => (
  <ToolPage icon="🔖" title="Favicon Generator" description="Generate all favicon sizes (16×16 to 512×512) plus HTML snippet and ZIP download.">
    {(imageSrc) => <FaviconGenerator imageSrc={imageSrc} />}
  </ToolPage>
);

export default FaviconGen;
