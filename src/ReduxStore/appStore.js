import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  },
});

export default appStore;
