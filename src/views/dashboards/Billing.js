import React from "react";
import { Grid, Box, Typography, Card, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme, AppBar, Toolbar, Stack } from "@mui/material";
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
// Import pricing table theme
import pricingTableTheme from '../../assets/global/PricingTableTheme';
import logo from "../../assets/images/arto-site-logo.png";
import InvotraLogo from '../../assets/images/InvotraLogo.png';

const Billing = () => {
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

  const handleLogout = () => {
    console.log('Logout clicked');
    // Actual logout functionality would be implemented here
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '24px', marginTop: '24px' }}>
      {/* App Bar */}
      <AppBar
        sx={{
          background: "#fff",
          color: "#000",
          boxShadow: "0px 7px 30px 0px rgb(90 114 123 / 11%)",
        }}
        position="fixed"
      >
        <Toolbar>
          <Link to="/">
            <img src={logo} alt="Arto" height="36px" />
          </Link>
          <Box flexGrow={1} />
          <Stack spacing={1} direction="row" alignItems="center">
            <Button
              onClick={handleLogout}
              color="primary"
              variant="text"
              startIcon={<LogoutIcon />}
              sx={{ 
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                px: 2,
                py: 0.75,
                borderRadius: 2
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      
      {/* Main Content */}
      <Box sx={{ p: 3, mt: 9, mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, ml: 1.2 }}>
          <PaymentIcon color="primary" sx={{ width: 40, height: 40, mr: 2, mb: 2 }} />
          <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
            Billing
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {/* Billing Content */}
          <Grid item xs={12}>

            {/* Pricing Table */}
            <Paper elevation={0} sx={pricingTableTheme.components.paper}>
              <PricingTable />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          height: '56px',
          bgcolor: 'white',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paddingTop={0.75} 
            sx={{ letterSpacing: '-0.5px' }}
          >
            An
          </Typography>
          <a 
            href="https://invotra.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img 
              src={InvotraLogo} 
              alt="Invotra"
              style={{ height: '16px' }}
            />
          </a>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paddingTop={0.75} 
            sx={{ letterSpacing: '-0.5px' }}
          >
            product
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Pricing Table Component
const PricingTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Define plan data
  const plans = [
    {
      name: 'Starter',
      price: 'From £499',
      features: {
        messages: true,
        dataIntegration: true,
        supportLevel: 'Simplified',
        accountManager: false,
        serviceReviews: false,
        incidentHelpline: false,
        incidentDetails: ''
      },
      buttonText: 'Select plan',
      buttonVariant: 'contained'
    },
    {
      name: 'Growth',
      price: 'From £999',
      features: {
        messages: true,
        dataIntegration: true,
        supportLevel: 'Enhanced',
        accountManager: false,
        serviceReviews: 'Quarterly',
        incidentHelpline: true,
        incidentDetails: '7am-7pm excluding UK Bank Holidays'
      },
      buttonText: 'Select plan',
      buttonVariant: 'contained'
    },
    {
      name: 'Scale',
      price: 'From £2,499',
      features: {
        messages: true,
        dataIntegration: true,
        supportLevel: 'Full',
        accountManager: true,
        serviceReviews: 'Monthly',
        incidentHelpline: true,
        incidentDetails: '24/7 Availability'
      },
      buttonText: 'Select plan',
      buttonVariant: 'contained'
    },
    {
      name: 'Enterprise',
      price: 'Bespoke pricing',
      features: {
        messages: true,
        dataIntegration: true,
        supportLevel: 'Full',
        accountManager: true,
        serviceReviews: 'Custom',
        incidentHelpline: true,
        incidentDetails: '24/7 Availability'
      },
      buttonText: 'Contact us',
      buttonVariant: 'outlined'
    }
  ];

  // Mobile view renders each plan as a separate card
  if (isMobile) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant={pricingTableTheme.typography.tableHeading.variant} 
          component="h2" 
          align="center"
          sx={{ 
            mb: pricingTableTheme.typography.tableHeading.marginBottom, 
            mt: '40px',
            fontWeight: pricingTableTheme.typography.tableHeading.fontWeight, 
            color: pricingTableTheme.typography.tableHeading.color, 
            fontSize: '24px',
            textAlign: 'center'
          }}
        >
          Choose your plan
        </Typography>
        
        {plans.map((plan, index) => (
          <Card key={index} sx={pricingTableTheme.components.card}>
            <Box sx={{ p: 3 }}>
              <Typography 
                variant={pricingTableTheme.typography.planName.mobile.variant} 
                component="h3" 
                sx={{ fontWeight: pricingTableTheme.typography.planName.mobile.fontWeight, mb: 3 }}
              >
                {plan.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2, flexWrap: 'wrap' }}>
                {plan.price === 'Bespoke pricing' ? (
                  <Typography 
                    variant={pricingTableTheme.typography.priceAmount.mobile.variant} 
                    sx={{ 
                      color: pricingTableTheme.typography.priceAmount.mobile.color,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    {plan.price}
                  </Typography>
                ) : (
                  <>
                    {plan.price.startsWith('From') && (
                      <Typography 
                        variant={pricingTableTheme.typography.pricePrefix.mobile.variant} 
                        sx={{ 
                          color: pricingTableTheme.typography.pricePrefix.mobile.color,
                          mr: pricingTableTheme.typography.pricePrefix.mobile.marginRight,
                          fontWeight: pricingTableTheme.typography.pricePrefix.mobile.fontWeight
                        }}
                      >
                        From
                      </Typography>
                    )}
                    <Typography 
                      variant={pricingTableTheme.typography.priceAmount.mobile.variant} 
                      sx={{ 
                        color: pricingTableTheme.typography.priceAmount.mobile.color,
                        fontWeight: pricingTableTheme.typography.priceAmount.mobile.fontWeight,
                      }}
                    >
                      {plan.price.startsWith('From') 
                        ? plan.price.replace('From ', '') 
                        : plan.price}
                    </Typography>
                    {plan.price !== 'Bespoke pricing' && (
                      <Typography 
                        variant={pricingTableTheme.typography.pricePrefix.desktop.variant} 
                        sx={{ 
                          color: pricingTableTheme.typography.pricePrefix.desktop.color,
                          ml: 1,
                          fontWeight: pricingTableTheme.typography.pricePrefix.desktop.fontWeight,
                          display: 'inline !important',
                          visibility: 'visible !important'
                        }}
                      >
                        pm
                      </Typography>
                    )}
                  </>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ alignItems: 'center', minWidth: '28px', mr: 1, display: { xs: 'none', sm: 'flex' } }}>
                    <MessageOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, fontSize: '1.2rem' }} />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ textAlign: { xs: 'left' } }}>2,000 messages per month</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ alignItems: 'center', minWidth: '28px', mr: 1, display: { xs: 'none', sm: 'flex' } }}>
                    <StorageOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, fontSize: '1.2rem' }} />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ textAlign: { xs: 'left' } }}>Data integration and setup</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ alignItems: 'center', minWidth: '28px', mr: 1, display: { xs: 'none', sm: 'flex' } }}>
                    <SupportOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, fontSize: '1.2rem' }} />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ textAlign: { xs: 'left' } }}>Support level: {plan.features.supportLevel}</Typography>
                  </Box>
                </Box>
                {/* Only show account manager row if feature is available or we're not on mobile */}
                {(plan.features.accountManager || !isMobile) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ alignItems: 'center', minWidth: '28px', mr: 1, display: { xs: 'none', sm: 'flex' } }}>
                      <PersonOutlineOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, fontSize: '1.2rem' }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Typography sx={{ textAlign: { xs: 'left' } }}>Dedicated account manager</Typography>
                      {/* Desktop view icon */}
                      {plan.features.accountManager ? 
                        <CheckCircleIcon sx={{ color: '#36ada4', ml: 1, fontSize: '1.2rem', fontWeight: 'bold', display: { xs: 'none', sm: 'inline-flex' } }} /> : 
                        <CloseIcon sx={{ color: pricingTableTheme.colors.textDisabled, ml: 1, fontSize: '1rem', display: { xs: 'none', sm: 'inline-flex' } }} />}

                    </Box>
                  </Box>
                )}
                {/* Only show service reviews row if feature is available or we're not on mobile */}
                {(plan.features.serviceReviews || !isMobile) && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ alignItems: 'center', minWidth: '28px', mr: 1, mt: 0.5, display: { xs: 'none', sm: 'flex' } }}>
                      <AssessmentOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, fontSize: '1.2rem' }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ textAlign: { xs: 'left' } }}>Service reviews</Typography>
                        {/* Desktop view icon */}
                        {plan.features.serviceReviews ? 
                          <CheckCircleIcon sx={{ color: '#36ada4', ml: 1, fontSize: '1.2rem', fontWeight: 'bold', display: { xs: 'none', sm: 'inline-flex' } }} /> : 
                          <CloseIcon sx={{ color: pricingTableTheme.colors.textDisabled, ml: 1, fontSize: '1rem', display: { xs: 'none', sm: 'inline-flex' } }} />}

                      </Box>
                      {plan.features.serviceReviews && 
                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: { xs: 'left' } }}>
                          {plan.features.serviceReviews}
                        </Typography>
                      }
                    </Box>
                  </Box>
                )}
                {/* Only show incident helpline row if feature is available or we're not on mobile */}
                {(plan.features.incidentHelpline || !isMobile) && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ alignItems: 'center', minWidth: '28px', mr: 1, mt: 0.5, display: { xs: 'none', sm: 'flex' } }}>
                      <HelpOutlineOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, fontSize: '1.2rem' }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ textAlign: { xs: 'left' } }}>Incident helpline</Typography>
                        {/* Desktop view icon */}
                        {plan.features.incidentHelpline ? 
                          <CheckCircleIcon sx={{ color: '#36ada4', ml: 1, fontSize: '1.2rem', fontWeight: 'bold', display: { xs: 'none', sm: 'inline-flex' } }} /> : 
                          <CloseIcon sx={{ color: pricingTableTheme.colors.textDisabled, ml: 1, fontSize: '1rem', display: { xs: 'none', sm: 'inline-flex' } }} />}

                      </Box>
                      {plan.features.incidentHelpline && 
                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: { xs: 'left' } }}>
                          {plan.features.incidentDetails}
                        </Typography>
                      }
                    </Box>
                  </Box>
                )}
              </Box>
              
              <Button 
                variant={plan.buttonVariant} 
                color="primary"
                fullWidth
                sx={{ 
                  ...pricingTableTheme.components.button.mobile,
                  ...(plan.buttonVariant === 'contained' ? 
                    {
                      backgroundColor: pricingTableTheme.colors.primary,
                      '&:hover': { backgroundColor: pricingTableTheme.colors.primaryDark }
                    } : 
                    {
                      backgroundColor: 'transparent',
                      '&:hover': { backgroundColor: 'rgba(28, 19, 98, 0.04)' }
                    }
                  )
                }}
              >
                {plan.buttonText}
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    );
  }

  // Desktop view renders a comparison table
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography 
        variant={pricingTableTheme.typography.tableHeading.variant} 
        component="h2" 
        align="left"
        sx={{ 
          mb: pricingTableTheme.typography.tableHeading.marginBottom, 
          fontWeight: pricingTableTheme.typography.tableHeading.fontWeight, 
          color: pricingTableTheme.typography.tableHeading.color,
          textAlign: 'left'
        }}
      >
        Choose your plan
      </Typography>
      
      <TableContainer>
        <Table sx={{ minWidth: pricingTableTheme.components.table.minWidth }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '25%', borderBottom: `1px solid ${pricingTableTheme.colors.border}` }}></TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ width: '18.75%', borderBottom: `1px solid ${pricingTableTheme.colors.border}` }}>
                  <Typography 
                    variant={pricingTableTheme.typography.planName.desktop.variant} 
                    component="h3" 
                    sx={{ 
                      fontWeight: pricingTableTheme.typography.planName.desktop.fontWeight,
                      mb: pricingTableTheme.typography.planName.desktop.marginBottom
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {plan.price.startsWith('From') && (
                      <Typography 
                        variant={pricingTableTheme.typography.pricePrefix.desktop.variant} 
                        sx={{ 
                          color: pricingTableTheme.typography.pricePrefix.desktop.color,
                          mr: pricingTableTheme.typography.pricePrefix.desktop.marginRight,
                          fontWeight: pricingTableTheme.typography.pricePrefix.desktop.fontWeight
                        }}
                      >
                        From
                      </Typography>
                    )}
                    <Typography 
                      variant={pricingTableTheme.typography.priceAmount.desktop.variant} 
                      sx={{ 
                        color: pricingTableTheme.typography.priceAmount.desktop.color,
                        fontWeight: pricingTableTheme.typography.priceAmount.desktop.fontWeight,
                        ...(plan.price === 'Bespoke pricing' && { fontSize: '1rem', fontWeight: 500 })
                      }}
                    >
                      {plan.price.startsWith('From') ? plan.price.replace('From ', '') : plan.price}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Messages */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MessageOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography fontWeight={pricingTableTheme.typography.featureText.fontWeight}>2,000 messages per month</Typography>
                </Box>
              </TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: index === 1 || index === 3 ? pricingTableTheme.colors.background : 'transparent' }}>
                  <CheckCircleIcon sx={{ color: '#36ada4', fontSize: '1.3rem', fontWeight: 'bold' }} />
                </TableCell>
              ))}
            </TableRow>
            
            {/* Data Integration */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StorageOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography fontWeight={pricingTableTheme.typography.featureText.fontWeight}>Data integration and setup</Typography>
                </Box>
              </TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: index === 1 || index === 3 ? pricingTableTheme.colors.background : 'transparent' }}>
                  <CheckCircleIcon sx={{ color: '#36ada4', fontSize: '1.3rem', fontWeight: 'bold' }} />
                </TableCell>
              ))}
            </TableRow>
            
            {/* Support Level */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SupportOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography fontWeight={pricingTableTheme.typography.featureText.fontWeight}>Support level</Typography>
                </Box>
              </TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: index === 1 || index === 3 ? pricingTableTheme.colors.background : 'transparent' }}>
                  <Typography>{plan.features.supportLevel}</Typography>
                </TableCell>
              ))}
            </TableRow>
            
            {/* Account Manager */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonOutlineOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography fontWeight={pricingTableTheme.typography.featureText.fontWeight}>Dedicated account manager</Typography>
                </Box>
              </TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: index === 1 || index === 3 ? pricingTableTheme.colors.background : 'transparent' }}>
                  {plan.features.accountManager ? 
                    <CheckCircleIcon sx={{ color: '#36ada4', fontSize: '1.3rem', fontWeight: 'bold' }} /> : 
                    <CloseIcon sx={{ color: pricingTableTheme.colors.textDisabled }} />}
                </TableCell>
              ))}
            </TableRow>
            
            {/* Service Reviews */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssessmentOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography fontWeight={pricingTableTheme.typography.featureText.fontWeight}>Service reviews</Typography>
                </Box>
              </TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: index === 1 || index === 3 ? pricingTableTheme.colors.background : 'transparent' }}>
                  {plan.features.serviceReviews ? 
                    <Typography>{plan.features.serviceReviews}</Typography> : 
                    <CloseIcon sx={{ color: pricingTableTheme.colors.textDisabled }} />}
                </TableCell>
              ))}
            </TableRow>
            
            {/* Incident Helpline */}
            <TableRow>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HelpOutlineOutlinedIcon sx={{ color: pricingTableTheme.colors.primary, mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography fontWeight={pricingTableTheme.typography.featureText.fontWeight}>Incident helpline</Typography>
                </Box>
              </TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: index === 1 || index === 3 ? pricingTableTheme.colors.background : 'transparent' }}>
                  {plan.features.incidentHelpline ? 
                    <Box>
                      <CheckCircleIcon sx={{ color: '#36ada4', fontSize: '1.3rem', fontWeight: 'bold' }} />
                      {plan.features.incidentDetails && <Typography variant="caption" display="block">{plan.features.incidentDetails}</Typography>}
                    </Box> : 
                    <CloseIcon sx={{ color: pricingTableTheme.colors.textDisabled }} />}
                </TableCell>
              ))}
            </TableRow>
            
            {/* Action Buttons */}
            <TableRow>
              <TableCell sx={{ border: 0 }}></TableCell>
              {plans.map((plan, index) => (
                <TableCell key={index} align="center" sx={{ border: 0, pt: 3, backgroundColor: index === 1 || index === 3 ? pricingTableTheme.colors.background : 'transparent' }}>
                  <Button 
                    variant={plan.buttonVariant} 
                    color="primary"
                    sx={{
                      ...(plan.buttonVariant === 'contained' ? 
                        pricingTableTheme.components.button.contained : 
                        pricingTableTheme.components.button.outlined
                      )
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Billing;
