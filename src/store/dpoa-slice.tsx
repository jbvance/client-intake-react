import { Dispatch } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import { IAgent } from '../common/interfaces';

export interface IDpoa {
  allowGifts: boolean;
  effectiveImmediately: boolean;
  agents: Array<IAgent>;
}

// const initialState_TEST: IDpoa = {
//   allowGifts: true,
//   effectiveImmediately: true,
//   agents: [
//     {
//       firstName: 'Tom',
//       lastName: 'Smith',
//       middleName: 'L.',
//       address: '123 Main St.',
//       city: 'Houston',
//       state: 'TX',
//       zip: '77002',
//       phone: '555-555-5555',
//     },
//   ],
// };

const initialState: IDpoa = {
  allowGifts: false,
  effectiveImmediately: false,
  agents: [],
};

const dpoaSlice = createSlice({
  name: 'dpoa',
  initialState,
  reducers: {
    addAgent(state, action) {
      state.agents = [...state.agents, action.payload];
    },
    setDpoaValues(state, action) {
      console.log(action.payload);
      Object.assign(state, action.payload);
    },
  },
});

export const setDpoaValues = (values: IDpoa) => {
  return async (dispatch: Dispatch) => {
    // TODO: call database to update values
    dispatch(dpoaActions.setDpoaValues(values));
  };
};

export const dpoaActions = dpoaSlice.actions;
export default dpoaSlice;
