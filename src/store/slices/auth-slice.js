import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  session: null,
  status: null,
};

const auth = createSlice({
  initialState: initialAuthState,
  name: "auth",

  reducers: {
    ACTIVATE_SESSION: (state, action) => {
      state.session = action.payload.session;
      state.status = action.payload.status;
    },

    DEACTIVATE_SESSION: (state) => {
      state.session = null;
      state.status = null;
    },
  },
});

export default auth.reducer;

export const authActions = auth.actions;
export const selectAuthState = (state) => state.auth;
