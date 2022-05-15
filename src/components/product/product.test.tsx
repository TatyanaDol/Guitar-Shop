import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import Product from './product';

describe('component: Product', () => {
  it('Should render correctly', () => {
    const mockGuitar = makeFakeGuitarData();

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Product
          guitar={mockGuitar}
        />
      </Router>,
    );

    const titleElement = screen.getByText(new RegExp(mockGuitar.name, 'i'));
    const buttonElement = screen.getByText(/Добавить в корзину/i);
    expect(titleElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

  });


});
