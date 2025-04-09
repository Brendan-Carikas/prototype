import React, { useState, useEffect, useRef } from "react";
import { 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  // Card, 
  // CardContent,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // IconButton,
  // Tooltip,
  TextField,
  // MenuItem,
  // Select,
  // FormControl,
  // InputLabel,
  // Slider,
  // Switch,
  // FormControlLabel,
  // Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from "@mui/material";

// Icons
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import GridOnIcon from '@mui/icons-material/GridOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import TuneIcon from '@mui/icons-material/Tune';

// Tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`assistant-tabpanel-${index}`}
      aria-labelledby={`assistant-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Sample file data
const sampleFiles = [
  { id: 1, name: 'company_handbook.pdf', type: 'pdf', size: '2.4 MB', dateAdded: '2025-03-15' },
  { id: 2, name: 'product_specifications.docx', type: 'doc', size: '1.8 MB', dateAdded: '2025-03-20' },
  { id: 3, name: 'quarterly_report.csv', type: 'csv', size: '3.2 MB', dateAdded: '2025-04-01' },
  { id: 4, name: 'api_documentation.md', type: 'md', size: '0.5 MB', dateAdded: '2025-04-05' },
  { id: 5, name: 'code_examples.js', type: 'code', size: '0.8 MB', dateAdded: '2025-04-06' }
];

// File type icon mapping
const getFileIcon = (type) => {
  switch(type) {
    case 'pdf':
      return <PictureAsPdfIcon sx={{ color: '#e53935' }} />;
    case 'doc':
      return <DescriptionIcon sx={{ color: '#1976d2' }} />;
    case 'csv':
      return <GridOnIcon sx={{ color: '#43a047' }} />;
    case 'code':
      return <CodeIcon sx={{ color: '#ffa000' }} />;
    case 'md':
      return <TextSnippetIcon sx={{ color: '#7e57c2' }} />;
    default:
      return <DescriptionIcon />;
  }
};

const ManageAssistant = () => {
  // State for tab value
  const [tabValue, setTabValue] = useState(0);
  // State for selected files
  const [selectedFiles, setSelectedFiles] = useState([]);
  // State for files list (initialized with sample files)
  const [filesList, setFilesList] = useState(sampleFiles);
  // State to toggle between empty state and files view (for demo purposes)
  const [hasFiles, setHasFiles] = useState(true);
  // State for save confirmation modal
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  // State for cancel confirmation modal
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  // State for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // State for file format error modal
  const [formatErrorModalOpen, setFormatErrorModalOpen] = useState(false);
  // State for unsupported file names
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  // State for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Ref for file input
  const fileInputRef = useRef(null);
  
  // Instructions tab states
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an AI assistant that helps users with their questions and tasks. Be helpful, concise, and accurate in your responses. When you don't know something, admit it rather than making up information."
  );
  const [assistantName, setAssistantName] = useState("Customer Support Assistant");
  
  // Original state for tracking changes
  const [originalSystemPrompt, setOriginalSystemPrompt] = useState(
    "You are an AI assistant that helps users with their questions and tasks. Be helpful, concise, and accurate in your responses. When you don't know something, admit it rather than making up information."
  );
  const [originalAssistantName, setOriginalAssistantName] = useState("Customer Support Assistant");

  // Simulate fetching data from an API
  useEffect(() => {
    // In a real app, you would fetch the data from your backend
    // and then set both the current state and original state
    const fetchData = async () => {
      try {
        // Simulate API call
        const data = {
          assistantName: "Customer Support Assistant",
          systemPrompt: "You are an AI assistant that helps users with their questions and tasks. Be helpful, concise, and accurate in your responses. When you don't know something, admit it rather than making up information."
        };
        
        // Set both current and original state
        setAssistantName(data.assistantName);
        setSystemPrompt(data.systemPrompt);
        setOriginalAssistantName(data.assistantName);
        setOriginalSystemPrompt(data.systemPrompt);
      } catch (error) {
        console.error("Error fetching assistant data:", error);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    return systemPrompt !== originalSystemPrompt || assistantName !== originalAssistantName;
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle file selection
  const handleSelectFile = (id) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  // Handle select all files
  const handleSelectAllFiles = (event) => {
    if (event.target.checked) {
      setSelectedFiles(filesList.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  // Handle upload files (toggle between empty and files view for demo)
  const handleUploadFiles = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileSelection = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload the files to your backend
      console.log("Files selected:", files);
      
      // Define supported file extensions
      const supportedExtensions = ['pdf', 'doc', 'docx', 'txt', 'md', 'csv', 'xlsx', 'xls', 'js', 'py', 'java', 'html', 'css', 'php'];
      
      // Filter out unsupported files
      const unsupportedFilesList = [];
      const supportedFiles = Array.from(files).filter(file => {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const isSupported = supportedExtensions.includes(fileExtension);
        if (!isSupported) {
          unsupportedFilesList.push(file.name);
        }
        return isSupported;
      });
      
      // If there are unsupported files, show error modal
      if (unsupportedFilesList.length > 0) {
        setUnsupportedFiles(unsupportedFilesList);
        setFormatErrorModalOpen(true);
        
        // If there are no supported files, exit early
        if (supportedFiles.length === 0) {
          event.target.value = '';
          return;
        }
      }
      
      // Create new file entries for the supported files
      const newFiles = supportedFiles.map((file, index) => {
        // Get file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        // Determine file type for icon
        let fileType = 'default';
        if (fileExtension === 'pdf') fileType = 'pdf';
        else if (['doc', 'docx'].includes(fileExtension)) fileType = 'doc';
        else if (['csv', 'xlsx', 'xls'].includes(fileExtension)) fileType = 'csv';
        else if (['js', 'py', 'java', 'html', 'css', 'php'].includes(fileExtension)) fileType = 'code';
        else if (['md', 'txt'].includes(fileExtension)) fileType = 'md';
        
        // Format file size
        const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(1);
        
        // Get current date
        const today = new Date();
        const dateAdded = today.toISOString().split('T')[0];
        
        // Generate a unique ID
        const newId = filesList.length > 0 ? Math.max(...filesList.map(f => f.id)) + 1 + index : 1 + index;
        
        return {
          id: newId,
          name: file.name,
          type: fileType,
          size: `${fileSizeInMB} MB`,
          dateAdded: dateAdded,
          originalFile: file // Store the original file object if needed
        };
      });
      
      // Add new files to the list if there are any supported files
      if (newFiles.length > 0) {
        setFilesList(prevFiles => [...prevFiles, ...newFiles]);
        
        // Ensure files view is shown
        setHasFiles(true);
        
        // Show success message
        setSnackbarMessage(`${newFiles.length} file(s) uploaded successfully`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
      
      // Reset the file input so the same file can be selected again if needed
      event.target.value = '';
    }
  };

  // Handle delete selected files
  const handleDeleteSelected = () => {
    // In a real app, you would delete the files from your backend
    
    // Store the count of files being deleted for the message
    const deletedCount = selectedFiles.length;
    
    // Remove selected files from the filesList
    setFilesList(prevFiles => prevFiles.filter(file => !selectedFiles.includes(file.id)));
    
    // Clear selection
    setSelectedFiles([]);
    
    // If all files are deleted, show empty state
    if (selectedFiles.length === filesList.length) {
      setHasFiles(false);
    }
    
    // Close the delete confirmation modal
    setDeleteModalOpen(false);
    
    // Show success message
    setSnackbarMessage(`${deletedCount} file(s) deleted successfully`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };
  
  // Handle opening the save confirmation modal
  const handleOpenSaveModal = () => {
    // Only show the confirmation dialog if there are unsaved changes
    if (hasUnsavedChanges()) {
      setSaveModalOpen(true);
    } else {
      // If no changes, just show a message
      setSnackbarMessage('No changes to save');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }
  };
  
  // Handle closing the save confirmation modal
  const handleCloseSaveModal = () => {
    setSaveModalOpen(false);
  };
  
  // Handle opening the cancel confirmation modal
  const handleOpenCancelModal = () => {
    // Only show the confirmation dialog if there are unsaved changes
    if (hasUnsavedChanges()) {
      setCancelModalOpen(true);
    } else {
      // If no changes, just show a message
      setSnackbarMessage('No unsaved changes found.');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }
  };
  
  // Handle closing the cancel confirmation modal
  const handleCloseCancelModal = () => {
    setCancelModalOpen(false);
  };
  
  // Handle canceling changes
  const handleCancelChanges = () => {
    // Reset form fields to their original values
    setSystemPrompt(originalSystemPrompt);
    setAssistantName(originalAssistantName);
    
    console.log("Canceling changes...");
    console.log("Reverting to original system prompt:", originalSystemPrompt);
    console.log("Reverting to original assistant name:", originalAssistantName);
    
    // Close the modal
    setCancelModalOpen(false);
    
    // Show info message in snackbar
    setSnackbarMessage('Changes discarded. Configuration reverted to last saved state.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };
  
  // Handle closing the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  // Handle saving the configuration
  const handleSaveConfiguration = () => {
    // Save the current state as the original state
    setOriginalSystemPrompt(systemPrompt);
    setOriginalAssistantName(assistantName);
    
    // In a real app, you would save the configuration to your backend
    console.log("Saving configuration...");
    console.log("Assistant Name:", assistantName);
    console.log("System Prompt:", systemPrompt);
    
    // Close the modal
    setSaveModalOpen(false);
    
    // Show success message in snackbar
    setSnackbarMessage('Assistant configuration saved successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ p: 3, mt: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, ml: 1.2 }}>
        <SmartToyIcon color="primary" sx={{ width: 40, height: 40, mr: 2, mb: 2 }} />
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Manage assistant
        </Typography>
      </Box>
      
      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="General" id="assistant-tab-0" aria-controls="assistant-tabpanel-0" />
          <Tab label="Knowledge" id="assistant-tab-1" aria-controls="assistant-tabpanel-1" />
        </Tabs>
        
        {/* Instructions Tab - General */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TuneIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h4">
                General
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Set up your AI assistant's behavior, personality, and capabilities
            </Typography>
          </Box>
          
          {/* Assistant Name Field */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Assistant Name</Typography>
            <TextField
              fullWidth
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
              disabled
              variant="outlined"
              label="Assistant Name"
              size="small"
              margin="dense"
              sx={{ maxWidth: '400px' }}
            />
          </Box>
          
          <Grid container spacing={3}>
            {/* System Prompt */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">System Instructions</Typography>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={12}
                variant="outlined"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter instructions for your AI assistant..."
                InputProps={{
                  style: { fontFamily: '"Roboto Mono", monospace' }
                }}
                helperText={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>Define your assistant's personality, knowledge, and behavior guidelines</span>
                    <span>{systemPrompt.length} characters</span>
                  </Box>
                }
              />
            </Grid>
          </Grid>
          
          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ mr: 2 }}
              onClick={handleOpenCancelModal}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />}
              size="large"
              onClick={handleOpenSaveModal}
              disabled={!hasUnsavedChanges()}
            >
              Save Configuration
            </Button>
          </Box>
        </TabPanel>
        
        {/* Knowledge Tab */}
        <TabPanel value={tabValue} index={1}>
          {/* Knowledge Base Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <StorageIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h4">
                Knowledge Base
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Manage the files that power your AI assistant's knowledge
            </Typography>
          </Box>
          
          {hasFiles ? (
            <>
              {/* Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Your Files ({filesList.length})
                </Typography>
                <Box>
                  <Button 
                    variant="outlined" 
                    startIcon={<DeleteIcon />} 
                    sx={{ 
                      mr: 1,
                      transition: 'none'
                    }}
                    disabled={selectedFiles.length === 0}
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    Delete
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<UploadFileIcon />}
                    onClick={handleUploadFiles}
                  >
                    Upload Files
                  </Button>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileSelection}
                    multiple
                  />
                </Box>
              </Box>
              
              {/* Files Table */}
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selectedFiles.length > 0 && selectedFiles.length < filesList.length}
                          checked={selectedFiles.length === filesList.length}
                          onChange={handleSelectAllFiles}
                        />
                      </TableCell>
                      <TableCell>File</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Uploaded Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filesList.map((file) => (
                      <TableRow 
                        key={file.id}
                        selected={selectedFiles.includes(file.id)}
                        hover
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleSelectFile(file.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getFileIcon(file.type)}
                            <Typography sx={{ ml: 1 }}>{file.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.dateAdded}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            /* Empty State */
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                textAlign: 'center'
              }}
            >
              <StorageIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No files in your knowledge base
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
                Upload files to enhance your AI assistant's knowledge. Your assistant will be able to reference information from these files when responding to queries.
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<UploadFileIcon />}
                onClick={handleUploadFiles}
                size="large"
              >
                Upload Your First File
              </Button>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileSelection}
                multiple
              />
            </Box>
          )}
          
          {/* Information Panel */}
          <Paper 
            variant="outlined" 
            sx={{ 
              mt: 4, 
              p: 2, 
              bgcolor: 'action.hover',
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            <InfoOutlinedIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                How the knowledge base works
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Files you upload are processed and stored in a vector database. When users ask questions, your AI assistant can reference information from these files to provide more accurate and relevant responses. Supported file formats include PDF, DOCX, TXT, MD, and CSV.
              </Typography>
            </Box>
          </Paper>
        </TabPanel>
      </Paper>
      
      {/* Save Confirmation Modal */}
      <Dialog
        open={saveModalOpen}
        onClose={handleCloseSaveModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Save changes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you ready to save? This will immediately apply these changes to your assistant, and will affect how it responds to user queries.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveModal}>Cancel</Button>
          <Button onClick={handleSaveConfiguration} variant="contained" color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Cancel Confirmation Modal */}
      <Dialog
        open={cancelModalOpen}
        onClose={handleCloseCancelModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel changes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will result in the loss of any changes you have made.
            Your configuration will revert to the last saved state.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelModal}>Cancel</Button>
          <Button onClick={handleCancelChanges} variant="contained" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedFiles.length === 1 
              ? "Are you sure you want to delete the selected file? This action cannot be undone."
              : `Are you sure you want to delete ${selectedFiles.length} selected files? This action cannot be undone.`
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteSelected} variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* File Format Error Modal */}
      <Dialog
        open={formatErrorModalOpen}
        onClose={() => setFormatErrorModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Unsupported File Format"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {unsupportedFiles.length === 1 
              ? `The file "${unsupportedFiles[0]}" is in an unsupported format.` 
              : `The following files are in unsupported formats: ${unsupportedFiles.join(', ')}`
            }
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            Supported formats include:
          </DialogContentText>
          <ul style={{ marginTop: '8px' }}>
            <li>Documents: PDF, DOC, DOCX, TXT, MD</li>
            <li>Data: CSV, XLS, XLSX</li>
            <li>Code: JS, PY, JAVA, HTML, CSS, PHP</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormatErrorModalOpen(false)} variant="contained" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ '& .MuiPaper-root': { borderRadius: '8px' } }}
      >
        <Alert 
          severity={snackbarSeverity} 
          variant="standard" 
          sx={{ 
            width: '100%', 
            bgcolor: 'white', 
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageAssistant;
