import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body1" align="center" color="white">
        &copy; {new Date().getFullYear()} Fungi Flow. All rights reserved.
      </Typography>
    </StyledFooter>
  );
};

const StyledFooter = styled(Box)`
  background-color: #282c34;
  padding: 20px;
`;

export default Footer;
