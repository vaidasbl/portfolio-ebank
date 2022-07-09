import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { username: "", authenticated: false } };

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login(state, req) {
      state.value = {
        username: req.payload.username,
        authenticated: true,
      };
    },
    logout(state) {
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
