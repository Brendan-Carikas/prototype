import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  TextField,
  Menu,
  MenuItem,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatIcon from '@mui/icons-material/Chat';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const ConversationsTable = ({ sx }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedConversations, setSelectedConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [customDateDialog, setCustomDateDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const conversations = [
    { id: 'conv-001', customerName: 'Guest', time: 'Jan 27, 2025, 8:30 AM', phoneNumber: '+44 7700 900001', platform: 'WhatsApp' },
    { id: 'conv-002', customerName: 'Guest', time: 'Jan 26, 2025, 7:15 AM', phoneNumber: '+44 7700 900002', platform: 'WhatsApp' },
    { id: 'conv-003', customerName: 'Guest', time: 'Jan 25, 2025, 6:45 AM', phoneNumber: '+44 7700 900003', platform: 'WhatsApp' },
    { id: 'conv-004', customerName: 'Guest', time: 'Jan 24, 2025, 5:20 AM', phoneNumber: '+44 7700 900004', platform: 'WhatsApp' },
    { id: 'conv-005', customerName: 'Guest', time: 'Jan 23, 2025, 4:10 AM', phoneNumber: '+44 7700 900005', platform: 'WhatsApp' },
    { id: 'conv-005', customerName: 'Guest', time: 'Jan 23, 2025, 4:00 AM', phoneNumber: '+44 7700 900005', platform: 'WhatsApp' },
    { id: 'conv-006', customerName: 'Guest', time: 'Jan 22, 2025, 2:30 AM', phoneNumber: '+44 7700 900006', platform: 'WhatsApp' },
    { id: 'conv-007', customerName: 'Guest', time: 'Jan 21, 2025, 1:05 AM', phoneNumber: '+44 7700 900007', platform: 'WhatsApp' },
    { id: 'conv-008', customerName: 'Guest', time: 'Jan 20, 2025, 11:30 PM', phoneNumber: '+44 7700 900008', platform: 'WhatsApp' },
    { id: 'conv-009', customerName: 'Guest', time: 'Jan 19, 2025, 10:00 PM', phoneNumber: '+44 7700 900009', platform: 'WhatsApp' },
    { id: 'conv-010', customerName: 'Guest', time: 'Jan 18, 2025, 8:30 PM', phoneNumber: '+44 7700 900010', platform: 'WhatsApp' },
    { id: 'conv-011', customerName: 'Guest', time: 'Jan 17, 2025, 7:05 PM', phoneNumber: '+44 7700 900011', platform: 'WhatsApp' },
    { id: 'conv-012', customerName: 'Guest', time: 'Jan 16, 2025, 5:30 PM', phoneNumber: '+44 7700 900012', platform: 'WhatsApp' },
    { id: 'conv-013', customerName: 'Guest', time: 'Jan 15, 2025, 4:05 PM', phoneNumber: '+44 7700 900013', platform: 'WhatsApp' },
    { id: 'conv-014', customerName: 'Guest', time: 'Jan 14, 2025, 2:30 PM', phoneNumber: '+44 7700 900014', platform: 'WhatsApp' },
    { id: 'conv-015', customerName: 'Guest', time: 'Jan 13, 2025, 1:05 PM', phoneNumber: '+44 7700 900015', platform: 'WhatsApp' },
    { id: 'conv-016', customerName: 'Guest', time: 'Jan 12, 2025, 11:30 AM', phoneNumber: '+44 7700 900016', platform: 'WhatsApp' },
    { id: 'conv-017', customerName: 'Guest', time: 'Jan 11, 2025, 10:00 AM', phoneNumber: '+44 7700 900017', platform: 'WhatsApp' },
    { id: 'conv-018', customerName: 'Guest', time: 'Jan 10, 2025, 8:30 AM', phoneNumber: '+44 7700 900018', platform: 'WhatsApp' },
    { id: 'conv-019', customerName: 'Guest', time: 'Jan 9, 2025, 7:05 AM', phoneNumber: '+44 7700 900019', platform: 'WhatsApp' },
    { id: 'conv-020', customerName: 'Guest', time: 'Jan 8, 2025, 5:30 AM', phoneNumber: '+44 7700 900020', platform: 'WhatsApp' },
    { id: 'conv-021', customerName: 'Guest', time: 'Jan 7, 2025, 4:05 AM', phoneNumber: '+44 7700 900021', platform: 'WhatsApp' },
    { id: 'conv-022', customerName: 'Guest', time: 'Jan 6, 2025, 2:30 AM', phoneNumber: '+44 7700 900022', platform: 'WhatsApp' },
    { id: 'conv-023', customerName: 'Guest', time: 'Jan 5, 2025, 1:05 AM', phoneNumber: '+44 7700 900023', platform: 'WhatsApp' },
    { id: 'conv-024', customerName: 'Guest', time: 'Jan 4, 2025, 11:30 PM', phoneNumber: '+44 7700 900024', platform: 'WhatsApp' },
    
  ];

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedConversations(conversations.map(conv => conv.id));
    } else {
      setSelectedConversations([]);
    }
  };

  const handleSelectConversation = (id) => {
    const newSelected = selectedConversations.includes(id)
      ? selectedConversations.filter(convId => convId !== id)
      : [...selectedConversations, id];
    setSelectedConversations(newSelected);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterAnchorEl(null);
    if (filter === 'custom') {
      setCustomDateDialog(true);
    }
    setPage(0);
  };

  const handleCustomDateConfirm = () => {
    setCustomDateDialog(false);
  };

  const handleCustomDateCancel = () => {
    setCustomDateDialog(false);
    setSelectedFilter('all');
    setStartDate(null);
    setEndDate(null);
    setPage(0);
  };

  const getFilteredByDate = (conversations) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    switch (selectedFilter) {
      case 'today':
        return conversations.filter(conv => {
          const convDate = new Date(conv.time);
          return convDate >= today;
        });
      case '7d':
        return conversations.filter(conv => {
          const convDate = new Date(conv.time);
          return convDate >= sevenDaysAgo;
        });
      case '30d':
        return conversations.filter(conv => {
          const convDate = new Date(conv.time);
          return convDate >= thirtyDaysAgo;
        });
      case 'custom':
        if (!startDate || !endDate) return conversations;
        return conversations.filter(conv => {
          const convDate = new Date(conv.time);
          return convDate >= startDate && convDate <= endDate;
        });
      default:
        return conversations;
    }
  };

  const filteredConversations = getFilteredByDate(conversations).filter(conversation => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      conversation.id.toLowerCase().includes(searchLower) ||
      conversation.customerName.toLowerCase().includes(searchLower) ||
      conversation.phoneNumber.toLowerCase().includes(searchLower) ||
      conversation.platform.toLowerCase().includes(searchLower)
    );
  });

  const handleRowClick = (conversationId) => {
    navigate(`/app/settings/conversations/${conversationId}`);
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <ChatIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h4">Conversations</Typography>
        </Box>

        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            sx={{ minWidth: '100px' }}
          >
            Filter
          </Button>
        </Box>

        <Box sx={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 2 }}>
                  <Checkbox
                    indeterminate={selectedConversations.length > 0 && selectedConversations.length < filteredConversations.length}
                    checked={selectedConversations.length === filteredConversations.length && filteredConversations.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Conversation ID</TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Phone Number</TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Customer Name</TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Created Date</TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Platform</TableCell>
                <TableCell align="right" sx={{ pr: 2, color: 'text.primary', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredConversations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((conversation) => (
                  <TableRow
                    key={conversation.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(conversation.id)}
                  >
                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()} sx={{ pl: 2 }}>
                      <Checkbox
                        checked={selectedConversations.includes(conversation.id)}
                        onChange={() => handleSelectConversation(conversation.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>{conversation.id}</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>{conversation.phoneNumber}</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>{conversation.customerName}</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>{conversation.time}</TableCell>
                    <TableCell sx={{ color: 'text.primary' }}>{conversation.platform}</TableCell>
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <IconButton>
                        <MoreHorizIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          }}>
            <Box sx={{ p: 2 }}>
              {selectedConversations.length > 0 && (
                <Typography variant="body2" color="text.primary">
                  {selectedConversations.length} {selectedConversations.length === 1 ? 'row' : 'rows'} selected
                </Typography>
              )}
            </Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredConversations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </Box>
        </Box>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={() => handleFilterSelect('all')}>All time</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('today')}>Today</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('7d')}>Last 7 days</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('30d')}>Last 30 days</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('custom')}>Custom range</MenuItem>
        </Menu>

        {/* Custom Date Range Dialog */}
        <Dialog open={customDateDialog} onClose={handleCustomDateCancel}>
          <DialogTitle>Select Date Range</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3} sx={{ mt: 2, minWidth: 300 }}>
                <TextField
                  type="date"
                  label="Start Date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />
                <TextField
                  type="date"
                  label="End Date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCustomDateCancel}>Cancel</Button>
            <Button onClick={handleCustomDateConfirm} variant="contained" color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ConversationsTable;
