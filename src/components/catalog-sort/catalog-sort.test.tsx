import {fireEvent, render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import {Route, Router, Routes} from 'react-router-dom';
import CatalogSort from './catalog-sort';

describe('component: CatalogSort', () => {
  it('Should render CatalogSort', () => {
    const history = createMemoryHistory();
    const route = '/catalog/page_1';
    history.push(route);


    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:slug'
            element={
              <CatalogSort />
            }
          />
        </Routes>
      </Router>,
    );

    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();


  });

  it('CatalogSort should change search params', async () => {
    const history = createMemoryHistory();
    const route = '/catalog/page_1';
    history.push(route);


    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:slug'
            element={
              <CatalogSort />
            }
          />
        </Routes>
      </Router>,
    );

    const button = screen.getByText(/по популярности/i);

    expect(history.location.search).toEqual('');

    fireEvent.click(button);

    expect(history.location.search).toEqual('?_sort=rating');

  });
});
