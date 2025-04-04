import React from "react";
import { Grid, Box, Typography, Tooltip, IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

import ConversationsTable2 from "./dashboard-components/ConversationsTable2";


const Dashboard2 = () => {
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
        <Typography variant="h2" component="h1">
          Conversations
        </Typography>
        <Tooltip 
          title="Each row in the table represents a single query and response. Conversations may be split across multiple rows." 
          placement="right"
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: '#1C1362',
                padding: '12px',
                lineHeight: '1.45em',
              }
            }
          }}
        >
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>


      
      <Grid container spacing={0}>
        {/* Row 1 - Stats Cards */}
        
        
        {/* Row 2 - Conversations List */}
        <Grid item xs={12} sx={{ p: 1, mt: 2 }}>
          <ConversationsTable2 sx={cardStyle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard2;
