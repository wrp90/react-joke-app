import { configureStore } from '@reduxjs/toolkit';
import jokesReducer from './jokeSlice';

export const store = configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});
