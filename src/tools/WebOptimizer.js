import React from 'react';
import ToolPage from '../components/ToolPage';
import SmartOptimizer from '../components/SmartOptimizer';

const WebOptimizer = () => (
  <ToolPage icon="⚡" title="Web Optimizer" description="Convert to WebP, compress, and resize for fast website loading. Shows before/after savings.">
    {(imageSrc) => <SmartOptimizer imageSrc={imageSrc} />}
  </ToolPage>
);

export default WebOptimizer;
