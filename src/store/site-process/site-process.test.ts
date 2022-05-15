import {makeFakeGuitarData} from '../../utils/mocks';
import { loadTotalGuitarsCount, siteProcess } from './site-process';

const guitars = [makeFakeGuitarData(), makeFakeGuitarData()];

describe('Reducer: Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        totalGuitarsCount: 0,
      });
  });
  it('should update totalGuitarsCount by load x-total-count', () => {
    const state = {
      totalGuitarsCount: 0,
    };
    expect(siteProcess.reducer(state, loadTotalGuitarsCount(guitars.length)))
      .toEqual({
        totalGuitarsCount: guitars.length,
      });
  });
});
