import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {fireEvent, render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Routes} from 'react-router-dom';
import { makeFakeGuitarDataForCart } from '../../utils/mocks';
import { AppRoute } from '../../const';
import * as Redux from 'react-redux';
import CartContent from './cart-content';

describe('component: CartContent', () => {

  const mockGuitar = makeFakeGuitarDataForCart();

  const mockStore = configureMockStore([...getDefaultMiddleware()]);

  const store = mockStore({
    DATA: {
      guitars: [],
      isGuitarsDataLoaded: true,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: true,
      searchResultGuitars: [],
      guitarsInCart: [mockGuitar],
    },
    SITE: {totalGuitarsCount: 0,
      isError404: false,
      maxGuitarPrice: 0,
      minGuitarPrice: 0,
      discount: 0},
  });

  const history = createMemoryHistory();

  beforeEach(() => {
    history.push('/cart');
  });

  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>

          <Routes>
            <Route path='/cart'
              element={
                <CartContent />
              }
            />
          </Routes>

        </Router>
      </Provider>,
    );

    const guitarNameElements = screen.getAllByText(new RegExp(mockGuitar.name, 'i'));
    expect(guitarNameElements[0]).toBeInTheDocument();

    expect(useDispatch).toBeCalled();


  });

  it('When click breadcrumbs link should redirect', () => {
    history.push = jest.fn();
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path={'/cart'}
              element={<CartContent />}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>Mock main catalog</h1>}
            />
          </Routes>
        </Router>
      </Provider>,
    );

    const guitarNameElements = screen.getAllByText(new RegExp(mockGuitar.name, 'i'));
    expect(guitarNameElements[0]).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Главная/i));

    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/',
        search: '',
      }, undefined);

  });


});
