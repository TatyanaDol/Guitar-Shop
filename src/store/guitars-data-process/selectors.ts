import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {GuitarData, GuitarsData, GuitarsInCartData} from '../../types/guitar';

export const getGuitars = (state: State): GuitarsData => state[NameSpace.Data].guitars;
export const getGuitarsDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isGuitarsDataLoaded;
export const getOneGuitarCard = (state: State): GuitarData | null => state[NameSpace.Data].oneGuitarCard;
export const getOneGuitarCardDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isOneGuitarCardDataLoaded;
export const getSearchResultGuitars = (state: State): GuitarsData => state[NameSpace.Data].searchResultGuitars;
export const getGuitarsInCart = (state: State): GuitarsInCartData => state[NameSpace.Data].guitarsInCart;
