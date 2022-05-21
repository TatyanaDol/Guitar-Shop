import {makeFakeGuitarData} from '../../utils/mocks';
import { loadIsError404, loadTotalGuitarsCount, siteProcess } from './site-process';

const guitars = [makeFakeGuitarData(), makeFakeGuitarData()];
const fakeResponseStatus = 404;

describe('Reducer: Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        totalGuitarsCount: 0,
        isError404: false,
      });
  });
  it('should update totalGuitarsCount by load x-total-count', () => {
    const state = {
      totalGuitarsCount: 0,
      isError404: false,
    };
    expect(siteProcess.reducer(state, loadTotalGuitarsCount(guitars.length)))
      .toEqual({
        totalGuitarsCount: guitars.length,
        isError404: false,
      });
  });
  it('should update isError404 by load response status', () => {
    const state = {
      totalGuitarsCount: 0,
      isError404: false,
    };
    expect(siteProcess.reducer(state, loadIsError404(fakeResponseStatus)))
      .toEqual({
        totalGuitarsCount: 0,
        isError404: true,
      });
  });
});
