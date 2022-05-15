import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import ProductTabs from './product-tabs';

describe('component: ProductTabs', () => {
  it('Renders ProductTabs description', () => {
    const mockGuitar = makeFakeGuitarData();

    const history = createMemoryHistory();
    history.push('#description');
    render(
      <Router location={history.location} navigator={history}>
        <ProductTabs
          guitar={mockGuitar}
        />
      </Router>,
    );

    const linkCharacteristics = screen.getByText(/Характеристики/i);
    const linkDescription = screen.getByText(/Описание/i);
    expect(linkCharacteristics).toBeInTheDocument();
    expect(linkDescription).toBeInTheDocument();
    const description = screen.getByText(new RegExp(mockGuitar.description, 'i'));
    expect(description).toBeInTheDocument();

  });

  it('Renders ProductTabs characteristics', () => {
    const mockGuitar = makeFakeGuitarData();

    const history = createMemoryHistory();
    history.push('#characteristics');
    render(
      <Router location={history.location} navigator={history}>
        <ProductTabs
          guitar={mockGuitar}
        />
      </Router>,
    );

    const linkCharacteristics = screen.getByText(/Характеристики/i);
    const linkDescription = screen.getByText(/Описание/i);
    expect(linkCharacteristics).toBeInTheDocument();
    expect(linkDescription).toBeInTheDocument();
    const characteristics = screen.getByText(new RegExp(mockGuitar.vendorCode, 'i'));
    expect(characteristics).toBeInTheDocument();
  });

});
