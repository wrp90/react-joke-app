import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInformation: null,
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInformation: (state, action) => {
            state.userInformation = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { setUserInformation, setIsLoggedIn } = userSlice.actions;

export const userInformation = (state) => state.user.userInformation;

export const isLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;