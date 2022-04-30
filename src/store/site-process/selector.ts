import {NameSpace} from '../../const';
import {State} from '../../types/state';


export const getTotalGuitarsCount = (state: State): number => state[NameSpace.Site].totalGuitarsCount;
