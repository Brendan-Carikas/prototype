import React, { useState } from "react";
import { 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Card, 
  CardContent,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Switch,
  FormControlLabel,
  Divider
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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
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

const Assistant = () => {
  // State for tab value
  const [tabValue, setTabValue] = useState(0);
  // State for selected files
  const [selectedFiles, setSelectedFiles] = useState([]);
  // State to toggle between empty state and files view (for demo purposes)
  const [hasFiles, setHasFiles] = useState(true);
  
  // Instructions tab states
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an AI assistant that helps users with their questions and tasks. Be helpful, concise, and accurate in your responses. When you don't know something, admit it rather than making up information."
  );
  const [model, setModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [enableStreaming, setEnableStreaming] = useState(true);
  const [showSystemMessages, setShowSystemMessages] = useState(false);

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
      setSelectedFiles(sampleFiles.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  // Handle upload files (toggle between empty and files view for demo)
  const handleUploadFiles = () => {
    setHasFiles(true);
  };

  // Handle delete selected files
  const handleDeleteSelected = () => {
    // In a real app, you would delete the files from your backend
    // For this demo, we'll just clear the selection
    setSelectedFiles([]);
    if (selectedFiles.length === sampleFiles.length) {
      setHasFiles(false);
    }
  };

  return (
    <Box sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, ml: 1.2 }}>
        <SmartToyIcon color="primary" sx={{ width: 40, height: 40, mr: 2, mb: 2 }} />
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Assistant
        </Typography>
      </Box>
      
      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Instructions" id="assistant-tab-0" aria-controls="assistant-tabpanel-0" />
          <Tab label="Knowledge" id="assistant-tab-1" aria-controls="assistant-tabpanel-1" />
        </Tabs>
        
        {/* Instructions Tab - AI Assistant Configuration Studio */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TuneIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h4">
                AI Assistant Configuration Studio
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Set up and test your AI assistant's behavior, personality, and capabilities
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {/* Left Column - System Prompt (75% width) */}
            <Grid item xs={12} md={9}>
              <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">System Prompt</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {systemPrompt.length} characters
                  </Typography>
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
                  helperText="Define your assistant's personality, knowledge, and behavior guidelines"
                />
              </Paper>
            </Grid>
            
            {/* Right Column - Configuration Options (25% width) */}
            <Grid item xs={12} md={3}>
              <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                {/* Model Selection */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>Model</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="model-select-label">AI Model</InputLabel>
                    <Select
                      labelId="model-select-label"
                      value={model}
                      label="AI Model"
                      onChange={(e) => setModel(e.target.value)}
                    >
                      <MenuItem value="gpt-4o">GPT-4o</MenuItem>
                      <MenuItem value="gpt-4o-mini">GPT-4o Mini</MenuItem>
                      <MenuItem value="gpt-4.5-preview">GPT-4.5 Preview</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                {/* Generation Parameters */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>Generation Parameters</Typography>
                  
                  {/* Temperature */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">Temperature</Typography>
                      <Typography variant="body2" color="primary">{temperature.toFixed(1)}</Typography>
                    </Box>
                    <Slider
                      value={temperature}
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={(e, newValue) => setTemperature(newValue)}
                      valueLabelDisplay="auto"
                    />
                    <Typography variant="caption" color="text.secondary">
                      Controls randomness (lower = more deterministic)
                    </Typography>
                  </Box>
                  
                  {/* Top P */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">Top P</Typography>
                      <Typography variant="body2" color="primary">{topP.toFixed(1)}</Typography>
                    </Box>
                    <Slider
                      value={topP}
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={(e, newValue) => setTopP(newValue)}
                      valueLabelDisplay="auto"
                    />
                    <Typography variant="caption" color="text.secondary">
                      Controls diversity via nucleus sampling
                    </Typography>
                  </Box>
                  
                  {/* Max Tokens */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">Maximum Tokens</Typography>
                      <Typography variant="body2" color="primary">{maxTokens}</Typography>
                    </Box>
                    <Slider
                      value={maxTokens}
                      min={1}
                      max={4096}
                      step={1}
                      onChange={(e, newValue) => setMaxTokens(newValue)}
                      valueLabelDisplay="auto"
                    />
                    <Typography variant="caption" color="text.secondary">
                      Limits response length
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                {/* Additional Options */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>Additional Options</Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={enableStreaming} 
                        onChange={(e) => setEnableStreaming(e.target.checked)} 
                      />
                    }
                    label="Enable Streaming"
                  />
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 4, mt: -1, mb: 2 }}>
                    See responses word by word as they're generated
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={showSystemMessages} 
                        onChange={(e) => setShowSystemMessages(e.target.checked)} 
                      />
                    }
                    label="Show System Messages"
                  />
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                    Display system instructions in the chat interface
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />}
              size="large"
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
                <Typography variant="body1">
                  Your Files ({sampleFiles.length})
                </Typography>
                <Box>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<DeleteIcon />} 
                    sx={{ mr: 1 }}
                    disabled={selectedFiles.length === 0}
                    onClick={handleDeleteSelected}
                  >
                    Delete Selected
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<UploadFileIcon />}
                    onClick={handleUploadFiles}
                  >
                    Upload Files
                  </Button>
                </Box>
              </Box>
              
              {/* Files Table */}
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selectedFiles.length > 0 && selectedFiles.length < sampleFiles.length}
                          checked={selectedFiles.length === sampleFiles.length}
                          onChange={handleSelectAllFiles}
                        />
                      </TableCell>
                      <TableCell>File</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Date Added</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sampleFiles.map((file) => (
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
    </Box>
  );
};

export default Assistant;
