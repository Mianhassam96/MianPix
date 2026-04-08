import React from 'react';
import ToolPage from '../components/ToolPage';
import ThumbnailGenerator from '../components/ThumbnailGenerator';

const ThumbnailMaker = () => (
  <ToolPage icon="🖼️" title="Thumbnail Maker" description="Generate YouTube, blog, and social media thumbnails with gradient overlays and title text.">
    {(imageSrc) => <ThumbnailGenerator imageSrc={imageSrc} />}
  </ToolPage>
);

export default ThumbnailMaker;
