import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {Route, Router, Routes} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import CatalogFilterForm from './catalog-filter-form';

describe('component: CatalogFilterForm', () => {
  it('Should render CatalogFilterForm', () => {
    const mockGuitar = makeFakeGuitarData();
    const history = createMemoryHistory();
    const route = '/catalog/page_1?_sort=rating';
    history.push(route);

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [makeFakeGuitarData(), makeFakeGuitarData()],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: mockGuitar.price + 1000,
        minGuitarPrice: mockGuitar.price,
      },
    });


    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path='/catalog/page_:slug'
              element={
                <CatalogFilterForm />
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Очистить/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Укулеле/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();

  });

  it('Should delete search params on click', () => {
    const mockGuitar = makeFakeGuitarData();
    const history = createMemoryHistory();
    const route = '/catalog/page_1?_sort=rating';
    history.push(route);

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [makeFakeGuitarData(), makeFakeGuitarData()],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        searchResultGuitars: [],
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: mockGuitar.price + 1000,
        minGuitarPrice: mockGuitar.price,
      },
    });


    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path='/catalog/page_:slug'
              element={
                <CatalogFilterForm />
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );


    const buttonReset = screen.getByText(/Очистить/i);
    expect(history.location.search).toEqual('?_sort=rating');
    userEvent.click(buttonReset);
    expect(history.location.search).toEqual('');

  });

});

