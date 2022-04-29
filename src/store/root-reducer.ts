import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {guitarsDataProcess} from './guitars-data-process/guitars-data-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsDataProcess.reducer,
});
