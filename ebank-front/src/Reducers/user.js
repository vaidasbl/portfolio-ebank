import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
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
        username: req.payload.username,
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
  },
});

export const { login, logout, updateWallet } = userSlice.actions;
export default userSlice.reducer;
