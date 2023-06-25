import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentJoke: '',
    favoriteJokes: [],
    jokeId: null,
    jokeType: '',
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
        deleteFavoriteJoke: (state, action) => {
            state.favoriteJokes = state.favoriteJokes.filter(
                (joke) => joke.id !== action.payload
            );
        },
        setFavoriteJokes: (state, action) => {
            state.favoriteJokes = action.payload;
        },
        setJokeType: (state, action) => {
            state.jokeType = action.payload;
        },
        resetJokeSlice: (state, action) => {
            state = initialState;
        },
    },
});

export const { setCurrentJoke, addFavoriteJoke, deleteFavoriteJoke, setFavoriteJokes, resetJokeSlice, setJokeType } = jokesSlice.actions;

export const selectCurrentJoke = (state) => state.jokes.currentJoke;

export const selectFavoriteJoke = (state) => state.jokes.favoriteJokes;

export const selectJokeId = (state) => state.jokes.id;

export const selectJokeType = (state) => state.jokes.jokeType;

export default jokesSlice.reducer;