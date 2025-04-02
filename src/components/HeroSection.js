import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styled from 'styled-components';

const HeroSection = () => {
  return (
    <StyledHeroSection>
      <Box sx={{ textAlign: 'center', color: 'white' }}>
        <Typography variant="h2" gutterBottom>
          Fungi Flow
        </Typography>
        <Typography variant="h5" gutterBottom>
           Mushroom Resource Management System
        </Typography>
        <Button variant="contained" color="primary">Get Started</Button>
      </Box>
    </StyledHeroSection>
  );
};

const StyledHeroSection = styled(Box)`
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  padding: 80px 20px;
  height: 60vh;
`;

export default HeroSection;
