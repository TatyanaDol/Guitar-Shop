import {NameSpace} from '../../const';
import {State} from '../../types/state';


export const getTotalGuitarsCount = (state: State): number => state[NameSpace.Site].totalGuitarsCount;
export const getIsError404 = (state: State): boolean => state[NameSpace.Site].isError404;
export const getMaxGuitarPrice = (state: State): number => state[NameSpace.Site].maxGuitarPrice;
export const getMinGuitarPrice = (state: State): number => state[NameSpace.Site].minGuitarPrice;
