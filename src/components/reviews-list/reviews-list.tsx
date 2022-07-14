import { useEffect, useState } from 'react';
import { REVIEWS_COUNT_PER_STEP } from '../../const';
import {CommentsData} from '../../types/guitar';
import { sortReviewsByDate } from '../../utils/utils';
import ModalReviewForm from '../modal-review-form/modal-review-form';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import Review from '../review/review';
import { ShowMoreButton } from '../show-more-button/show-more-button';

type ReviewsListProps = {
    reviews: CommentsData
    guitarName: string
    id: number
}

function ReviewsList({reviews, guitarName, id}: ReviewsListProps): JSX.Element {

  const sortedReviews = sortReviewsByDate(reviews);

  const [reviewsForRender, setReviewsForRender] = useState(sortedReviews.slice(0, REVIEWS_COUNT_PER_STEP));
  const [renderedReviewsCount, setRenderedReviewsCount] = useState(REVIEWS_COUNT_PER_STEP);

  const [isReviewFormModalOpened, setIsReviewFormModalOpened] = useState(false);
  const [isSuccessReviewModalOpened, setIsSuccessReviewModalOpened] = useState(false);

  useEffect(() => {
    setReviewsForRender(sortedReviews.slice(0, renderedReviewsCount));
    return () => {
      setReviewsForRender([]);
    };
  }, [renderedReviewsCount]);

  useEffect(() => {
    setReviewsForRender(sortedReviews.slice(0, REVIEWS_COUNT_PER_STEP));
    return () => {
      setReviewsForRender([]);
    };
  }, [reviews]);


  function handleShowMoreButtonClick() {
    setRenderedReviewsCount(renderedReviewsCount + REVIEWS_COUNT_PER_STEP);
  }

  return (

    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#" onClick={(evt) => setIsReviewFormModalOpened(true)}>Оставить отзыв</a>
      {reviewsForRender.map((review) => <Review key={review.id} review={review} />,
      )}
      {
        renderedReviewsCount <  reviews.length && <ShowMoreButton onClickCb={handleShowMoreButtonClick} />
      }

      <button className="button button--up button--red-border button--big reviews__up-button" onClick={(evt) => window.scroll(0,0)}>Наверх
      </button>

      {isReviewFormModalOpened && <ModalReviewForm id={id} guitarName={guitarName} setIsFormModalOpenedCb={setIsReviewFormModalOpened} setIsSuccessReviewModalOpenedCb={setIsSuccessReviewModalOpened} />}
      {isSuccessReviewModalOpened && <ModalSuccessReview setIsSuccessReviewModalOpenedCb={setIsSuccessReviewModalOpened}/> }
    </section>

  );
}

export default ReviewsList;


