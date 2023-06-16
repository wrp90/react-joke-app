import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: null,
  userId: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUserId } = loginSlice.actions;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectUserId = (state) => state.login.userId;

export default loginSlice.reducer;