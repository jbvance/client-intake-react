import { configureStore } from '@reduxjs/toolkit';
import clientInfoSlice from './client-info-slice';
import childrenSlice from './children-slice';
import dpoaSlice from './dpoa-slice';

export const store = configureStore({
  reducer: {
    clientInfo: clientInfoSlice.reducer,
    children: childrenSlice.reducer,
    dpoa: dpoaSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
