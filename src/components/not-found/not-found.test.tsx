import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import NotFound from './not-found';

describe('component: NotFound', () => {
  it('Should render correctly', () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <NotFound />
      </Router>,
    );

    const headerElement = screen.getByText(/404. Page not found/i);
    const linkElement = screen.getByText(/Вернуться на главную страницу/i);
    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();

  });


});
