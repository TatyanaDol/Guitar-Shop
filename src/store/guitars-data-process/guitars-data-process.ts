import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GuitarsDataProcess} from '../../types/state';


const initialState: GuitarsDataProcess = {
  guitars: [],
  isGuitarsDataLoaded: false,
};

export const guitarsDataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isGuitarsDataLoaded = true;
    },
  },
});

export const {loadGuitars} = guitarsDataProcess.actions;
