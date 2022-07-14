import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Routes} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import GuitarsCatalog from './guitars-catalog';
import * as Redux from 'react-redux';

describe('component: Pagination', () => {

  it('Should render page 1 correctly', () => {
    const mockGuitars = [makeFakeGuitarData(), makeFakeGuitarData()];
    const mockSearchResult = [makeFakeGuitarData()];
    const history = createMemoryHistory();
    const route = '/catalog/page_1';
    history.push(route);

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
      SITE: {
        totalGuitarsCount: 2,
        isError404: false,
        maxGuitarPrice: 1700,
        minGuitarPrice: 35000,
        discount: 0,
      },

    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path='/catalog/page_:slug'
              element={
                <GuitarsCatalog />
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(useDispatch).toBeCalled();

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();

  });


});
