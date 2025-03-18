import { createSlice } from "@reduxjs/toolkit";

// Check if localStorage is available (client-side only)
const getInitialLoginState = () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false; // Default value for SSR
};
  
const initialState = {
    isLoggedIn: getInitialLoginState(),
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Export actions
export const { setLoginStatus,logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;