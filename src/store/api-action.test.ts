import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action} from 'redux';
import { State } from '../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { fetchGuitarsAction, fetchOneGuitarCardAction, addNewCommentAction, fetchSearchResultGuitarsAction, fetchMaxAndMinPriceAction, fetchGuitarForCartAction, fetchDiscountAction } from './api-action';
import { makeFakeGuitarData, makeFakeGuitarDataForCart } from '../utils/mocks';
import { API_ROUTE } from '../const';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  jest.mock('./api/api', () => mockAPI);

  const fakeStore = configureMockStore<
        State,
        Action,
        ThunkDispatch<State, typeof api, Action>
        >(middlewares);

  it('should dispatch guitars when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitars = [makeFakeGuitarData(), makeFakeGuitarData()];

    const expectedActions = [
      {
        type: fetchGuitarsAction.pending.type,
      },
      {
        type: fetchGuitarsAction.fulfilled.type,
      },
    ];

    const guitarsTypesChecked = {
      ukulele: false,
      electric: false,
      acoustic: false,
    };

    const slug = '1';
    const sortQuery = null;
    const orderQuery = null;
    const priceFromQuery = null;
    const priceToQuery = null;

    const stringsCount = {
      4: false,
      6: false,
      7: false,
      12: false,
    };

    mockAPI.onGet('/guitars?_embed=comments&_start=0&_limit=9').reply(200, mockGuitars);

    expect(mockStore.getActions()).toEqual([]);

    await mockStore.dispatch(fetchGuitarsAction({slug, sortQuery, orderQuery, priceFromQuery, priceToQuery, guitarsTypesChecked, stringsCount}));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch guitar when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitar = makeFakeGuitarData();

    const expectedActions = [
      {
        type: fetchOneGuitarCardAction.pending.type,
      },
      {
        type: fetchOneGuitarCardAction.fulfilled.type,
      },
    ];

    mockAPI.onGet('/guitars/1?_embed=comments').reply(200, mockGuitar);

    await mockStore.dispatch(fetchOneGuitarCardAction('1'));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);

  });


  it('should dispatch posted comment when server return 200', async () => {

    const fakeNewCommentData = {comment: {
      guitarId: 1,
      userName: 'Fake',
      advantage: 'Fake',
      disadvantage: 'Fake',
      comment: 'Fake',
      rating: 1,
    }, setIsSavingCb: () => null , setIsSuccessReviewModalOpenedCb: () => null, setIsFormModalOpenedCb : () => null };

    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitar = makeFakeGuitarData();

    const expectedActions = [
      {
        type: addNewCommentAction.pending.type,
      },
      {
        type: addNewCommentAction.fulfilled.type,
      },
    ];

    mockAPI.onGet(API_ROUTE.Comments).reply(200, mockGuitar);

    await mockStore.dispatch(addNewCommentAction(fakeNewCommentData));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );
    expect(actions).toEqual(expectedActions);

  });

  it('should dispatch search result guitars when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitars = [makeFakeGuitarData(), makeFakeGuitarData()];

    const expectedActions = [
      {
        type: fetchSearchResultGuitarsAction.pending.type,
      },
      {
        type: fetchSearchResultGuitarsAction.fulfilled.type,
      },
    ];

    const searchDataMock = 'Честер';

    mockAPI.onGet('/guitars?name_like=Честер').reply(200, mockGuitars);

    await mockStore.dispatch(fetchSearchResultGuitarsAction(searchDataMock));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);

  });

  it('should dispatch guitars for max and min price when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitars = [makeFakeGuitarData(), makeFakeGuitarData()];

    const expectedActions = [
      {
        type: fetchMaxAndMinPriceAction.pending.type,
      },
      {
        type: fetchMaxAndMinPriceAction.fulfilled.type,
      },
    ];

    const guitarsTypesChecked = {
      ukulele: false,
      electric: false,
      acoustic: false,
    };

    const priceFrom = null;
    const priceTo = null;

    const stringsCount = {
      4: false,
      6: false,
      7: false,
      12: false,
    };


    mockAPI.onGet('/guitars?_sort=price').reply(200, mockGuitars);

    await mockStore.dispatch(fetchMaxAndMinPriceAction({priceFrom, priceTo, guitarsTypesChecked, stringsCount}));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch guitar for cart when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitar = makeFakeGuitarDataForCart();

    const fakeFetchGuitarForCartData = {
      guitarId: 1, setIsAddToCartModalOpenCb: () => null , setIsSuccessAddToCartModalOpenCb: () => null, setIsAddingCb : () => null };

    const expectedActions = [
      {
        type: fetchGuitarForCartAction.pending.type,
      },
      {
        type: fetchGuitarForCartAction.fulfilled.type,
      },
    ];

    mockAPI.onGet('/guitars/1').reply(200, mockGuitar);

    await mockStore.dispatch(fetchGuitarForCartAction(fakeFetchGuitarForCartData));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);

  });

  it('should dispatch Discount when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mackDiscount = Math.floor(Math.random() * 100);

    const fakeFetchDiscountData = {
      promoCode: '1', setIsAddingCb: () => null , setIsValidCb: () => null};

    const expectedActions = [
      {
        type: fetchDiscountAction.pending.type,
      },
      {
        type: fetchDiscountAction.fulfilled.type,
      },
    ];

    mockAPI.onGet('/coupons').reply(200, mackDiscount);

    await mockStore.dispatch(fetchDiscountAction(fakeFetchDiscountData));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);

  });

});


