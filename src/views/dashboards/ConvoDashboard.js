import React from "react";
import { Grid, Box, Typography, Tooltip, IconButton, Card, CardContent } from "@mui/material";

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

import FeedbackTable from "./dashboard-components/FeedbackTable";

const ConvoDashboard = () => {
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
   
        <Typography variant="h1" component="h1">
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
      
      <Grid container spacing={3}>
        {/* Row 1 - Stats Cards */}
        <Grid item xs={12} md={4} sx={{ p: 1 }}>
          <Card sx={cardStyle}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatOutlinedIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>Total interactions</Typography>
              </Box>
              <Typography variant="h3" color="primary" sx={{ fontSize: '36px', mb: 1 }}>1,248</Typography>
              <Typography variant="body2" color="text.secondary">Total conversations with feedback</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4} sx={{ p: 1 }}>
          <Card sx={cardStyle}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ThumbUpOutlinedIcon color="success" sx={{ mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>Customer satisfaction</Typography>
              </Box>
              <Typography variant="h3" color="success.main" sx={{ fontSize: '36px', mb: 1 }}>78%</Typography>
              <Typography variant="body2" color="text.secondary">974 positive responses</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4} sx={{ p: 1 }}>
          <Card sx={cardStyle}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ThumbDownOutlinedIcon color="error" sx={{ mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>Customer dissatisfaction</Typography>
              </Box>
              <Typography variant="h3" color="error.main" sx={{ fontSize: '36px', mb: 1 }}>22%</Typography>
              <Typography variant="body2" color="text.secondary">274 negative responses</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Row 2 - Feedback Table */}
        <Grid item xs={12} sx={{ p: 1 }}>
          <FeedbackTable sx={cardStyle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConvoDashboard;
