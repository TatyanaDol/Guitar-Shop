import {fireEvent, render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {Route, Router, Routes} from 'react-router-dom';
import FilterStrings from './filter-strings';

describe('component: FilterStrings', () => {
  it('Should render FilterStrings with checked guitar type electric', () => {
    const history = createMemoryHistory();
    const route = '/catalog/page_1?type=electric';
    history.push(route);
    const setResetCb = jest.fn();


    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:slug'
            element={
              <FilterStrings reset={false}
                setResetCb={setResetCb}
              />
            }
          />
        </Routes>
      </Router>,
    );

    const Strings12Checkbox = screen.getByTestId('12-strings') as HTMLInputElement;

    expect(Strings12Checkbox.disabled).toEqual(true);

  });

  it('Should on click change search params', () => {
    const history = createMemoryHistory();
    const route = '/catalog/page_1?type=electric';
    history.push(route);
    const setResetCb = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:slug'
            element={
              <FilterStrings reset={false}
                setResetCb={setResetCb}
              />
            }
          />
        </Routes>
      </Router>,
    );

    const Strings6Checkbox = screen.getByTestId('6-strings') as HTMLInputElement;

    expect(Strings6Checkbox.disabled).toEqual(false);

    fireEvent.click(Strings6Checkbox);

    expect(history.location.search).toEqual('?type=electric&stringCount=6');

  });


});
