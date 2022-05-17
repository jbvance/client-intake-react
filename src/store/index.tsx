import { configureStore } from '@reduxjs/toolkit';
import clientInfoSlice from './client-info-slice';

export const store = configureStore({
  reducer: {
    clientInfo: clientInfoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
