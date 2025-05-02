
// src/store/slices/wardrobeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  categories: [],
  stats: {
    totalItems: 0,
    sustainableItems: 0,
    totalWears: 0,
  },
  loading: false,
  error: null,
};

const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState,
  reducers: {
    fetchWardrobeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWardrobeSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.categories = action.payload.categories;
      state.stats = calculateStats(action.payload.items);
    },
    fetchWardrobeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.stats = calculateStats(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.stats = calculateStats(state.items);
    },
    updateItem: (state, action) => {
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      state.stats = calculateStats(state.items);
    },
    incrementWearCount: (state, action) => {
      state.items = state.items.map(item => {
        if (item.id === action.payload) {
          return { ...item, wearCount: item.wearCount + 1 };
        }
        return item;
      });
      state.stats = calculateStats(state.items);
    },
  },
});

// Helper function to calculate wardrobe stats
const calculateStats = (items) => {
  return {
    totalItems: items.length,
    sustainableItems: items.filter(item => item.sustainable).length,
    totalWears: items.reduce((total, item) => total + item.wearCount, 0),
  };
};

export const {
  fetchWardrobeStart,
  fetchWardrobeSuccess,
  fetchWardrobeFailure,
  addItem,
  removeItem,
  updateItem,
  incrementWearCount,
} = wardrobeSlice.actions;

export default wardrobeSlice.reducer;