import {makeFakeGuitarData, makeFakeReview} from '../../utils/mocks';
import { guitarsDataProcess, loadGuitars, loadOneGuitarCard, loadPostedComment, loadSearchResultGuitars } from './guitars-data-process';

const guitars = [makeFakeGuitarData(), makeFakeGuitarData()];
const guitar = makeFakeGuitarData();
const commentPost = makeFakeReview();
const guitarWithcommentPost = {...guitar};
guitarWithcommentPost.comments = [commentPost, ...guitarWithcommentPost.comments];

describe('Reducer: Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsDataProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
      });
  });
  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
    };
    expect(guitarsDataProcess.reducer(state, loadGuitars(guitars)))
      .toEqual({
        guitars: guitars,
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
      });
  });
  it('should update guitar by load guitar', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
    };
    expect(guitarsDataProcess.reducer(state, loadOneGuitarCard(guitar)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: guitar,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: [],
      });
  });
  it('should update oneGuitarCard comments by load comment', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: guitar,
      isOneGuitarCardDataLoaded: true,
      searchResultGuitars: [],
    };
    expect(guitarsDataProcess.reducer(state, loadPostedComment(commentPost)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: guitarWithcommentPost,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: [],
      });
  });
  it('should update searchResultGuitars by load guitars', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
    };
    expect(guitarsDataProcess.reducer(state, loadSearchResultGuitars(guitars)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: guitars,
      });
  });
});

