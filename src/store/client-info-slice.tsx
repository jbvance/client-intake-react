import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

export interface IClientInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county?: string;
  phone: string;
  occupation?: string;
  employer?: string;
  email: string;
  married: string;
  spouseFirstName?: string;
  spouseMiddleName?: string;
  spouseLastName?: string;
  spouseEmail?: string;
  spouseOccupation?: string;
  spouseEmployer?: string;
}

// const initialClientInfo: IClientInfo = {
//   firstName: '',
//   middleName: '',
//   lastName: '',
//   address: '',
//   city: '',
//   state: '',
//   zip: '',
//   county: '',
//   phone: '',
//   occupation: '',
//   email: '',
//   employer: '',
//   married: '',
//   spouseFirstName: '',
//   spouseMiddleName: '',
//   spouseLastName: '',
//   spouseEmail: '',
//   spouseOccupation: '',
//   spouseEmployer: '',
// };

const initialClientInfo: IClientInfo = {
  firstName: 'Jason',
  middleName: 'B.',
  lastName: 'Vance',
  address: '123 Main St.',
  city: 'Houston',
  state: 'TX',
  zip: '77002',
  county: 'Harris',
  phone: '(713) 555-1234',
  occupation: 'Attorney',
  email: 'test@test.com',
  employer: 'Vance Law Firm',
  married: 'N',
  spouseFirstName: '',
  spouseMiddleName: '',
  spouseLastName: '',
  spouseEmail: '',
  spouseOccupation: '',
  spouseEmployer: '',
};

const initialState = { ...initialClientInfo };

const clientInfoSlice = createSlice({
  name: 'clientInfo',
  initialState,
  reducers: {
    updateClientInfo(state, action) {
      const newState = { ...action.payload };
      if (newState.married === 'N') {
        newState.spouseFirstName = '';
        newState.spouseMiddleName = '';
        newState.spouseLastName = '';
        newState.spouseOccupation = '';
        newState.spouseEmployer = '';
        newState.spouseEmail = '';
      }
      //console.log(newState);
      Object.assign(state, newState);
    },
    // addFavorite(state, action) {
    //   const newRecipe = action.payload;
    //   const existingFavorite = state.recipes.find(
    //     (recipe: any) => recipe.id === newRecipe.shareAs
    //   );
    //   const favoriteToAdd = {
    //     _id: newRecipe._id,
    //     id: newRecipe.shareAs,
    //     ...newRecipe,
    //   };
    //   if (!existingFavorite) {
    //     state.recipes.push(favoriteToAdd);
    //   }
    // },
    // deleteFavorite(state, action) {
    //   const id: string = action.payload;
    //   const index = state.recipes.findIndex((rec) => rec.id);
    //   if (index > -1) {
    //     state.recipes = state.recipes.filter((rec) => rec.id !== id);
    //   }
    // },
    // setFavorites(state, action) {
    //   state.recipes = action.payload;
    // },
  },
});

// export const getFavorites = (token: string) => {
//   const axiosParams = {
//     method: 'get',
//     url: `${process.env.REACT_APP_API_BASE_URL}/favorites`,
//     headers: {
//       accept: '*/*',
//       authorization: `Bearer ${token}`,
//     },
//   };
//   return async (dispatch: Dispatch) => {
//     try {
//       const result: any = await axios(axiosParams);
//       dispatch(favoritesActions.setFavorites(result.data.favorites));
//     } catch (error) {
//       console.log('ERROR', error);
//     }
//   };
// };

export const clientInfoActions = clientInfoSlice.actions;
export default clientInfoSlice;
