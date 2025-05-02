// src/services/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// API base URL
const API_URL = 'https://api.outfique.com'; // Replace with your actual API URL

// Headers
const getHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Helper function for API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const headers = await getHeaders();
    const config = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth Services
export const authService = {
  // Register a new user
  register: (userData) => {
    return apiRequest('/auth/register', 'POST', userData);
  },

  // Login user
  login: (credentials) => {
    return apiRequest('/auth/login', 'POST', credentials);
  },

  // Logout user
  logout: () => {
    return AsyncStorage.removeItem('userToken');
  },

  // Get current user
  getCurrentUser: () => {
    return apiRequest('/auth/user');
  },
};

// User Services
export const userService = {
  // Get user profile
  getProfile: (userId) => {
    return apiRequest(`/users/${userId}`);
  },

  // Update user profile
  updateProfile: (userData) => {
    return apiRequest('/users/profile', 'PATCH', userData);
  },

  // Get user's friends
  getFriends: () => {
    return apiRequest('/users/friends');
  },

  // Add a friend
  addFriend: (phoneNumber) => {
    return apiRequest('/users/friends', 'POST', { phoneNumber });
  },

  // Remove a friend
  removeFriend: (friendId) => {
    return apiRequest(`/users/friends/${friendId}`, 'DELETE');
  },

  // Get user stats
  getStats: () => {
    return apiRequest('/users/stats');
  },
};

// Outfit Services
export const outfitService = {
  // Get outfits feed (from friends)
  getFriendsFeed: () => {
    return apiRequest('/outfits/friends');
  },

  // Get outfits for exploration (public)
  getExploreFeed: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/outfits/explore?${queryParams}`);
  },

  // Get user's outfits
  getUserOutfits: (userId) => {
    return apiRequest(`/outfits/user/${userId}`);
  },

  // Post a new outfit
  postOutfit: (outfitData) => {
    return apiRequest('/outfits', 'POST', outfitData);
  },

  // Like an outfit
  likeOutfit: (outfitId) => {
    return apiRequest(`/outfits/${outfitId}/like`, 'POST');
  },

  // Unlike an outfit
  unlikeOutfit: (outfitId) => {
    return apiRequest(`/outfits/${outfitId}/unlike`, 'POST');
  },

  // Add a comment to an outfit
  addComment: (outfitId, comment) => {
    return apiRequest(`/outfits/${outfitId}/comments`, 'POST', { content: comment });
  },

  // Get outfit details
  getOutfitDetails: (outfitId) => {
    return apiRequest(`/outfits/${outfitId}`);
  },
};

// Challenge Services
export const challengeService = {
  // Get active challenges
  getActiveChallenges: () => {
    return apiRequest('/challenges/active');
  },

  // Get past challenges
  getPastChallenges: () => {
    return apiRequest('/challenges/past');
  },

  // Get user's challenges
  getUserChallenges: () => {
    return apiRequest('/challenges/user');
  },

  // Get challenge details
  getChallengeDetails: (challengeId) => {
    return apiRequest(`/challenges/${challengeId}`);
  },

  // Join a challenge
  joinChallenge: (challengeId) => {
    return apiRequest(`/challenges/${challengeId}/join`, 'POST');
  },

  // Leave a challenge
  leaveChallenge: (challengeId) => {
    return apiRequest(`/challenges/${challengeId}/leave`, 'POST');
  },

  // Post an outfit for a challenge
  postChallengeOutfit: (challengeId, outfitData) => {
    return apiRequest(`/challenges/${challengeId}/outfits`, 'POST', outfitData);
  },
};

// Wardrobe Services
export const wardrobeService = {
  // Get user's wardrobe
  getWardrobe: () => {
    return apiRequest('/wardrobe');
  },

  // Add an item to wardrobe
  addItem: (itemData) => {
    return apiRequest('/wardrobe/items', 'POST', itemData);
  },

  // Remove an item from wardrobe
  removeItem: (itemId) => {
    return apiRequest(`/wardrobe/items/${itemId}`, 'DELETE');
  },

  // Update an item in wardrobe
  updateItem: (itemId, itemData) => {
    return apiRequest(`/wardrobe/items/${itemId}`, 'PATCH', itemData);
  },

  // Increment wear count for an item
  incrementWearCount: (itemId) => {
    return apiRequest(`/wardrobe/items/${itemId}/wear`, 'POST');
  },

  // Get wardrobe stats
  getStats: () => {
    return apiRequest('/wardrobe/stats');
  },
};

// Poll Services (This or That feature)
export const pollService = {
  // Get polls (friends or public)
  getPolls: (scope = 'friends') => {
    return apiRequest(`/polls?scope=${scope}`);
  },

  // Create a new poll
  createPoll: (pollData) => {
    return apiRequest('/polls', 'POST', pollData);
  },

  // Vote on a poll
  vote: (pollId, optionId) => {
    return apiRequest(`/polls/${pollId}/vote`, 'POST', { optionId });
  },

  // Add a comment to a poll
  addComment: (pollId, comment) => {
    return apiRequest(`/polls/${pollId}/comments`, 'POST', { content: comment });
  },

  // Get poll details
  getPollDetails: (pollId) => {
    return apiRequest(`/polls/${pollId}`);
  },
};

// Image Upload Service
export const uploadService = {
  // Upload an image
  uploadImage: async (uri, type = 'outfit') => {
    try {
      const formData = new FormData();
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const fileType = match ? `image/${match[1]}` : 'image';
      
      formData.append('image', {
        uri,
        name: `${type}_${Date.now()}.${ext}`,
        type: fileType,
      });
      formData.append('type', type);

      const headers = await getHeaders();
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw result;
      }

      return result;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  },
};

export default {
  auth: authService,
  user: userService,
  outfit: outfitService,
  challenge: challengeService,
  wardrobe: wardrobeService,
  poll: pollService,
  upload: uploadService,
};

// src/services/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from './api';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout as logoutAction 
} from '../store/slices/userSlice';

// Register a new user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await authService.register(userData);
    await AsyncStorage.setItem('userToken', response.token);
    dispatch(loginSuccess(response.user));
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message || 'Registration failed'));
    throw error;
  }
};

// Login user
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await authService.login(credentials);
    await AsyncStorage.setItem('userToken', response.token);
    dispatch(loginSuccess(response.user));
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message || 'Login failed'));
    throw error;
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(logoutAction());
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

// Check if user is authenticated
export const checkAuth = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return false;
    
    dispatch(loginStart());
    const user = await authService.getCurrentUser();
    dispatch(loginSuccess(user));
    return true;
  } catch (error) {
    dispatch(loginFailure(error.message || 'Authentication failed'));
    await AsyncStorage.removeItem('userToken');
    return false;
  }
};