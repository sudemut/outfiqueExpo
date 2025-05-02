// src/store/slices/outfitsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friendsOutfits: [],
  exploreOutfits: [],
  userOutfits: [],
  loading: false,
  error: null,
};

const outfitsSlice = createSlice({
  name: 'outfits',
  initialState,
  reducers: {
    fetchOutfitsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFriendsOutfitsSuccess: (state, action) => {
      state.loading = false;
      state.friendsOutfits = action.payload;
    },
    fetchExploreOutfitsSuccess: (state, action) => {
      state.loading = false;
      state.exploreOutfits = action.payload;
    },
    fetchUserOutfitsSuccess: (state, action) => {
      state.loading = false;
      state.userOutfits = action.payload;
    },
    fetchOutfitsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addOutfit: (state, action) => {
      state.userOutfits.unshift(action.payload);
    },
    likeOutfit: (state, action) => {
      const { outfitId, source } = action.payload;
      
      const updateOutfitLikes = (outfits) => {
        return outfits.map(outfit => {
          if (outfit.id === outfitId) {
            return { ...outfit, likes: outfit.likes + 1, liked: true };
          }
          return outfit;
        });
      };
      
      if (source === 'friends') {
        state.friendsOutfits = updateOutfitLikes(state.friendsOutfits);
      } else if (source === 'explore') {
        state.exploreOutfits = updateOutfitLikes(state.exploreOutfits);
      } else if (source === 'user') {
        state.userOutfits = updateOutfitLikes(state.userOutfits);
      }
    },
    unlikeOutfit: (state, action) => {
      const { outfitId, source } = action.payload;
      
      const updateOutfitUnlikes = (outfits) => {
        return outfits.map(outfit => {
          if (outfit.id === outfitId) {
            return { ...outfit, likes: outfit.likes - 1, liked: false };
          }
          return outfit;
        });
      };
      
      if (source === 'friends') {
        state.friendsOutfits = updateOutfitUnlikes(state.friendsOutfits);
      } else if (source === 'explore') {
        state.exploreOutfits = updateOutfitUnlikes(state.exploreOutfits);
      } else if (source === 'user') {
        state.userOutfits = updateOutfitUnlikes(state.userOutfits);
      }
    },
    addComment: (state, action) => {
      const { outfitId, comment, source } = action.payload;
      
      const updateOutfitComments = (outfits) => {
        return outfits.map(outfit => {
          if (outfit.id === outfitId) {
            return { 
              ...outfit, 
              comments: [...(outfit.comments || []), comment],
              commentCount: (outfit.commentCount || 0) + 1
            };
          }
          return outfit;
        });
      };
      
      if (source === 'friends') {
        state.friendsOutfits = updateOutfitComments(state.friendsOutfits);
      } else if (source === 'explore') {
        state.exploreOutfits = updateOutfitComments(state.exploreOutfits);
      } else if (source === 'user') {
        state.userOutfits = updateOutfitComments(state.userOutfits);
      }
    },
  },
});

export const {
  fetchOutfitsStart,
  fetchFriendsOutfitsSuccess,
  fetchExploreOutfitsSuccess,
  fetchUserOutfitsSuccess,
  fetchOutfitsFailure,
  addOutfit,
  likeOutfit,
  unlikeOutfit,
  addComment,
} = outfitsSlice.actions;

export default outfitsSlice.reducer;