import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import AdminDashboardTemplate from '../../layouts/AdminDashboardLayout/AdminDashboardTemplate';

const AdminDashboard = () => {
  return (
    <AdminDashboardTemplate
      title="Admin Dashboard"
      description="Welcome to the admin dashboard. Manage your site content and monitor key metrics."
    >
      {/* Example widgets */}
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Users Overview</Typography>
          {/* Add user statistics widget content */}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Recent Activity</Typography>
          {/* Add recent activity widget content */}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">System Status</Typography>
          {/* Add system status widget content */}
        </Paper>
      </Grid>
    </AdminDashboardTemplate>
  );
};

export default AdminDashboard;
