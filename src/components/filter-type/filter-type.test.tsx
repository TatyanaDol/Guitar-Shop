import {fireEvent, render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {Route, Router, Routes} from 'react-router-dom';
import FilterType from './filter-type';

describe('component: FilterType', () => {
  it('Should render FilterType with checked guitar type electric', () => {
    const history = createMemoryHistory();
    const route = '/catalog/page_1?type=electric';
    history.push(route);


    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:slug'
            element={
              <FilterType />
            }
          />
        </Routes>
      </Router>,
    );

    const electricCheckbox = screen.getByTestId('electric-checkbox') as HTMLInputElement;

    const acousticCheckbox = screen.getByTestId('acoustic-checkbox') as HTMLInputElement;

    expect(electricCheckbox.checked).toEqual(true);
    expect(acousticCheckbox.checked).toEqual(false);

  });

  it('Should on event click change search params', async () => {
    const history = createMemoryHistory();
    const route = '/catalog/page_1?type=electric';
    history.push(route);


    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:slug'
            element={
              <FilterType />
            }
          />
        </Routes>
      </Router>,
    );

    const acousticCheckbox = screen.getByTestId('acoustic-checkbox');

    expect(history.location.search).toEqual('?type=electric');

    fireEvent.click(acousticCheckbox);

    expect(history.location.search).toEqual('?type=acoustic&type=electric');

  });
});

