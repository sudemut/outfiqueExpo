// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import outfitsReducer from './slices/outfitsSlice';
import challengesReducer from './slices/challengesSlice';
import wardrobeReducer from './slices/wardrobeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    outfits: outfitsReducer,
    challenges: challengesReducer,
    wardrobe: wardrobeReducer,
  },
});
