
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