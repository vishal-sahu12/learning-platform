import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name: null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.name = action.payload.name;
    },
    clearUser(state) {
      state.token = null;
      state.name = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
