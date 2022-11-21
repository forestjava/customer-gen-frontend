import React from 'react';

import { Box } from '../atoms/Box';
import { NavBar } from '../bags/NavBar';
import { TopRouter } from '../bags/TopRouter';

export const Dashboard: React.FC = () => (
  <Box className='grid grid-cols-[1fr,4fr] min-h-screen' as='main'>
    <NavBar />
    <TopRouter />
  </Box>
);
