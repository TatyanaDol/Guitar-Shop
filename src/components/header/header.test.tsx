import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import Header from './header';


describe('component: Header', () => {
  it('Renders Header-component', () => {

    const mockGuitars = [makeFakeGuitarData(), makeFakeGuitarData()];
    const mockSearchResult = [makeFakeGuitarData()];

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: mockGuitars,
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: mockSearchResult,
        guitarsInCart: [],
      },
      SITE: {totalGuitarsCount: 2},
      maxGuitarPrice: 1700,
      minGuitarPrice: 35000,
      discount: 0,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что вы ищите?/i)).toBeInTheDocument();
  });
});
