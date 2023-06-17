import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentJoke: '',
    favoriteJokes: [],
};

export const jokesSlice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        setCurrentJoke: (state, action) => {
            state.currentJoke = action.payload;
        },
        addFavoriteJoke: (state, action) => {
            state.favoriteJokes = [...state.favoriteJokes, action.payload]
        },
        setJokeId: (state, action) => {
            state.jokeId = action.payload;
        },
        resetJokeSlice: (state, action) => {
            state=initialState;
        },
        setFavoriteJokes: (state, action) => {
            state.favoriteJokes = action.payload;
        },
    },
});

export const { setCurrentJoke, addFavoriteJoke, resetJokeSlice, setFavoriteJokes, setJokeId } = jokesSlice.actions;

export const selectCurrentJoke = (state) => state.jokes.currentJoke;

export const selectFavoriteJoke = (state) => state.jokes.favoriteJokes;

export const selectJokeId = (state) => state.jokes.jokeId;

export default jokesSlice.reducer;