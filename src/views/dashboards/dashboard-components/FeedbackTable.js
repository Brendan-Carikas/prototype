import React, { useState, useRef } from 'react';
import {
  Box,
  Table,
  TableBody,
  FormLabel,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  InputAdornment,
  Radio,
  Checkbox,
  Switch,
  FormControlLabel,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
// Removed unused import: MoreHorizIcon
// Removed unused import: ChatIcon
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
// Removed unused import: InfoOutlined
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
// Removed unused import: useNavigate

const FeedbackTable = ({ sx }) => {
  // Removed unused navigate variable
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSources, setSelectedSources] = useState(['all']);
  const [selectedFeedbackRatings, setSelectedFeedbackRatings] = useState(['all']);
  const [selectedFeedbackCategories, setSelectedFeedbackCategories] = useState(['all']);
  const [showFeedback, setShowFeedback] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [customDateDialog, setCustomDateDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // Removed unused orderBy and setOrderBy variables
  const [order, setOrder] = useState('desc');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [focusedRowId, setFocusedRowId] = useState(null);
  const [focusedTimeFilter, setFocusedTimeFilter] = useState(null);
  const [focusedSource, setFocusedSource] = useState(null);
  const [focusedFeedbackRating, setFocusedFeedbackRating] = useState(null);
  const [focusedFeedbackCategory, setFocusedFeedbackCategory] = useState(null);
  const timeFilterRef = useRef(null);
  const sourceFilterRef = useRef(null);
  const feedbackRatingRef = useRef(null);
  const feedbackCategoryRef = useRef(null);

  const conversations = [
    { 
      id: 'conv-001-1', 
      time: '29-01-25 10:15', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "Hi, I need to check my order status for #ORD-456789",
      response: "Hello! I'll help you check that order. I can see that order #ORD-456789 is currently scheduled for delivery tomorrow between 2-4 PM. Would you like me to send you the tracking details?",
      feedback: 'positive',
      feedbackCategory: 'helpful_resolution',
      userComment: "The assistant was very helpful in checking my order status."
    },
    { 
      id: 'conv-002-1', 
      time: '29-01-25 10:16', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I'm getting an error when trying to access the CRM system. It says 'Authentication Failed' but I'm sure my password is correct.",
      response: "Hi Sarah, I'll help you troubleshoot this. First, could you confirm when you last successfully accessed the CRM? Also, have you recently changed your password or received any password reset emails?",
      feedback: 'negative',
      feedbackCategory: 'unhelpful_resolution',
      userComment: "The troubleshooting steps didn't solve my issue."
    },
    { 
      id: 'conv-003-1', 
      time: '29-01-25 10:17', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Hello, I'm trying to find the sizing guide for your winter collection.",
      response: "I'll help you find our sizing guide. Are you looking for men's, women's, or children's sizing information?",
      feedback: 'positive',
      feedbackCategory: 'fast_and_efficient',
      userComment: "Quick response and helpful guidance."
    },
    { 
      id: 'conv-001-2', 
      time: '29-01-25 10:18', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "Actually, I won't be home during that time. Can I change the delivery slot?",
      response: "Of course! I can help you reschedule the delivery. Let me check the available slots for the rest of the week. We have the following options: Thursday 9-11 AM, Thursday 1-3 PM, or Friday 10-12 PM. Which would work better for you?"
    },
    { 
      id: 'conv-003-2', 
      time: '29-01-25 10:19', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Women's sizing please.",
      response: "Here's our women's sizing guide: [Link]. It includes detailed measurements for all items in our winter collection. Would you like me to explain any specific measurements?",
      feedback: 'negative',
      feedbackCategory: 'technical_issues',
      userComment: "The link provided doesn't work."
    },
    { 
      id: 'conv-002-2', 
      time: '29-01-25 10:20', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I was able to access it yesterday afternoon, and I haven't changed my password recently.",
      response: "Thank you for confirming. I can see there were multiple failed login attempts from a different IP address this morning, which triggered our security protocol. Your account was temporarily locked as a precaution. I can help you unlock it and set up a new password. Would you like to proceed with that?"
    },
    { 
      id: 'conv-004-1', 
      time: '29-01-25 10:21', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900456',
      query: "Hi, my package was supposed to arrive yesterday but it's still not here. Order #DEF-789",
      response: "I apologize for the delay. Let me check the status of your order #DEF-789. I can see there was a delay at our distribution center. Would you like me to expedite the delivery?"
    },
    { 
      id: 'conv-001-3', 
      time: '29-01-25 10:22', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "Thursday 9-11 AM would be perfect.",
      response: "Great! I've rescheduled your delivery for Thursday between 9-11 AM. You'll receive a confirmation email shortly with the updated tracking information. Is there anything else you need help with?",
      feedback: 'positive',
      feedbackCategory: 'helpful_resolution',
      userComment: "Rescheduling was quick and easy."
    },
    { 
      id: 'conv-003-3', 
      time: '29-01-25 10:23', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, could you explain the difference between your regular and relaxed fit?",
      response: "Our regular fit is tailored to be slightly fitted while maintaining comfort, with measurements of [measurements]. The relaxed fit is more generous, designed for a looser feel, with measurements of [measurements]. Which style are you interested in?",
      feedback: 'positive',
      feedbackCategory: 'knowledgeable_support',
      userComment: "Very detailed explanation of the different fits."
    },
    { 
      id: 'conv-004-2', 
      time: '29-01-25 10:24', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900456',
      query: "Yes please, I really need it by tomorrow.",
      response: "I've arranged for expedited delivery. Your package will be delivered tomorrow before noon. I've also added a £10 credit to your account for the inconvenience. You'll receive a text with the new tracking details shortly.",
      feedback: 'positive',
      feedbackCategory: 'fast_and_efficient',
      userComment: "Excellent service, problem solved quickly."
    },
    { 
      id: 'conv-002-3', 
      time: '29-01-25 10:25', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "Yes, please. Should I also enable two-factor authentication?",
      response: "That's a great idea! I'll guide you through both processes. First, click the reset link I'm sending now to set your new password. Once that's done, I'll help you set up 2FA using our authenticator app."
    },
    { 
      id: 'conv-003-4', 
      time: '29-01-25 10:26', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "I think I'll go with the regular fit. Do you have the black wool sweater in stock in size M?",
      response: "Let me check our inventory. Yes, we have the black wool sweater in regular fit, size M in stock! Would you like me to add it to your cart or do you have any other questions about the item?"
    },
    {
      id: 'conv-005-1',
      time: '29-01-25 10:27',
      source: 'Teams',
      identifier: 'mark.wilson@company.com',
      query: "Hi, I need to schedule an urgent meeting with the development team for tomorrow.",
      response: "I'll help you schedule that meeting. What time would work best for you tomorrow, and how long should I block for the meeting?",
      feedback: 'negative',
      feedbackCategory: 'slow_and_inefficient',
      userComment: "Too many questions, should have just checked the calendar."
    },
    { 
      id: 'conv-002-4', 
      time: '29-01-25 10:28', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I've reset my password. What's next for setting up 2FA?",
      response: "Great! Now let's set up 2FA. First, download our authenticator app from the app store. Once installed, open it and click 'Add Account'. I'll send you a QR code to scan in my next message. Let me know when you're ready."
    },
    { 
      id: 'conv-006-1', 
      time: '29-01-25 10:29', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900789',
      query: "Do you have any appointments available for a hair consultation this week?",
      response: "I'll check our salon's availability. We have openings on Wednesday at 2 PM, Thursday at 11 AM, and Friday at 3 PM. Would any of these times work for you?",
      feedback: 'negative',
      feedbackCategory: 'lack_of_expertise',
      userComment: "Didn't ask what type of consultation I needed."
    },
    { 
      id: 'conv-003-5', 
      time: '29-01-25 10:30', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, please add it to my cart. Can you also check if you have matching wool gloves?",
      response: "I've added the black wool sweater to your cart. For matching gloves, we have wool-blend gloves in black available in S/M and L/XL sizes. Would you like to see the details?",
      feedback: 'positive',
      feedbackCategory: 'chatbot_was_intelligent',
      userComment: "The chatbot understood exactly what I needed."
    },
    { 
      id: 'conv-005-2', 
      time: '29-01-25 10:31', 
      source: 'Teams', 
      identifier: 'mark.wilson@company.com',
      query: "10 AM would be ideal, and we'll need about 90 minutes to cover everything.",
      response: "I've checked the team's calendar. Most developers are available at 10 AM, but Alex has a conflict. Would 11 AM work instead? I can block 90 minutes from 11 AM to 12:30 PM."
    },
    { 
      id: 'conv-006-2', 
      time: '29-01-25 10:32', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900789',
      query: "Thursday at 11 AM would be perfect. What information do you need from me?",
      response: "Great! I'll book that for you. I just need your full name and whether you've visited our salon before. Also, do you have any specific hair concerns you'd like to discuss during the consultation?"
    },
    { 
      id: 'conv-002-5', 
      time: '29-01-25 10:33', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I've downloaded the app and I'm ready for the QR code.",
      response: "Perfect! Here's your unique QR code: [QR Code Image]. Once you've scanned it, enter the 6-digit code from the app to complete the setup. This will ensure your account is secure with 2FA.",
      feedback: 'positive',
      feedbackCategory: 'easy_to_use',
      userComment: "Clear instructions made setup easy."
    },
    { 
      id: 'conv-003-6', 
      time: '29-01-25 10:34', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, please show me the gloves in S/M.",
      response: "Here are the details for our black wool-blend gloves in S/M: [Product Details]. They're priced at £25 and feature touchscreen-compatible fingertips. Would you like me to add these to your cart as well?"
    },
    { 
      id: 'conv-005-3', 
      time: '29-01-25 10:35', 
      source: 'Teams', 
      identifier: 'mark.wilson@company.com',
      query: "11 AM works. Could you send the meeting invite to the whole development team?",
      response: "I'll send out the calendar invite right away for tomorrow from 11 AM to 12:30 PM. I'll include all development team members and add the meeting link. Would you like me to add a specific agenda or meeting description?",
      feedback: 'negative',
      feedbackCategory: 'unhelpful_resolution',
      userComment: "Should have just sent the invite instead of asking more questions."
    },
    { 
      id: 'conv-006-3', 
      time: '29-01-25 10:36', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900789',
      query: "I'm Emma Thompson, first-time visitor. I'm interested in discussing hair coloring options.",
      response: "Thanks, Emma! I've booked your consultation for Thursday at 11 AM. Our color specialist, Sarah, will be available to discuss various coloring options with you. Would you like me to send you our pre-consultation questionnaire to help us better understand your hair history?",
      feedback: 'positive',
      feedbackCategory: 'friendly_tone',
      userComment: "Very friendly and helpful booking experience."
    },
    { 
      id: 'conv-002-6', 
      time: '29-01-25 10:37', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "Done! I've entered the code and 2FA is now set up.",
      response: "Excellent! Your account is now secured with 2FA. You'll need to enter a code from the authenticator app each time you log in. Remember to keep your backup codes safe - would you like me to send them to you now?",
      feedback: 'positive'
    },
    { 
      id: 'conv-003-7', 
      time: '29-01-25 10:38', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, please add the gloves too. That should be everything.",
      response: "I've added both the black wool sweater (M) and matching gloves (S/M) to your cart. Your total comes to £125. Would you like to proceed to checkout now, or do you have any questions about shipping or returns?",
      feedback: 'positive',
      feedbackCategory: 'helpful_resolution',
      userComment: "Completed my order quickly and offered additional help."
    },
  ];

  const sources = ['all', 'Teams', 'Website Chatbot', 'WhatsApp'];

  const feedbackRatings = ['all', 'positive', 'negative'];
  
  const feedbackCategories = {
    positive: ['all', 'fast_and_efficient', 'helpful_resolution', 'knowledgeable_support', 'friendly_tone', 'easy_to_use', 'chatbot_was_intelligent', 'other'],
    negative: ['all', 'slow_and_inefficient', 'unhelpful_resolution', 'lack_of_expertise', 'unfriendly_tone', 'technical_issues', 'chatbot_didnt_understand', 'other']
  };

  const timeFilters = [
    { value: 'all', label: 'All time' },
    { value: '30d', label: 'Last 30 days' },
    { value: '7d', label: 'Last 7 days' },
    { value: 'today', label: 'Today' },
    { value: 'custom', label: 'Custom range' },
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
    // Reset focused states when opening menu
    setFocusedTimeFilter(null);
    setFocusedSource(null);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
    // Reset focused states when closing menu
    setFocusedTimeFilter(null);
    setFocusedSource(null);
  };

  const handleTimeFilterKeyDown = (event, index) => {
    event.stopPropagation();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedTimeFilter((prev) => {
          const next = prev === null ? 0 : (prev + 1) % timeFilters.length;
          timeFilterRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedTimeFilter((prev) => {
          const next = prev === null ? timeFilters.length - 1 : (prev - 1 + timeFilters.length) % timeFilters.length;
          timeFilterRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'Tab':
        if (!event.shiftKey && index === timeFilters.length - 1) {
          event.preventDefault();
          sourceFilterRef.current?.children[0]?.focus();
          setFocusedSource(0);
        }
        break;
      default:
        // No action needed for other keys
        break;
    }
  };

  const handleSourceFilterKeyDown = (event, index) => {
    event.stopPropagation();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedSource((prev) => {
          const next = prev === null ? 0 : (prev + 1) % sources.length;
          sourceFilterRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedSource((prev) => {
          const next = prev === null ? sources.length - 1 : (prev - 1 + sources.length) % sources.length;
          sourceFilterRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'Tab':
        if (event.shiftKey && index === 0) {
          event.preventDefault();
          timeFilterRef.current?.children[timeFilters.length - 1]?.focus();
          setFocusedTimeFilter(timeFilters.length - 1);
        }
        break;
      default:
        // No action needed for other keys
        break;
    }
  };
  
  const handleFeedbackRatingKeyDown = (event, index) => {
    event.stopPropagation();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedFeedbackRating((prev) => {
          const next = prev === null ? 0 : (prev + 1) % feedbackRatings.length;
          feedbackRatingRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedFeedbackRating((prev) => {
          const next = prev === null ? feedbackRatings.length - 1 : (prev - 1 + feedbackRatings.length) % feedbackRatings.length;
          feedbackRatingRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'Tab':
        if (event.shiftKey && index === 0) {
          event.preventDefault();
          sourceFilterRef.current?.children[sources.length - 1]?.focus();
          setFocusedSource(sources.length - 1);
        }
        break;
      default:
        // No action needed for other keys
        break;
    }
  };
  
  const handleFeedbackCategoryKeyDown = (event, index, type) => {
    event.stopPropagation();
    const categories = feedbackCategories[type];
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedFeedbackCategory((prev) => {
          const next = prev === null ? 0 : (prev + 1) % categories.length;
          feedbackCategoryRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedFeedbackCategory((prev) => {
          const next = prev === null ? categories.length - 1 : (prev - 1 + categories.length) % categories.length;
          feedbackCategoryRef.current?.children[next]?.focus();
          return next;
        });
        break;
      case 'Tab':
        if (event.shiftKey && index === 0) {
          event.preventDefault();
          feedbackRatingRef.current?.children[feedbackRatings.length - 1]?.focus();
          setFocusedFeedbackRating(feedbackRatings.length - 1);
        }
        break;
      default:
        // No action needed for other keys
        break;
    }
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'custom') {
      setCustomDateDialog(true);
    }
  };

  const handleSourceSelect = (source) => {
    if (source === 'all') {
      setSelectedSources(['all']);
    } else {
      const newSources = selectedSources.filter(s => s !== 'all');
      if (selectedSources.includes(source)) {
        if (newSources.length === 1) {
          setSelectedSources(['all']);
        } else {
          setSelectedSources(newSources.filter(s => s !== source));
        }
      } else {
        setSelectedSources([...newSources, source]);
      }
    }
  };
  
  const handleFeedbackRatingSelect = (rating) => {
    if (rating === 'all') {
      setSelectedFeedbackRatings(['all']);
    } else {
      const newRatings = selectedFeedbackRatings.filter(r => r !== 'all');
      if (selectedFeedbackRatings.includes(rating)) {
        if (newRatings.length === 1) {
          setSelectedFeedbackRatings(['all']);
        } else {
          setSelectedFeedbackRatings(newRatings.filter(r => r !== rating));
        }
      } else {
        setSelectedFeedbackRatings([...newRatings, rating]);
      }
    }
  };
  
  const handleFeedbackCategorySelect = (category, type) => {
    if (category === 'all') {
      // Reset all categories of this type
      const newCategories = selectedFeedbackCategories.filter(c => 
        !feedbackCategories[type].includes(c)
      );
      setSelectedFeedbackCategories([...newCategories, 'all']);
    } else {
      const newCategories = selectedFeedbackCategories.filter(c => c !== 'all');
      if (selectedFeedbackCategories.includes(category)) {
        setSelectedFeedbackCategories(newCategories.filter(c => c !== category));
      } else {
        setSelectedFeedbackCategories([...newCategories, category]);
      }
    }
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

  const getFilteredConversations = () => {
    let filtered = [...conversations];

    // Apply date filter
    if (selectedFilter === 'custom' && startDate && endDate) {
      filtered = filtered.filter(conv => {
        const convDate = new Date(conv.time);
        return convDate >= startDate && convDate <= endDate;
      });
    }

    // Apply source filter
    if (!selectedSources.includes('all')) {
      filtered = filtered.filter(conv => selectedSources.includes(conv.source));
    }
    
    // Apply feedback rating filter
    if (!selectedFeedbackRatings.includes('all')) {
      filtered = filtered.filter(conv => 
        conv.feedback && selectedFeedbackRatings.includes(conv.feedback)
      );
    }
    
    // Apply feedback category filter
    if (!selectedFeedbackCategories.includes('all')) {
      filtered = filtered.filter(conv => 
        conv.feedbackCategory && selectedFeedbackCategories.includes(conv.feedbackCategory)
      );
    }

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(conv =>
        conv.identifier.toLowerCase().includes(searchTermLower) ||
        conv.query.toLowerCase().includes(searchTermLower) ||
        conv.response.toLowerCase().includes(searchTermLower) ||
        (conv.userComment && conv.userComment.toLowerCase().includes(searchTermLower))
      );
    }

    return filtered;
  };

  const sortedConversations = [...getFilteredConversations()].sort((a, b) => {
    const timeA = new Date(a.time.replace(/(\d{2})-(\d{2})-(\d{2})/, '20$3-$2-$1'));
    const timeB = new Date(b.time.replace(/(\d{2})-(\d{2})-(\d{2})/, '20$3-$2-$1'));
    return order === 'asc' ? timeA - timeB : timeB - timeA;
  });

  const handleRowClick = (id) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setFocusedRowId(id);
  };

  const handleSortRequest = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilter !== 'all') count++;
    if (!selectedSources.includes('all')) count++;
    if (!selectedFeedbackRatings.includes('all')) count++;
    if (!selectedFeedbackCategories.includes('all')) count++;
    return count;
  };

  const handleFilterReset = () => {
    setSelectedFilter('all');
    setSelectedSources(['all']);
    setSelectedFeedbackRatings(['all']);
    setSelectedFeedbackCategories(['all']);
    setStartDate(null);
    setEndDate(null);
  };

  const CollapsibleRow = ({ conversation }) => {
    const isExpanded = expandedRows.has(conversation.id);
    const isFocused = focusedRowId === conversation.id;

    return (
      <TableRow 
        hover 
        onClick={() => handleRowClick(conversation.id)}
        sx={{ 
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover',
          }
        }}
      >
        <TableCell padding="none" sx={{ width: '48px', verticalAlign: 'middle' }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(conversation.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleRowClick(conversation.id);
              }
            }}
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} conversation details`}
            autoFocus={isFocused}
          >
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {!showFeedback && (
          <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {conversation.time}
            </Typography>
          </TableCell>
        )}
        {!showFeedback && (
          <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {conversation.source}
            </Typography>
          </TableCell>
        )}
        {!showFeedback && (
          <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {conversation.identifier}
            </Typography>
          </TableCell>
        )}
        <TableCell 
          sx={{ 
            color: 'text.primary',
            width: showFeedback ? '20%' : '30%',
            transition: 'none',
            verticalAlign: 'middle'
          }}
        >
          <Typography 
            sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: {
                xs: isExpanded ? 'unset' : 3,
                sm: isExpanded ? 'unset' : 2
              },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.875rem',
              fontWeight: 500,
              ...((!isExpanded && conversation.query.length > 180) && {
                '&::after': {
                  content: '"..."',
                  display: 'inline',
                }
              })
            }}
          >
            {conversation.query}
          </Typography>
        </TableCell>
        <TableCell 
          sx={{ 
            color: 'text.primary',
            width: showFeedback ? '20%' : '30%',
            transition: 'none',
            verticalAlign: 'middle'
          }}
        >
          <Typography 
            sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: {
                xs: isExpanded ? 'unset' : 3,
                sm: isExpanded ? 'unset' : 2
              },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.875rem',
              fontWeight: 500,
              ...((!isExpanded && conversation.response.length > 180) && {
                '&::after': {
                  content: '"..."',
                  display: 'inline',
                }
              })
            }}
          >
            {conversation.response}
          </Typography>
        </TableCell>
        <TableCell sx={{ verticalAlign: 'middle', width: '150px' }}>
          {conversation.feedback && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
              {conversation.feedback === 'positive' ? (
                <>
                  <ThumbUpOutlinedIcon sx={{ color: 'success.main' }} />
                  <Typography sx={{ color: 'success.main', fontSize: '0.75rem', fontWeight: 500 }}>
                    Helpful
                  </Typography>
                </>
              ) : (
                <>
                  <ThumbDownOutlinedIcon sx={{ color: 'error.main' }} />
                  <Typography sx={{ color: 'error.main', fontSize: '0.75rem', fontWeight: 500 }}>
                    Not helpful
                  </Typography>
                </>
              )}
            </Box>
          )}
        </TableCell>
        {showFeedback && (
          <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap', width: '200px' }}>
            {conversation.feedbackCategory ? (
              <Chip 
                label={conversation.feedbackCategory.split('_').join(' ').replace(/^\w/, c => c.toUpperCase())}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ 
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }}
              />
            ) : (
              <Chip 
                label="None"
                size="small"
                variant="outlined"
                color="default"
                sx={{ 
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }}
              />
            )}
          </TableCell>
        )}
        {showFeedback && (
          <TableCell sx={{ verticalAlign: 'middle', width: '20%' }}>
            <Typography 
              sx={{ 
                display: '-webkit-box',
                WebkitLineClamp: {
                  xs: isExpanded ? 'unset' : 3,
                  sm: isExpanded ? 'unset' : 2
                },
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: '0.875rem',
                fontWeight: 500,
                ...((!isExpanded && conversation.userComment && conversation.userComment.length > 180) && {
                  '&::after': {
                    content: '"..."',
                    display: 'inline',
                  }
                })
              }}
            >
              {conversation.userComment || 'None'}
            </Typography>
          </TableCell>
        )}
      </TableRow>
    );
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormLabel htmlFor="search-conversations">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px' }}>
                    Search conversations by identifier, query or response
                  </Box>
                </Box>
              </FormLabel>
              <TextField
                id="search-conversations"
                size="small"
                placeholder="Search by identifier, query or response..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear search"
                        onClick={() => {
                          setSearchTerm('');
                          setPage(0);
                        }}
                        edge="end"
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              <Box sx={{ display: { xs: 'none', sm: 'block' }, display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showFeedback}
                      onChange={(e) => setShowFeedback(e.target.checked)}
                      name="feedbackToggle"
                      size="small"
                      color="primary"
                    
                    />
                  }
                  label="Include feedback"
                  sx={{ m: 0, '& .MuiFormControlLabel-label': { fontWeight: 'bold' } }}
                />
                <Button
                  variant="outlined"
                  onClick={handleFilterClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleFilterClick(e);
                    }
                  }}
                  startIcon={<FilterListIcon />}
                  aria-label={`Open filters${getActiveFilterCount() > 0 ? `. ${getActiveFilterCount()} active filters` : ''}`}
                  aria-haspopup="dialog"
                  aria-expanded={Boolean(filterAnchorEl)}
                  id="filter-button"
                >
                  Filter{getActiveFilterCount() > 0 ? ` (${getActiveFilterCount()})` : ''}
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <IconButton
                  onClick={handleFilterClick}
                  size="small"
                  aria-label={`Open filters${getActiveFilterCount() > 0 ? `. ${getActiveFilterCount()} active filters` : ''}`}
                  aria-haspopup="menu"
                  aria-expanded={Boolean(filterAnchorEl)}
                  sx={{ 
                    border: '1px solid rgba(0, 0, 0, 0.23)', 
                    borderRadius: 1,
                    position: 'relative'
                  }}
                >
                  <FilterListIcon />
                  {getActiveFilterCount() > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                      }}
                    >
                      {getActiveFilterCount()}
                    </Box>
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box sx={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="td" padding="none" sx={{ width: '48px', verticalAlign: 'middle' }} />
                  {!showFeedback && (
                    <TableCell 
                      sx={{ 
                        color: 'text.primary', 
                        fontWeight: 600, 
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        '&:focus': {
                          backgroundColor: 'action.hover',
                          outline: '2px solid',
                          outlineColor: 'primary.main',
                          outlineOffset: '-2px'
                        },
                        verticalAlign: 'middle'
                      }}
                      onClick={handleSortRequest}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          handleSortRequest();
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort by timeframe, currently sorted ${order === 'asc' ? 'ascending' : 'descending'}`}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        Timeframes
                        {order === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </Box>
                    </TableCell>
                  )}
                  {!showFeedback && (
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600, whiteSpace: 'nowrap', verticalAlign: 'middle' }}>Source</TableCell>
                  )}
                  {!showFeedback && (
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600, whiteSpace: 'nowrap', verticalAlign: 'middle' }}>User identifier</TableCell>
                  )}
                  <TableCell sx={{ color: 'text.primary', fontWeight: 600, verticalAlign: 'middle' }}>User query</TableCell>
                  <TableCell sx={{ color: 'text.primary', fontWeight: 600, verticalAlign: 'middle' }}>Assistant response</TableCell>
                  <TableCell sx={{ color: 'text.primary', fontWeight: 600, verticalAlign: 'middle', width: '150px', whiteSpace: 'nowrap' }}>Feedback rating</TableCell>
                  {showFeedback && (
                    <TableCell sx={{ color: 'text.primary', fontWeight: 600, verticalAlign: 'middle', whiteSpace: 'nowrap', width: '200px' }}>Feedback category</TableCell>
                  )}
                  {showFeedback && (
                    <TableCell sx={{ color: 'text.primary', fontWeight: 600, verticalAlign: 'middle' }}>User comment</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedConversations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((conversation) => (
                    <CollapsibleRow key={conversation.id} conversation={conversation} />
                  ))}
              </TableBody>
            </Table>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={sortedConversations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
                sx={{
                  '.MuiTablePagination-select': {
                    backgroundColor: 'background.paper'
                  },
                  '.MuiInputBase-root': {
                    backgroundColor: 'background.paper'
                  },
                  '.MuiSelect-select': {
                    backgroundColor: 'background.paper'
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={(event, reason) => {
          if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
            handleFilterClose();
          }
        }}
        role="dialog"
        aria-label="Filter options"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleFilterClose();
          } else if (e.key === 'Tab') {
            e.preventDefault();
            e.stopPropagation();
            const resetButton = document.querySelector('[role="dialog"] button:not([disabled])');
            const firstRadio = document.querySelector('[role="dialog"] [role="radio"]');
            
            if (!e.shiftKey) {
              if (document.activeElement === resetButton) {
                firstRadio?.focus();
              } else {
                (resetButton || firstRadio)?.focus();
              }
            } else {
              if (document.activeElement === firstRadio && resetButton) {
                resetButton.focus();
              } else {
                firstRadio?.focus();
              }
            }
          }
        }}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
          autoFocusItem: false,
          disableAutoFocusItem: true
        }}
        disableAutoFocusItem
        keepMounted
      >
        <Box sx={{ 
          minWidth: 200, 
          maxHeight: {
            xs: 'calc(100vh - 100px)',
            sm: '400px'
          },
          overflowY: 'auto'
        }}>
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" component="h2" sx={{ mb: 0.5 }} id="time-range-label">
                Time Range
              </Typography>
              <Button
                size="small"
                onClick={handleFilterReset}
                disabled={selectedFilter === 'all' && selectedSources.includes('all') && !startDate && !endDate}
                aria-label="Reset all filters"
              >
                Reset
              </Button>
            </Box>
            <Stack spacing={0} role="radiogroup" aria-labelledby="time-range-label" ref={timeFilterRef}>
              {timeFilters.map((filter, index) => (
                <MenuItem
                  key={filter.value}
                  onClick={() => handleFilterSelect(filter.value)}
                  selected={selectedFilter === filter.value}
                  dense
                  role="radio"
                  aria-checked={selectedFilter === filter.value}
                  tabIndex={focusedTimeFilter === index ? 0 : -1}
                  onKeyDown={(e) => {
                    handleTimeFilterKeyDown(e, index);
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleFilterSelect(filter.value);
                    }
                  }}
                  onFocus={() => setFocusedTimeFilter(index)}
                  sx={{ 
                    minHeight: '32px', 
                    py: 0.5, 
                    '&.Mui-selected': { backgroundColor: 'transparent' }, 
                    '&.Mui-selected:hover': { backgroundColor: 'action.hover' },
                    '&:focus': { backgroundColor: 'action.hover' }
                  }}
                >
                  <Radio 
                    checked={selectedFilter === filter.value}
                    size="small"
                    sx={{ mr: 1, p: 0.5 }}
                    inputProps={{
                      'aria-label': filter.label,
                      tabIndex: -1
                    }}
                  />
                  {filter.label}
                </MenuItem>
              ))}
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" component="h2" sx={{ mb: 0.5 }} id="source-filter-label">
              Source
            </Typography>
            <Stack spacing={0} role="group" aria-labelledby="source-filter-label" ref={sourceFilterRef}>
              {sources.map((source, index) => (
                <MenuItem
                  key={source}
                  onClick={() => handleSourceSelect(source)}
                  selected={selectedSources.includes(source)}
                  dense
                  tabIndex={focusedSource === index ? 0 : -1}
                  onKeyDown={(e) => {
                    handleSourceFilterKeyDown(e, index);
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSourceSelect(source);
                    }
                  }}
                  onFocus={() => setFocusedSource(index)}
                  sx={{ 
                    minHeight: '32px', 
                    py: 0.5, 
                    '&.Mui-selected': { backgroundColor: 'transparent' }, 
                    '&.Mui-selected:hover': { backgroundColor: 'action.hover' },
                    '&:focus': { backgroundColor: 'action.hover' }
                  }}
                >
                  <Checkbox 
                    checked={selectedSources.includes(source)}
                    size="small"
                    sx={{ mr: 1, p: 0.5 }}
                    inputProps={{
                      'aria-label': source === 'all' ? 'All Sources' : source,
                      tabIndex: -1
                    }}
                  />
                  {source === 'all' ? 'All Sources' : source}
                </MenuItem>
              ))}
            </Stack>
            
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" component="h2" sx={{ mb: 0.5 }} id="feedback-rating-label">
              Feedback Rating
            </Typography>
            <Stack spacing={0} role="group" aria-labelledby="feedback-rating-label" ref={feedbackRatingRef}>
              {feedbackRatings.map((rating, index) => (
                <MenuItem
                  key={rating}
                  onClick={() => handleFeedbackRatingSelect(rating)}
                  selected={selectedFeedbackRatings.includes(rating)}
                  dense
                  tabIndex={focusedFeedbackRating === index ? 0 : -1}
                  onKeyDown={(e) => {
                    handleFeedbackRatingKeyDown(e, index);
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleFeedbackRatingSelect(rating);
                    }
                  }}
                  onFocus={() => setFocusedFeedbackRating(index)}
                  sx={{ 
                    minHeight: '32px', 
                    py: 0.5, 
                    '&.Mui-selected': { backgroundColor: 'transparent' }, 
                    '&.Mui-selected:hover': { backgroundColor: 'action.hover' },
                    '&:focus': { backgroundColor: 'action.hover' }
                  }}
                >
                  <Checkbox 
                    checked={selectedFeedbackRatings.includes(rating)}
                    size="small"
                    sx={{ mr: 1, p: 0.5 }}
                    inputProps={{
                      'aria-label': rating === 'all' ? 'All Ratings' : rating,
                      tabIndex: -1
                    }}
                  />
                  {rating === 'all' ? 'All Ratings' : rating.charAt(0).toUpperCase() + rating.slice(1)}
                </MenuItem>
              ))}
            </Stack>
            
            {showFeedback && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" component="h2" sx={{ mb: 0.5 }} id="feedback-category-label">
                  Feedback Categories
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mt: 1 }}>Positive</Typography>
                <Stack spacing={0} role="group" aria-labelledby="positive-category-label" ref={feedbackCategoryRef}>
                  {feedbackCategories.positive.map((category, index) => (
                    <MenuItem
                      key={`positive-${category}`}
                      onClick={() => handleFeedbackCategorySelect(category, 'positive')}
                      selected={selectedFeedbackCategories.includes(category)}
                      dense
                      tabIndex={focusedFeedbackCategory === index ? 0 : -1}
                      onKeyDown={(e) => {
                        handleFeedbackCategoryKeyDown(e, index, 'positive');
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleFeedbackCategorySelect(category, 'positive');
                        }
                      }}
                      onFocus={() => setFocusedFeedbackCategory(index)}
                      sx={{ 
                        minHeight: '32px', 
                        py: 0.5, 
                        '&.Mui-selected': { backgroundColor: 'transparent' }, 
                        '&.Mui-selected:hover': { backgroundColor: 'action.hover' },
                        '&:focus': { backgroundColor: 'action.hover' }
                      }}
                    >
                      <Checkbox 
                        checked={selectedFeedbackCategories.includes(category)}
                        size="small"
                        sx={{ mr: 1, p: 0.5 }}
                        inputProps={{
                          'aria-label': category === 'all' ? 'All Positive Categories' : category,
                          tabIndex: -1
                        }}
                      />
                      {category === 'all' ? 'All positive categories' : 
                        category.split('_').join(' ').replace(/^\w/, c => c.toUpperCase())
                      }
                    </MenuItem>
                  ))}
                </Stack>
                
                <Typography variant="subtitle2" sx={{ mt: 1 }}>Negative</Typography>
                <Stack spacing={0} role="group" aria-labelledby="negative-category-label">
                  {feedbackCategories.negative.map((category, index) => (
                    <MenuItem
                      key={`negative-${category}`}
                      onClick={() => handleFeedbackCategorySelect(category, 'negative')}
                      selected={selectedFeedbackCategories.includes(category)}
                      dense
                      tabIndex={-1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleFeedbackCategorySelect(category, 'negative');
                        }
                      }}
                      sx={{ 
                        minHeight: '32px', 
                        py: 0.5, 
                        '&.Mui-selected': { backgroundColor: 'transparent' }, 
                        '&.Mui-selected:hover': { backgroundColor: 'action.hover' },
                        '&:focus': { backgroundColor: 'action.hover' }
                      }}
                    >
                      <Checkbox 
                        checked={selectedFeedbackCategories.includes(category)}
                        size="small"
                        sx={{ mr: 1, p: 0.5 }}
                        inputProps={{
                          'aria-label': category === 'all' ? 'All Negative Categories' : category,
                          tabIndex: -1
                        }}
                      />
                      {category === 'all' ? 'All negative categories' : 
                        category.split('_').join(' ').replace(/^\w/, c => c.toUpperCase())
                      }
                    </MenuItem>
                  ))}
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </Menu>

      {/* Custom Date Range Dialog */}
      <Dialog 
        open={customDateDialog} 
        onClose={handleCustomDateCancel}
        aria-labelledby="date-range-dialog-title"
      >
        <DialogTitle id="date-range-dialog-title">Select Date Range</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enGB}>
            <Stack spacing={3} sx={{ mt: 2, minWidth: 300 }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    size="small"
                    inputProps={{
                      ...params.inputProps,
                      'aria-label': 'Start date'
                    }}
                  />
                )}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    size="small"
                    inputProps={{
                      ...params.inputProps,
                      'aria-label': 'End date'
                    }}
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCustomDateCancel}
            aria-label="Cancel date selection"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCustomDateConfirm} 
            variant="contained" 
            color="primary"
            aria-label="Apply selected date range"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default FeedbackTable;