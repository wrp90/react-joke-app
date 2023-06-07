import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentJoke: '',
    favoriteJokes: [ ],
};

export const jokesSlice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        searchJoke: (state, action) => {
            state.currentJoke = action.payload;
        },
        addJoke: (state, action) => {
            state.favoriteJokes = [...state.favoriteJokes, action.payload]
        },
    },
});

export const { searchJoke, addJoke } = jokesSlice.actions;

export const currentJoke = (state) => state.jokes.currentJoke;

export default jokesSlice.reducer;