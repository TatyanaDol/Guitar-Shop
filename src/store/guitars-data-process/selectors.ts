import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {GuitarsData} from '../../types/guitar';

export const getGuitars = (state: State): GuitarsData => state[NameSpace.Data].guitars;
export const getGuitarsDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isGuitarsDataLoaded;
