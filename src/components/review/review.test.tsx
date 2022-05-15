import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import { makeFakeReview } from '../../utils/mocks';
import Review from './review';

describe('component: Review', () => {
  it('Renders Review-component', () => {
    const mockReview = makeFakeReview();

    render(
      <BrowserRouter>
        <Review
          review={mockReview}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
  });
});

