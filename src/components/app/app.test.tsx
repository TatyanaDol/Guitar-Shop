import {render, screen} from '@testing-library/react';
import App from './app';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { makeFakeGuitarData } from '../../utils/mocks';


describe('Application Routing', () => {

  it('should render mainScreen catalog when navigate to "/"', () => {

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const mockSearchResult = [makeFakeGuitarData()];

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: mockSearchResult,
        guitarsInCart: [],
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 1700,
        minGuitarPrice: 35000,
        discount: 0,
      },
    });

    const history = createMemoryHistory();
    history.push('/');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();

  });
  it('should render catalog page when navigate to "/catalog/page_1"', () => {
    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const mockSearchResult = [makeFakeGuitarData()];

    const store = mockStore({
      DATA: {
        guitars: [makeFakeGuitarData(), makeFakeGuitarData()],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
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

    const history = createMemoryHistory();
    history.push('/catalog/page_1');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();

  });
  it('should render product page when navigate to "/product/1"', () => {
    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const mockSearchResult = [makeFakeGuitarData()];

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: makeFakeGuitarData(),
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: mockSearchResult,
        guitarsInCart: [],
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 1700,
        minGuitarPrice: 35000,
        discount: 0,
      },
    });

    const history = createMemoryHistory();
    history.push('/product/1');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();

  });
  it('should render NotFound page when navigate to non-existent-route', () => {
    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
        guitarsInCart: [],
      },
      SITE: {totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 1700,
        minGuitarPrice: 35000,
        discount: 0},
    });

    const history = createMemoryHistory();
    history.push('/non-existent-route');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );

    const headerElement = screen.getByText(/404. Page not found/i);
    const linkElement = screen.getByText(/Вернуться на главную страницу/i);
    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();

  });

  it('should render Cart page  when navigate to "/cart"', () => {
    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const mockSearchResult = [makeFakeGuitarData()];

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: makeFakeGuitarData(),
        isOneGuitarCardDataLoaded: true,
        searchResultGuitars: mockSearchResult,
        guitarsInCart: [],
      },
      SITE: {
        totalGuitarsCount: 0,
        isError404: false,
        maxGuitarPrice: 1700,
        minGuitarPrice: 35000,
        discount: 0,
      },
    });

    const history = createMemoryHistory();
    history.push('/cart');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();

  });

});
