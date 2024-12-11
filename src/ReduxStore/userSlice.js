import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name: null,
    userId:null,
    role:null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.userId = action.payload.token;
      state.role = action.payload.role;
    },
    clearUser(state) {
      state.token = null;
      state.name = null;
      state.userId=null;
      state.role= null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
