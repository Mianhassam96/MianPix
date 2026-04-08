import React from 'react';
import ToolPage from '../components/ToolPage';
import AvatarCreator from '../components/AvatarCreator';

const ProfilePicture = () => (
  <ToolPage icon="👤" title="Profile Picture Maker" description="Create a perfect circle or square profile picture with custom backgrounds, gradients, and borders.">
    {(imageSrc) => <AvatarCreator imageSrc={imageSrc} />}
  </ToolPage>
);

export default ProfilePicture;
