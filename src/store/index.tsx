import { configureStore } from '@reduxjs/toolkit';
import clientInfoSlice from './client-info-slice';
import childrenSlice from './children-slice';

export const store = configureStore({
  reducer: {
    clientInfo: clientInfoSlice.reducer,
    children: childrenSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
