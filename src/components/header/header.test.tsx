import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Header from './header';


describe('component: Header', () => {
  it('Renders Header-component', () => {

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что вы ищите?/i)).toBeInTheDocument();
  });
});
