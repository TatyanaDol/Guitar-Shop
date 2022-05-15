import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import RatingStar from './rating-star';


describe('component: RatingStar', () => {
  it('Renders RatingStar-component', () => {
    const mockRating = 2;

    render(
      <BrowserRouter>
        <RatingStar
          ratingNumber={mockRating}
        />
      </BrowserRouter>,
    );
    const starsElements = screen.getAllByTitle('Star');
    expect(starsElements[0]).toBeInTheDocument();
    expect(starsElements[4]).toBeInTheDocument();

  });
});

