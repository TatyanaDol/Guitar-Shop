import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {Route, Router, Routes} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import FilterPriceRange from './filter-price-range';


describe('component: FilterPriceRange', () => {
  it('Should render FilterPriceRange', () => {

    const mockGuitar = makeFakeGuitarData();
    const setMinPriceInputValue = jest.fn();
    const setMaxPriceInputValue = jest.fn();
    const history = createMemoryHistory();
    const route = '/catalog/page_1';
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
                <FilterPriceRange minPriceInputValue={''}
                  maxPriceInputValue={''}
                  setMinPriceInputValue={setMinPriceInputValue}
                  setMaxPriceInputValue={setMaxPriceInputValue}
                />
              }
            />
          </Routes>
        </Router>
      </Provider>,
    );

    const fromInput = screen.getByTestId('from') as HTMLInputElement;

    const toInput = screen.getByTestId('to') as HTMLInputElement;

    userEvent.type(fromInput, `${mockGuitar.price + 500}`);
    userEvent.type(toInput, `${mockGuitar.price + 700}`);

    expect(setMinPriceInputValue).toBeCalled();
    expect(setMaxPriceInputValue).toBeCalled();

  });

});
