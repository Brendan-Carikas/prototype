// Pricing Table Theme
// This file contains theme styles for the pricing table component

const pricingTableTheme = {
  // Colors
  colors: {
    primary: '#1C1362', // Main brand color - Invotra purple
    primaryLight: '#eef2ff',
    primaryDark: '#15104D',
    success: '#22c55e', // Green for checkmarks
    successLight: '#f0f7f0',
    successBorder: '#e0e0e0',
    successHover: '#e8f5e9',
    successBorderHover: '#c8e6c9',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    textDisabled: 'rgba(0, 0, 0, 0.38)',
    border: '#e0e0e0',
    background: '#f9f9f9',
    white: '#ffffff',
  },
  
  // Typography
  typography: {
    planName: {
      desktop: {
        variant: 'h5',
        fontWeight: 700,
        marginBottom: 1,
      },
      mobile: {
        variant: 'h4',
        fontWeight: 700,
      }
    },
    planPrice: {
      desktop: {
        variant: 'subtitle1',
        fontWeight: 500,
        color: '#1C1362',
      },
      mobile: {
        variant: 'h6',
        color: '#1C1362',
      }
    },
    // New style definitions for price and 'From' text
    priceAmount: {
      desktop: {
        variant: 'h3',
        fontWeight: 400,
        color: '#1C1362',
      },
      mobile: {
        variant: 'h5',
        fontWeight: 700,
        color: '#1C1362',
      }
    },
    pricePrefix: {
      desktop: {
        variant: 'body2',
        fontWeight: 500,
        color: '#64748b',
        marginRight: 0.5,
      },
      mobile: {
        variant: 'body1',
        fontWeight: 400,
        color: '#64748b',
        marginRight: 0.5,
      }
    },
    featureText: {
      fontWeight: 600,
      color: '#64748b',
    },
    tableHeading: {
      variant: 'h3',
      fontWeight: 400,
      color: '#000000',
      marginBottom: 4,
      marginTop: 4,
    }
  },
  
  // Component styles
  components: {
    // Card styles for mobile view
    card: {
      marginBottom: 3,
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      padding: 3,
    },
    
    // Table styles
    table: {
      minWidth: 800,
      borderBottom: '2px solid #e0e0e0',
      featureCell: {
        backgroundColor: '#f9f9f9',
      }
    },
    
    // Button styles
    button: {
      contained: {
        borderRadius: 2,
        padding: '8px 24px',
        backgroundColor: '#1C1362',
        '&:hover': {
          backgroundColor: '#15104D',
        }
      },
      outlined: {
        borderRadius: 2,
        padding: '8px 24px',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(28, 19, 98, 0.04)',
        }
      },
      mobile: {
        marginTop: 2,
        borderRadius: 2,
        padding: '8px 0',
      }
    },
    
    // Paper container
    paper: {
      borderRadius: 2,
      overflow: 'hidden',
      border: '1px solid #e0e0e0',
      marginBottom: 3,
      padding: { xs: 2, md: 4 }
    }
  }
};

export default pricingTableTheme;
