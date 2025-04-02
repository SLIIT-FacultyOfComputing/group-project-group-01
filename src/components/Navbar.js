import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fungi Flow
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Features</Button>
        <Button color="inherit">Contact</Button>
        <img src="logo.png" alt="Logo" style={{ height: '40px', marginLeft: '10px' }} />
      </Toolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)`
  background-color: #282c34;
`;

export default Navbar;
