import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInformation: null,
    isLoggedIn: false,
    userId: null,
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
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setUserInformation, setIsLoggedIn, setUserId } = userSlice.actions;

export const selectUserInformation = (state) => state.user.userInformation;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;