import {NameSpace} from '../../const';
import {State} from '../../types/state';


export const getTotalGuitarsCount = (state: State): number => state[NameSpace.Site].totalGuitarsCount;
export const getIsError404 = (state: State): boolean => state[NameSpace.Site].isError404;
