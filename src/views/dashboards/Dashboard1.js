import React from "react";
import { Grid, Box, Typography, Tooltip, IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

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
    <Box sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, ml: 1.2 }}>
        <ChatIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
        <Typography variant="h2">
          Conversations
        </Typography>
        <Tooltip title="Each row in the table represents a single query and response. Conversations may be split across multiple rows." placement="right">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>


      
      <Grid container spacing={0}>
        {/* Row 1 - Stats Cards */}
        
        
        {/* Row 2 - Conversations List */}
        <Grid item xs={12} sx={{ p: 1, mt: 2 }}>
          <ConversationsTable sx={cardStyle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
