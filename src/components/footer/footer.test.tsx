import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Footer from './footer';

describe('component: Footer', () => {
  it('Renders Footer-component', () => {

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i)).toBeInTheDocument();
    expect(screen.getByText(/Сервис-центры/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
  });
});
