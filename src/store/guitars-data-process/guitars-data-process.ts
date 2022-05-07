import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GuitarsDataProcess} from '../../types/state';


const initialState: GuitarsDataProcess = {
  guitars: [],
  isGuitarsDataLoaded: false,
  oneGuitarCard: null,
  isOneGuitarCardDataLoaded: false,
};

export const guitarsDataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isGuitarsDataLoaded = true;
    },
    loadOneGuitarCard: (state, action) => {
      state.oneGuitarCard = action.payload;
      state.isOneGuitarCardDataLoaded = true;
    },
    loadPostedComment: (state, action) => {
      if ( state.oneGuitarCard) {
        state.oneGuitarCard.comments = [action.payload, ...state.oneGuitarCard.comments];
      }
    },
  },
});

export const {loadGuitars, loadOneGuitarCard, loadPostedComment} = guitarsDataProcess.actions;
