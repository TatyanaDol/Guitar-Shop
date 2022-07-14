import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import AddToCartModal from './add-to-cart-modal';

describe('component: AddToCartModal', () => {
  it('Should render AddToCartModal correctly', () => {
    const mockGuitar = makeFakeGuitarData();
    const setIsAddToCartModalOpen = jest.fn();
    const setIsSuccessAddToCartModalOpen = jest.fn();

    const history = createMemoryHistory();

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

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <AddToCartModal
            setIsAddToCartModalOpenCb={setIsAddToCartModalOpen}
            setIsSuccessAddToCartModalOpenCb={setIsSuccessAddToCartModalOpen}
            guitar={mockGuitar}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();

    expect(screen.getByTestId(/close/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/close/i));
    expect(setIsAddToCartModalOpen).toBeCalled();

  });

});
