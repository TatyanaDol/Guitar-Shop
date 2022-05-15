import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {fireEvent, render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Routes} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import ProductCard from './product-card';
import { AppRoute } from '../../const';
import * as Redux from 'react-redux';

describe('component: ProductCard', () => {

  const mockGuitar = makeFakeGuitarData();

  const mockStore = configureMockStore([...getDefaultMiddleware()]);

  const store = mockStore({
    DATA: {
      guitars: [],
      isGuitarsDataLoaded: true,
      oneGuitarCard: mockGuitar,
      isOneGuitarCardDataLoaded: true,
    },
    SITE: {totalGuitarsCount: 0},
  });

  const history = createMemoryHistory();

  beforeEach(() => {
    history.push(`/product/${mockGuitar.id}`);
  });

  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>

          <Routes>
            <Route path='/product/:id'
              element={
                <ProductCard />
              }
            />
          </Routes>

        </Router>
      </Provider>,
    );

    const guitarNameElements = screen.getAllByText(new RegExp(mockGuitar.name, 'i'));
    expect(guitarNameElements[0]).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);


  });

  it('When click breadcrumbs link should redirect', () => {
    history.push = jest.fn();
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path={`/product/${mockGuitar.id}`}
              element={<ProductCard />}
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
