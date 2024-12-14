import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import userReducer from "./userSlice"

const appStore = configureStore({
  reducer: {
    user:userReducer
  },
});

export default appStore;
