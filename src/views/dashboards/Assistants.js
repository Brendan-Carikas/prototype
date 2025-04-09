import React from "react";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Assistants = () => {
  // Card style for future use
  // const cardStyle = {
  //   border: '1px solid',
  //   borderColor: 'divider',
  //   boxShadow: 'none',
  //   height: '100%',
  //   '& .MuiCardContent-root': {
  //     height: '100%',
  //   },
  // };

  return (
    <Box sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, ml: 1.2 }}>
        <SmartToyIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
        <Typography variant="h2" component="h1">
          Assistants
        </Typography>
      </Box>
      
      <Grid container spacing={2}>
        {/* Assistant Cards */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            mb: 3
          }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                  Customer Support Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  GPT-3.5
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Active
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.75rem' }}>
                  Created: 15 Mar 2025
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                color="primary" 
                size="small"
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: 12 }} />}
                sx={{ 
                  borderRadius: 4, 
                  textTransform: 'none',
                }}
              >
                Configure
              </Button>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            mb: 3
          }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                  Sales Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                GPT-3.5   
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Active
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.75rem' }}>
                  Updated: 02 Apr 2025
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                color="primary" 
                size="small"
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: 12 }} />}
                sx={{ 
                  borderRadius: 4, 
                  textTransform: 'none',
                }}
              >
                Configure
              </Button>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            mb: 3
          }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                  Technical Documentation Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                GPT-3.5
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Unpublished
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.75rem' }}>
                  Created: 05 Apr 2025
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                color="primary" 
                size="small"
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: 12 }} />}
                sx={{ 
                  borderRadius: 4, 
                  textTransform: 'none',
                }}
              >
                Configure
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assistants;
