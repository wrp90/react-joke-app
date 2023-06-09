import { configureStore } from '@reduxjs/toolkit';
import jokesReducer from './slices/jokeSlice';
import userReducer from './slices/userSlice';
// import loginReducer from './slices/loginSlice';

export const store = configureStore({
  reducer: {
    jokes: jokesReducer,
    user: userReducer,
    // login: loginReducer,
  },
});
