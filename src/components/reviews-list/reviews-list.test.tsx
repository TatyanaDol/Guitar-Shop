import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {BrowserRouter, Router} from 'react-router-dom';
import { makeFakeGuitarData } from '../../utils/mocks';
import ReviewsList from './reviews-list';


describe('component: ReviewsList', () => {
  it('Renders ReviewsList-component', () => {
    const mockGuitar = makeFakeGuitarData();

    render(
      <BrowserRouter>
        <ReviewsList
          reviews={mockGuitar.comments}
          guitarName={mockGuitar.name}
          id={mockGuitar.id}
        />
      </BrowserRouter>,
    );

    const textButtonElement = screen.getByText(/Оставить отзыв/i);
    expect(textButtonElement).toBeInTheDocument();
  });

  it('Buttton Оставить отзыв on click should open review modal', async () => {
    const mockGuitar = makeFakeGuitarData();

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 0},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ReviewsList
            reviews={mockGuitar.comments}
            guitarName={mockGuitar.name}
            id={mockGuitar.id}
          />
        </Router>
      </Provider>,
    );

    const textButtonElement = screen.getByText(/Оставить отзыв/i);
    expect(textButtonElement).toBeInTheDocument();
    userEvent.click(textButtonElement);
    const ratingElement = await screen.findByText(/Ваша Оценка/i);
    expect(ratingElement).toBeInTheDocument();
  });

  it('Buttton Close on click should close review modal', async () => {
    const mockGuitar = makeFakeGuitarData();

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 0},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ReviewsList
            reviews={mockGuitar.comments}
            guitarName={mockGuitar.name}
            id={mockGuitar.id}
          />
        </Router>
      </Provider>,
    );

    const textButtonElement = screen.getByText(/Оставить отзыв/i);
    expect(textButtonElement).toBeInTheDocument();
    userEvent.click(textButtonElement);
    const radioDivElement = await screen.findByText(/Ваша Оценка/i);
    expect(radioDivElement).toBeInTheDocument();
    const closeButtonElement = screen.getByTestId('close');
    userEvent.click(closeButtonElement);
    expect(screen.queryByTestId('close')).not.toBeInTheDocument();
  });

});
