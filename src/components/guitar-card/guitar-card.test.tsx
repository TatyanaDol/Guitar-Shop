import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {fireEvent, render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Routes} from 'react-router-dom';
import { makeFakeGuitarData} from '../../utils/mocks';
import GuitarCard from './guitar-card';

describe('component: GuitarCard', () => {
  it('Renders GuitarCard-component', () => {
    const mockGuitar = makeFakeGuitarData();
    const history = createMemoryHistory();
    history.push = jest.fn();

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [makeFakeGuitarData(), makeFakeGuitarData()],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
        guitarsInCart: [],
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: mockGuitar.price + 1000,
        minGuitarPrice: mockGuitar.price,
        discount: 0,
      },
    });


    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path='/'
              element={<GuitarCard guitar={mockGuitar}/>}
            />
            <Route
              path={`/product/${mockGuitar.id}`}
              element={<h1>Mock product</h1>}
            />
          </Routes>
        </Router>,
      </Provider>,
    );


    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockGuitar.name, 'i'))).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Подробнее/i));

    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: `/product/${mockGuitar.id}`,
        search: '',
      }, undefined);

  });
});

