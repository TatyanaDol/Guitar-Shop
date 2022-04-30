import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {guitarsDataProcess} from './guitars-data-process/guitars-data-process';
import { siteProcess } from './site-process/site-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsDataProcess.reducer,
  [NameSpace.Site]: siteProcess.reducer,
});
