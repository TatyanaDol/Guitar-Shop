import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import { makeFakeGuitarData, makeFakeGuitarDataForCart } from '../../utils/mocks';
import ModalDeleteGuitar from './modal-delete-guitar';


describe('component: ModalDeleteGuitar', () => {
  it('Should render correctly', () => {
    const handleSetIsModalDeleteItemOpen = jest.fn();
    const mockGuitarForCart = makeFakeGuitarDataForCart();
    const mockGuitar = makeFakeGuitarData();

    const history = createMemoryHistory();

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: mockGuitar,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: [],
        guitarsInCart: [mockGuitarForCart],
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
          <ModalDeleteGuitar
            guitar={mockGuitarForCart}
            setIsModalDeleteItemOpenCb={handleSetIsModalDeleteItemOpen}
          />
        </Router>
      </Provider>,
    );

    const buttonElement = screen.getByText(/Продолжить покупки/i);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(buttonElement);
    expect(handleSetIsModalDeleteItemOpen).toBeCalled();

  });

});
