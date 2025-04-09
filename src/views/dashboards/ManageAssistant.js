import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
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
import SaveIcon from '@mui/icons-material/Save';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    case 'pdf': return <PictureAsPdfIcon sx={{ color: '#e53935' }} />;
    case 'doc': return <DescriptionIcon sx={{ color: '#1976d2' }} />;
    case 'csv': return <GridOnIcon sx={{ color: '#43a047' }} />;
    case 'code': return <CodeIcon sx={{ color: '#ffa000' }} />;
    case 'md': return <TextSnippetIcon sx={{ color: '#7e57c2' }} />;
    default: return <DescriptionIcon />;
  }
};

const ManageAssistant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const assistantId = queryParams.get('id');

  const [tabValue, setTabValue] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hasFiles, setHasFiles] = useState(true);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formatErrorModalOpen, setFormatErrorModalOpen] = useState(false);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fileInputRef = useRef(null);

  const [systemPrompt, setSystemPrompt] = useState(
    "You are an AI assistant that helps users with their questions and tasks. Be helpful, concise, and accurate in your responses. When you don't know something, admit it rather than making up information."
  );
  const [assistantName, setAssistantName] = useState("");
  const [originalSystemPrompt, setOriginalSystemPrompt] = useState(systemPrompt);
  const [originalAssistantName, setOriginalAssistantName] = useState("");

  useEffect(() => {
    if (!assistantId) {
      navigate('/app/dashboards/assistants');
      return;
    }

    const fetchData = async () => {
      let data;
      switch(assistantId) {
        case 'new':
          data = {
            assistantName: "",
            systemPrompt: "You are an AI assistant. Help users with their questions and tasks."
          };
          break;
        case 'customer-support':
          data = {
            assistantName: "Customer Support Assistant",
            systemPrompt: "You are a customer support assistant. Help users with their questions about our products and services..."
          };
          break;
        case 'sales':
          data = {
            assistantName: "Sales Assistant",
            systemPrompt: "You are a sales assistant. Help potential customers understand our products, pricing..."
          };
          break;
        case 'technical-docs':
          data = {
            assistantName: "Technical Documentation Assistant",
            systemPrompt: "You are a technical documentation assistant. Help developers understand our API and specs..."
          };
          break;
        default:
          console.error("Unknown assistant ID:", assistantId);
          navigate('/app/dashboards/assistants');
          return;
      }

      setAssistantName(data.assistantName);
      setSystemPrompt(data.systemPrompt);
      setOriginalAssistantName(data.assistantName);
      setOriginalSystemPrompt(data.systemPrompt);
    };

    fetchData();
  }, [assistantId, navigate]);

  const hasUnsavedChanges = () => {
    return systemPrompt !== originalSystemPrompt || assistantName !== originalAssistantName;
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSelectFile = (id) => {
    setSelectedFiles(prev =>
      prev.includes(id) ? prev.filter(fileId => fileId !== id) : [...prev, id]
    );
  };

  const handleSelectAllFiles = (event) => {
    setSelectedFiles(event.target.checked ? sampleFiles.map(f => f.id) : []);
  };

  const handleUploadFiles = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileSelection = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Files selected:", files);
      setHasFiles(true);
      setSnackbarMessage(`${files.length} file(s) uploaded successfully`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      event.target.value = '';
    }
  };

  const handleDeleteSelected = () => {
    setDeleteModalOpen(false);
    setSelectedFiles([]);
    if (selectedFiles.length === sampleFiles.length) {
      setHasFiles(false);
    }
    setSnackbarMessage(`${selectedFiles.length} file(s) deleted successfully`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleOpenSaveModal = () => setSaveModalOpen(true);
  const handleCloseSaveModal = () => setSaveModalOpen(false);

  const handleOpenCancelModal = () => {
    hasUnsavedChanges() ? setCancelModalOpen(true) : navigate('/app/dashboards/assistants');
  };
  const handleCloseCancelModal = () => setCancelModalOpen(false);

  const handleDiscardChanges = () => {
    setAssistantName(originalAssistantName);
    setSystemPrompt(originalSystemPrompt);
    setCancelModalOpen(false);
    setSnackbarMessage('Changes discarded');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
    navigate('/app/dashboards/assistants');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason !== 'clickaway') setSnackbarOpen(false);
  };

  const handleSaveConfiguration = () => {
    setOriginalSystemPrompt(systemPrompt);
    setOriginalAssistantName(assistantName);
    setSaveModalOpen(false);

    if (assistantId === 'new') {
      const newAssistantId = 'custom-' + Date.now();
      const newAssistant = {
        id: newAssistantId,
        name: assistantName || 'New Assistant',
        model: 'GPT-3.5',
        status: 'Active',
        created: new Date().toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
        })
      };

      try {
        const existing = localStorage.getItem('customAssistants');
        const parsed = existing ? JSON.parse(existing) : [];
        localStorage.setItem('customAssistants', JSON.stringify([...parsed, newAssistant]));
        window.dispatchEvent(new CustomEvent('newAssistantCreated', { detail: newAssistant }));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }

      setSnackbarMessage('New assistant created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/app/dashboards/assistants'), 1500);
    } else {
      setSnackbarMessage('Assistant configuration saved successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  // The rest of the return JSX stays the same (UI code you provided)

  return (
    <Box sx={{ p: 3, mt: 3 }}>
      {/* ... full return JSX as in your original file, no need to re-copy it here ... */}
    </Box>
  );
};

export default ManageAssistant;
