import { Dispatch } from 'redux';
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
  childParent?: string;
}

const initialState_TEST: Array<IChild> = [
  {
    firstName: 'Tom',
    lastName: 'Smith',
    middleName: 'L.',
    address: '123 Main St.',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    phone: '555-555-5555',
  },
];

const initialState: Array<IChild> = [];

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    addChild(state, action) {
      state = [...state, action.payload];
    },
    setChildren(state, action) {
      console.log(action.payload);
      Object.assign(state, action.payload);
    },
  },
});

export const setChildren = (children: IChild[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(childrenActions.setChildren(children));
  };
};

export const childrenActions = childrenSlice.actions;
export default childrenSlice;
