import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Grid, Box, Typography, Paper, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// ResponsiveDrawerNoAppBar is now provided by the layout
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Assistants = () => {
  const navigate = useNavigate();
  
  // Define default assistants
  const defaultAssistants = useMemo(() => [
    {
      id: 'customer-support',
      name: 'Customer Support Assistant',
      model: 'GPT-3.5',
      status: 'Active',
      created: '15 Mar 2025'
    },
    {
      id: 'sales',
      name: 'Sales Assistant',
      model: 'GPT-3.5',
      status: 'Active',
      created: '28 Feb 2025',
      updated: '02 Apr 2025'
    },
    {
      id: 'technical-docs',
      name: 'Technical Documentation Assistant',
      model: 'GPT-4',
      status: 'Active',
      created: '05 Apr 2025'
    }
  ], []);
  
  // Function to load assistants from localStorage
  const loadAssistantsFromStorage = useCallback(() => {
    try {
      const storedAssistants = localStorage.getItem('customAssistants');
      return storedAssistants ? [...defaultAssistants, ...JSON.parse(storedAssistants)] : defaultAssistants;
    } catch (error) {
      console.error('Error loading assistants from localStorage:', error);
      return defaultAssistants;
    }
  }, [defaultAssistants]);
  
  // State for assistants list
  const [assistants, setAssistants] = useState(loadAssistantsFromStorage);
  
  // State for menu anchor element
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  
  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assistantToDelete, setAssistantToDelete] = useState(null);
  
  // Function to handle opening the menu
  const handleMenuOpen = (event, assistantId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedAssistant(assistantId);
  };
  
  // Function to handle closing the menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedAssistant(null);
  };
  
  // Function to handle navigation to the ManageAssistant screen
  const handleEditClick = (assistantId) => {
    navigate(`/app/dashboards/manage-assistant?id=${assistantId}`);
    handleMenuClose();
  };
  
  // Function to handle delete button click
  const handleDeleteClick = (assistantId) => {
    // Set the assistant to delete and open the confirmation dialog
    setAssistantToDelete(assistantId);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };
  
  // Function to handle actual deletion after confirmation
  const handleConfirmDelete = () => {
    // Remove the assistant from the list
    const updatedAssistants = assistants.filter(assistant => assistant.id !== assistantToDelete);
    setAssistants(updatedAssistants);
    
    // Update localStorage if it's a custom assistant
    if (!['customer-support', 'sales', 'technical-docs'].includes(assistantToDelete)) {
      const customAssistants = updatedAssistants.filter(
        assistant => !['customer-support', 'sales', 'technical-docs'].includes(assistant.id)
      );
      localStorage.setItem('customAssistants', JSON.stringify(customAssistants));
    }
    
    // Show a snackbar or some feedback (would be implemented in a real app)
    console.log(`Deleted assistant: ${assistantToDelete}`);
    
    // Close the dialog and reset the assistant to delete
    setDeleteDialogOpen(false);
    setAssistantToDelete(null);
  };
  
  // Function to handle creating a new assistant - temporarily commented out
  // const handleCreateAssistant = () => {
  //   navigate('/app/dashboards/manage-assistant?id=new');
  // };
  
  // Function to add a new assistant (called from ManageAssistant)
  useEffect(() => {
    // Function to handle storage changes
    const handleStorageChange = () => {
      setAssistants(loadAssistantsFromStorage());
    };
    
    // Listen for the custom event that signals a new assistant was created
    const handleNewAssistant = (event) => {
      const newAssistant = event.detail;
      
      // Add the new assistant to the list
      setAssistants(prevAssistants => {
        const updatedAssistants = [...prevAssistants, newAssistant];
        
        // Update localStorage with custom assistants
        const customAssistants = updatedAssistants.filter(
          assistant => !['customer-support', 'sales', 'technical-docs'].includes(assistant.id)
        );
        localStorage.setItem('customAssistants', JSON.stringify(customAssistants));
        
        return updatedAssistants;
      });
    };
    
    // Add event listeners
    window.addEventListener('newAssistantCreated', handleNewAssistant);
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('newAssistantCreated', handleNewAssistant);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadAssistantsFromStorage]);
  
  return (
    <Box>
      <Box sx={{ flexGrow: 1, p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6.25, ml: 1.2 }}>
          <SmartToyIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h2" component="h1">
            Assistants
          </Typography>
        </Box>
      
        <Grid container spacing={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            {assistants.map((assistant) => (
              <Paper 
                key={assistant.id}
                elevation={0} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0',
                  mb: 3
                }}
              >
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                      {assistant.name}
                    </Typography>
                    {/* Model and status fields temporarily hidden
                    <Typography variant="body2" color="text.secondary">
                      {assistant.model || 'GPT-3.5'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {assistant.status || 'Active'}
                    </Typography>
                    */}
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Created: {assistant.created}
                    </Typography>
                    {assistant.updated && (
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Updated: {assistant.updated}
                      </Typography>
                    )}
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(event) => handleMenuOpen(event, assistant.id)}
                    aria-label="more options"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Grid>
      
      {/* Menu for assistant actions */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 1,
          sx: { minWidth: 180, borderRadius: 2 }
        }}
      >
        <MenuItem onClick={() => handleEditClick(selectedAssistant)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        {/* Delete option removed */}
      </Menu>
      
      {/* Floating Action Button to create a new assistant - temporarily hidden
      <Tooltip title="Create new assistant" placement="left">
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={handleCreateAssistant}
          sx={{ 
            position: 'fixed',
            bottom: 32,
            right: 32,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      */}
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {"Delete Assistant"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this assistant? This action cannot be undone, and any customizations will be permanently lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Box>
  );
};

export default Assistants;
