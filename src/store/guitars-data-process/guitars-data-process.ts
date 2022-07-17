import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GuitarsDataProcess} from '../../types/state';


const initialState: GuitarsDataProcess = {
  guitars: [],
  isGuitarsDataLoaded: false,
  oneGuitarCard: null,
  isOneGuitarCardDataLoaded: false,
  searchResultGuitars: [],
  guitarsInCart: [],
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
    loadSearchResultGuitars: (state, action) => {
      state.searchResultGuitars = action.payload;
    },
    loadGuitarDataForCart: (state, action) => {
      const newGuitarsInCart = [...state.guitarsInCart];
      const guitar = {...action.payload};
      const isIncludesIndex = newGuitarsInCart.findIndex((element) => element.id === guitar.id );
      if(isIncludesIndex !== -1) {
        newGuitarsInCart[isIncludesIndex].quantity = newGuitarsInCart[isIncludesIndex].quantity + 1;
        state.guitarsInCart = newGuitarsInCart;
      } else {
        guitar.quantity = 1;
        state.guitarsInCart = [guitar, ...state.guitarsInCart];
      }
    },
    decrementGuitarQuantityInCart: (state, action) => {
      const newGuitars = [...state.guitarsInCart];
      const index = state.guitarsInCart.findIndex((element) => element.id === action.payload );
      if(newGuitars[index].quantity > 1) {
        newGuitars[index].quantity = newGuitars[index].quantity - 1;
        state.guitarsInCart = [...newGuitars];
      } else {
        newGuitars.splice(index, 1);
        state.guitarsInCart = [...newGuitars];
      }
    },
    incrementGuitarQuantityInCart: (state, action) => {
      const newGuitars = [...state.guitarsInCart];
      const index = state.guitarsInCart.findIndex((element) => element.id === action.payload );
      newGuitars[index].quantity = newGuitars[index].quantity + 1;
      state.guitarsInCart = [...newGuitars];
    },
    deleteGuitarFromCart: (state, action) => {
      const newGuitars = [...state.guitarsInCart];
      const index = state.guitarsInCart.findIndex((element) => element.id === action.payload );
      newGuitars.splice(index, 1);
      state.guitarsInCart = [...newGuitars];
    },
    setNewGuitarQuantityInCart: (state, action) => {
      const {id, count} = action.payload;
      const newGuitars = [...state.guitarsInCart];
      const index = state.guitarsInCart.findIndex((element) => element.id === id );
      newGuitars[index].quantity = count;
      state.guitarsInCart = [...newGuitars];
    },
  },
});

export const {setNewGuitarQuantityInCart, decrementGuitarQuantityInCart, incrementGuitarQuantityInCart, deleteGuitarFromCart, loadGuitars, loadOneGuitarCard, loadPostedComment, loadSearchResultGuitars, loadGuitarDataForCart} = guitarsDataProcess.actions;
