import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Routes} from 'react-router-dom';
import {  makeFakeGuitarDataForCart} from '../../utils/mocks';
import CartItem from './cart-item';

describe('component: CartItem', () => {
  it('Renders CartItem-component', () => {
    const mockGuitar = makeFakeGuitarDataForCart();
    mockGuitar.quantity = 1;
    const history = createMemoryHistory();
    history.push = jest.fn();

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [mockGuitar],
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 0,
        minGuitarPrice: 0,
        discount: 0,
      },
    });


    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path='/'
              element={<CartItem guitarInfo={mockGuitar}/>}
            />
          </Routes>
        </Router>,
      </Provider>,
    );


    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockGuitar.name, 'i'))).toBeInTheDocument();

  });
});

