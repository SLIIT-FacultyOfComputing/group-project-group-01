import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const Features = () => {
  return (
    <StyledFeaturesSection>
      <Typography variant="h3" gutterBottom align="center">
        Key Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="feature">
            <Typography variant="h5">Mushroom Growth Tracking</Typography>
            <Typography>Track the growth of various mushroom types in real-time.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="feature">
            <Typography variant="h5">Raw Material Distribution</Typography>
            <Typography>Efficiently manage raw materials for mushroom cultivation.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="feature">
            <Typography variant="h5">Sales & Reports</Typography>
            <Typography>Track sales data and generate detailed reports for analysis.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </StyledFeaturesSection>
  );
};

const StyledFeaturesSection = styled(Box)`
  padding: 40px 20px;
  background-color: #f4f4f4;
  .feature {
    padding: 20px;
    text-align: center;
  }
`;

export default Features;
