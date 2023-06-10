import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentJoke: '',
    favoriteJokes: [ ],
};

export const jokesSlice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        setCurrentJoke: (state, action) => {
            state.currentJoke = action.payload;
        },
        setFavoriteJoke: (state, action) => {
            state.favoriteJokes = [...state.favoriteJokes, action.payload]
        },
    },
});

export const { setCurrentJoke, setFavoriteJoke } = jokesSlice.actions;

export const selectCurrentJoke = (state) => state.jokes.currentJoke;

export default jokesSlice.reducer;