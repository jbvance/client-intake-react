import { createSlice } from '@reduxjs/toolkit';

export interface IChild {
  firstName: string;
  middleName?: string;
  lastName: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  spouseOneOnly?: boolean;
  spouseTwoOnly?: boolean;
}

const initialState: Array<IChild> = [];

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    addChild(state, action) {
      state = [...state, action.payload];
    },
  },
});

export const childrenActions = childrenSlice.actions;
export default childrenSlice;
