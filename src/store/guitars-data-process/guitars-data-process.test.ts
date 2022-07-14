import {makeFakeGuitarData, makeFakeGuitarDataForCart, makeFakeReview} from '../../utils/mocks';
import { decrementGuitarQuantityInCart, deleteGuitarFromCart, guitarsDataProcess, incrementGuitarQuantityInCart, loadGuitarDataForCart, loadGuitars, loadOneGuitarCard, loadPostedComment, loadSearchResultGuitars } from './guitars-data-process';

const guitars = [makeFakeGuitarData(), makeFakeGuitarData()];
const guitar = makeFakeGuitarData();
const commentPost = makeFakeReview();
const guitarWithcommentPost = {...guitar};
guitarWithcommentPost.comments = [commentPost, ...guitarWithcommentPost.comments];

const guitarForCartMock = makeFakeGuitarDataForCart();
const guitarForCartMockWithQuatity = {...guitarForCartMock};
guitarForCartMockWithQuatity.quantity = 1;

const guitarForCartMockQuantity2 = {...guitarForCartMock};
guitarForCartMockQuantity2.quantity = 2;

describe('Reducer: Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsDataProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [],
      });
  });
  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
      guitarsInCart: [],
    };
    expect(guitarsDataProcess.reducer(state, loadGuitars(guitars)))
      .toEqual({
        guitars: guitars,
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [],
      });
  });
  it('should update guitar by load guitar', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
      guitarsInCart: [],
    };
    expect(guitarsDataProcess.reducer(state, loadOneGuitarCard(guitar)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: guitar,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: [],
        guitarsInCart: [],
      });
  });
  it('should update oneGuitarCard comments by load comment', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: guitar,
      isOneGuitarCardDataLoaded: true,
      searchResultGuitars: [],
      guitarsInCart: [],
    };
    expect(guitarsDataProcess.reducer(state, loadPostedComment(commentPost)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: guitarWithcommentPost,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: [],
        guitarsInCart: [],
      });
  });
  it('should update searchResultGuitars by load guitars', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
      guitarsInCart: [],
    };
    expect(guitarsDataProcess.reducer(state, loadSearchResultGuitars(guitars)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: guitars,
        guitarsInCart: [],
      });
  });
  it('should update guitarsInCart by load guitar', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
      guitarsInCart: [],
    };
    expect(guitarsDataProcess.reducer(state, loadGuitarDataForCart(guitarForCartMock)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [guitarForCartMockWithQuatity],
      });
  });
  it('should update guitarsInCart by decrementing Guitar quantity', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
      guitarsInCart: [guitarForCartMockWithQuatity],
    };
    expect(guitarsDataProcess.reducer(state, decrementGuitarQuantityInCart(guitarForCartMockWithQuatity.id)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [],
      });
  });
  it('should update guitarsInCart by deleting Guitar from Cart', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
      guitarsInCart: [guitarForCartMockWithQuatity],
    };
    expect(guitarsDataProcess.reducer(state, deleteGuitarFromCart(guitarForCartMockWithQuatity.id)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [],
      });
  });
  it('should update guitarsInCart by incrementing Guitar quantity in Cart', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      searchResultGuitars: [],
      guitarsInCart: [guitarForCartMockWithQuatity],
    };
    expect(guitarsDataProcess.reducer(state, incrementGuitarQuantityInCart(guitarForCartMockWithQuatity.id)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [guitarForCartMockQuantity2],
      });
  });
});

