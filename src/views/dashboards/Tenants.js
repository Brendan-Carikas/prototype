import React from "react";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Import ChargeBee logo
import chargebeeLogo from '../../assets/images/CB _logo.png';

const Tenants = () => {
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
        <ApartmentIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
        <Typography variant="h2" component="h1">
          Tenants
        </Typography>
      </Box>
      
      {/* ChargeBee Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={chargebeeLogo} 
            alt="ChargeBee Logo" 
            style={{ height: '16px', marginRight: '10px' }} 
          />
        </Box>
        <Button 
          variant="text" 
          color="primary"
          size="small"
          sx={{ 
            textTransform: 'none',
          }}
        >
          Sign out
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* Tenant Cards */}
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
                  Invotra Ltd
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  invotra.chargebee.com
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.75rem' }}>
                  Created: 12 Jan 2024
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
                LIVE Site
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
                  Acme Corporation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  acme.chargebee.com
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.75rem' }}>
                  Created: 03 Mar 2024
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
                LIVE Site
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
                  TechStart Inc
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  techstart.chargebee.com
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.75rem' }}>
                  Created: 18 Feb 2024
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
                LIVE Site
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tenants;
