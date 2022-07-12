import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userid: "",
    username: "",
    email: "",
    wallet: { amount: 0, currency: "USD" },
    authenticated: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login(state, req) {
      state.value = {
        userid: req.payload._id,
        username: req.payload.username,
        email: req.payload.email,
        wallet: req.payload.wallet,
        authenticated: true,
      };
    },
    logout(state) {
      state.value = initialState.value;
    },

    updateWallet(state, req) {
      state.value.wallet = req.payload.wallet;
    },

    updateInfo(state, req) {
      state.value.username = req.payload.username;
    },
  },
});

export const { login, logout, updateWallet, updateInfo } = userSlice.actions;
export default userSlice.reducer;
