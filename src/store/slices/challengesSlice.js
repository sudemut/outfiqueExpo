// src/store/slices/challengesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChallenges: [],
  pastChallenges: [],
  userChallenges: [],
  loading: false,
  error: null,
};

const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    fetchChallengesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchActiveChallengesSuccess: (state, action) => {
      state.loading = false;
      state.activeChallenges = action.payload;
    },
    fetchPastChallengesSuccess: (state, action) => {
      state.loading = false;
      state.pastChallenges = action.payload;
    },
    fetchUserChallengesSuccess: (state, action) => {
      state.loading = false;
      state.userChallenges = action.payload;
    },
    fetchChallengesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    joinChallenge: (state, action) => {
      const challengeId = action.payload;
      const challenge = state.activeChallenges.find(c => c.id === challengeId);
      
      if (challenge) {
        state.userChallenges.push(challenge);
        
        // Update the participants count in the active challenges
        state.activeChallenges = state.activeChallenges.map(c => {
          if (c.id === challengeId) {
            return { ...c, participants: c.participants + 1, joined: true };
          }
          return c;
        });
      }
    },
    leaveChallenge: (state, action) => {
      const challengeId = action.payload;
      
      // Remove from user challenges
      state.userChallenges = state.userChallenges.filter(c => c.id !== challengeId);
      
      // Update the participants count in the active challenges
      state.activeChallenges = state.activeChallenges.map(c => {
        if (c.id === challengeId) {
          return { ...c, participants: c.participants - 1, joined: false };
        }
        return c;
      });
    },
  },
});

export const {
  fetchChallengesStart,
  fetchActiveChallengesSuccess,
  fetchPastChallengesSuccess,
  fetchUserChallengesSuccess,
  fetchChallengesFailure,
  joinChallenge,
  leaveChallenge,
} = challengesSlice.actions;

export default challengesSlice.reducer;