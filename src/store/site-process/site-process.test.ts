import {makeFakeGuitarData} from '../../utils/mocks';
import { loadDiscount, loadIsError404, loadMaxAndMinPrice, loadTotalGuitarsCount, siteProcess } from './site-process';

const guitars = [makeFakeGuitarData(), makeFakeGuitarData()];
const fakeResponseStatus = 404;
const mackDiscount = Math.floor(Math.random() * 100);

describe('Reducer: Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 0,
        minGuitarPrice: 0,
        discount: 0,
      });
  });
  it('should update totalGuitarsCount by load x-total-count', () => {
    const state = {
      totalGuitarsCount: 0,
      isError404: false,
      maxGuitarPrice: 0,
      minGuitarPrice: 0,
      discount: 0,
    };
    expect(siteProcess.reducer(state, loadTotalGuitarsCount(guitars.length)))
      .toEqual({
        totalGuitarsCount: guitars.length,
        isError404: false,
        maxGuitarPrice: 0,
        minGuitarPrice: 0,
        discount: 0,
      });
  });
  it('should update isError404 by load response status', () => {
    const state = {
      totalGuitarsCount: 0,
      isError404: false,
      maxGuitarPrice: 0,
      minGuitarPrice: 0,
      discount: 0,
    };
    expect(siteProcess.reducer(state, loadIsError404(fakeResponseStatus)))
      .toEqual({
        totalGuitarsCount: 0,
        isError404: true,
        maxGuitarPrice: 0,
        minGuitarPrice: 0,
        discount: 0,
      });
  });
  it('should update maxGuitarPrice and minGuitarPrice by load response data', () => {
    const state = {
      totalGuitarsCount: 0,
      isError404: false,
      maxGuitarPrice: 0,
      minGuitarPrice: 0,
      discount: 0,
    };
    expect(siteProcess.reducer(state, loadMaxAndMinPrice(guitars)))
      .toEqual({
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: guitars[guitars.length - 1].price,
        minGuitarPrice: guitars[0].price,
        discount: 0,
      });
  });
  it('should update Discount  by load data', () => {
    const state = {
      totalGuitarsCount: 0,
      isError404: false,
      maxGuitarPrice: 0,
      minGuitarPrice: 0,
      discount: 0,
    };
    expect(siteProcess.reducer(state, loadDiscount(mackDiscount)))
      .toEqual({
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 0,
        minGuitarPrice: 0,
        discount: mackDiscount,
      });
  });
});
