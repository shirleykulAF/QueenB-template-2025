import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Card, CardContent, TextField, Select, MenuItem,
  FormControl, InputLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Avatar, IconButton, Grid, Box,
  InputAdornment, Pagination, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, List, ListItem,
  ListItemIcon, ListItemText, Alert, Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  AdminPanelSettings as AdminIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  LinkedIn as LinkedInIcon,
  Description as DescriptionIcon,
  Schedule as ScheduleIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const AdminUsersView = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Function to fetch data from server
  const fetchUsers = async (search = '', userType = 'all', page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (search.trim()) params.append('search', search.trim());
      if (userType !== 'all') params.append('userType', userType);

      const response = await fetch(`/api/admin/users?${params}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('You need to be logged in as an admin');
          return;
        }
        if (response.status === 403) {
          alert('Access denied. Admin privileges required.');
          return;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data.users || []);
      setStats(data.stats || {});
      setPagination(data.pagination || {});
    } catch (error) {
      console.error('Error fetching users:', error);
      alert(`Error loading user data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsers(searchTerm, userTypeFilter, 1);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, userTypeFilter]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchUsers(searchTerm, userTypeFilter, newPage);
  };

  const handleViewUser = (userId) => {
    const user = users.find(u => u._id === userId);
    if (user) {
      setSelectedUser({
        user: user,
        profile: user.profile
      });
      setShowUserModal(true);
    }
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u._id === userId);
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from list
      setUsers(users.filter(user => user._id !== selectedUser._id));
      
      // Update stats - decrease the counts
      setStats(prevStats => ({
        ...prevStats,
        total: prevStats.total - 1,
        [selectedUser.userType + 's']: prevStats[selectedUser.userType + 's'] - 1
      }));
      
      setShowDeleteDialog(false);
      
      // Show success message
      setSuccessMessage(`${selectedUser.profile?.firstName} ${selectedUser.profile?.lastName} has been deleted successfully`);
      setShowSuccess(true);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const closeModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        // Redirect to home page
        window.location.href = '/';
      } else {
        console.error('Logout failed');
        // Even if logout fails, redirect anyway
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Redirect anyway
      window.location.href = '/';
    }
  };

  const getUserTypeIcon = (userType) => {
    switch(userType) {
      case 'mentor': return <SchoolIcon />;
      case 'mentee': return <MenuBookIcon />;
      case 'admin': return <AdminIcon />;
      default: return <PeopleIcon />;
    }
  };

  const getUserTypeColor = (userType) => {
    switch(userType) {
      case 'mentor': return 'success';
      case 'mentee': return 'primary';
      case 'admin': return 'error';
      default: return 'default';
    }
  };

  const getUserTypeLabel = (userType) => {
    switch(userType) {
      case 'mentor': return 'Mentor';
      case 'mentee': return 'Mentee';
      case 'admin': return 'Admin';
      default: return userType;
    }
  };

  // User Details Modal Component
  const UserDetailsModal = () => {
    if (!showUserModal || !selectedUser) return null;

    const { user, profile } = selectedUser;

    return (
      <Dialog
        open={showUserModal}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 48, height: 48 }}>
                {profile?.firstName ? profile.firstName[0] : user.email[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {profile?.firstName && profile?.lastName 
                    ? `${profile.firstName} ${profile.lastName}`
                    : 'User Details'
                  }
                </Typography>
                <Chip
                  icon={getUserTypeIcon(user.userType)}
                  label={getUserTypeLabel(user.userType)}
                  color={getUserTypeColor(user.userType)}
                  size="small"
                />
              </Box>
            </Box>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box>
            {/* Basic Information */}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Basic Information
            </Typography>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Email" secondary={user.email} />
                  </ListItem>
                  {profile?.phoneNumber && (
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Phone" secondary={profile.phoneNumber} />
                    </ListItem>
                  )}
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Join Date" 
                      secondary={new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Mentor-specific information */}
            {user.userType === 'mentor' && profile && (
              <>
                <Typography variant="h6" gutterBottom>
                  Mentor Information
                </Typography>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <SchoolIcon color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Experience" 
                          secondary={`${profile.yearsOfExperience} years`}
                        />
                      </ListItem>
                      
                      {profile.programmingLanguages && profile.programmingLanguages.length > 0 && (
                        <ListItem>
                          <ListItemIcon>
                            <LanguageIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Programming Languages"
                            secondary={
                              <Box component="div" sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {profile.programmingLanguages.map((lang, index) => (
                                  <Chip
                                    key={index}
                                    label={lang}
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            }
                          />
                        </ListItem>
                      )}

                      {profile.technologies && profile.technologies.length > 0 && (
                        <ListItem>
                          <ListItemIcon>
                            <BusinessIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Technologies"
                            secondary={
                              <Box component="div" sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {profile.technologies.map((tech, index) => (
                                  <Chip
                                    key={index}
                                    label={tech}
                                    size="small"
                                    color="info"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            }
                          />
                        </ListItem>
                      )}

                      {profile.domains && profile.domains.length > 0 && (
                        <ListItem>
                          <ListItemIcon>
                            <BusinessIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Domains"
                            secondary={
                              <Box component="div" sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {profile.domains.map((domain, index) => (
                                  <Chip
                                    key={index}
                                    label={domain}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            }
                          />
                        </ListItem>
                      )}

                      {profile.linkedinUrl && (
                        <ListItem>
                          <ListItemIcon>
                            <LinkedInIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="LinkedIn Profile"
                            secondary={
                              <Box component="div" sx={{ mt: 1 }}>
                                <Button
                                  href={profile.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  size="small"
                                  variant="outlined"
                                  startIcon={<LinkedInIcon />}
                                >
                                  View LinkedIn
                                </Button>
                              </Box>
                            }
                          />
                        </ListItem>
                      )}

                      {profile.generalDescription && (
                        <ListItem>
                          <ListItemIcon>
                            <DescriptionIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="About"
                            secondary={
                              <Box component="div" sx={{ mt: 1 }}>
                                <Typography variant="body2" color="text.primary">
                                  {profile.generalDescription}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Mentee-specific information */}
            {user.userType === 'mentee' && profile && (
              <>
                <Typography variant="h6" gutterBottom>
                  Mentee Information
                </Typography>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <List dense>
                      {profile.generalDescription && (
                        <ListItem>
                          <ListItemIcon>
                            <DescriptionIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Description"
                            secondary={profile.generalDescription}
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Admin-specific information */}
            {user.userType === 'admin' && profile && (
              <>
                <Typography variant="h6" gutterBottom>
                  Admin Information
                </Typography>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <ScheduleIcon color="error" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Last Login"
                          secondary={
                            profile.lastLogin 
                              ? new Date(profile.lastLogin).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'Never'
                          }
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Box textAlign="center">
            <CircularProgress size={60} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading user data...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            👑 User Management - QueenB
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage all users in the system
          </Typography>
        </Box>
        
        {/* Sign Out Button */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleSignOut}
          sx={{ minWidth: 120 }}
        >
          Sign Out
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" color="primary">
                    {stats.total || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" color="success.main">
                    {stats.mentors || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mentors
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <MenuBookIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" color="info.main">
                    {stats.mentees || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mentees
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                  <AdminIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" color="error.main">
                    {stats.admins || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Admins
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search by email, first name, or last name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select
                  value={userTypeFilter}
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                  label="User Type"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="mentor">Mentors</MenuItem>
                  <MenuItem value="mentee">Mentees</MenuItem>
                  <MenuItem value="admin">Admins</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User List ({users.filter(user => user.userType !== 'admin').length})
          </Typography>

          {users.length === 0 ? (
            <Box textAlign="center" py={8}>
              <PeopleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {searchTerm || userTypeFilter !== 'all' 
                  ? 'No users found matching your search criteria' 
                  : 'No users found'
                }
              </Typography>
              {(searchTerm || userTypeFilter !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setUserTypeFilter('all');
                  }}
                  color="primary"
                >
                  Clear filters
                </Button>
              )}
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Additional Info</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.filter(user => user.userType !== 'admin').map((user) => (
                      <TableRow key={user._id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                              {user.profile?.firstName ? user.profile.firstName[0] : user.email[0].toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {user.profile?.firstName && user.profile?.lastName 
                                  ? `${user.profile.firstName} ${user.profile.lastName}`
                                  : 'No name provided'
                                }
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Chip
                            icon={getUserTypeIcon(user.userType)}
                            label={getUserTypeLabel(user.userType)}
                            color={getUserTypeColor(user.userType)}
                            size="small"
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(user.createdAt).toLocaleDateString('en-US')}
                          </Typography>
                        </TableCell>
                        
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.userType === 'mentor' && user.profile && (
                              <>
                                Experience: {user.profile.yearsOfExperience} years<br/>
                                Languages: {user.profile.programmingLanguages?.slice(0, 2).join(', ')}
                              </>
                            )}
                            {user.userType === 'mentee' && user.profile && (
                              <>Phone: {user.profile.phoneNumber}</>
                            )}
                            {user.userType === 'admin' && user.profile && (
                              <>
                                Last login:<br/>
                                {user.profile.lastLogin ? new Date(user.profile.lastLogin).toLocaleDateString('en-US') : 'Never'}
                              </>
                            )}
                          </Typography>
                        </TableCell>
                        
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <IconButton 
                              color="primary"
                              onClick={() => handleViewUser(user._id)}
                              title="View Details"
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton 
                              color="error"
                              onClick={() => handleDeleteUser(user._id)}
                              title="Delete User"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={3}>
                  <Pagination
                    count={pagination.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* User Details Modal */}
      <UserDetailsModal />

      {/* Simple Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to delete this user?
          </Typography>
          {selectedUser && (
            <Typography variant="body2" color="text.secondary">
              {selectedUser.profile?.firstName} {selectedUser.profile?.lastName} ({selectedUser.email})
            </Typography>
          )}
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          variant="filled"
          icon={<CheckCircleIcon />}
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminUsersView;