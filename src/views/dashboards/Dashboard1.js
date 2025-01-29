import React from "react";
import { Grid, Box, Typography } from "@mui/material";


import ConversationsTable from "./dashboard-components/ConversationsTable";


const Dashboard1 = () => {
  const cardStyle = {
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
    height: '100%',
    '& .MuiCardContent-root': {
      height: '100%',
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 3, marginLeft:1.2 }}>
        Overview
      </Typography>


      
      <Grid container spacing={0}>
        {/* Row 1 - Stats Cards */}
        
        
        {/* Row 2 - Conversations List */}
        <Grid item xs={12} sx={{ p: 1, mt: 8 }}>
          <ConversationsTable sx={cardStyle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
