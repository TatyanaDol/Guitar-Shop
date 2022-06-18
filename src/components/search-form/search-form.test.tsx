import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import SearchForm from './search-form';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';


describe('component: SearchForm', () => {
  it('Renders SearchForm-component', () => {

    const mockGuitars = [makeFakeGuitarData(), makeFakeGuitarData()];
    const history = createMemoryHistory();
    const mockStore = configureMockStore([...getDefaultMiddleware()]);
    const mockSearchResult = [makeFakeGuitarData()];

    const store = mockStore({
      DATA: {
        guitars: mockGuitars,
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: mockSearchResult,
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 1700,
        minGuitarPrice: 35000,
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <SearchForm />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('search-input'), `${mockSearchResult[0].name}`);

    expect(screen.getByDisplayValue(`${mockSearchResult[0].name}`)).toBeInTheDocument();

    expect(useDispatch).toBeCalled();

    expect(screen.getByText(`${mockSearchResult[0].name}`)).toBeInTheDocument();

  });

});
