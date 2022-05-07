import { RATING } from '../../const';
import {CommentData} from '../../types/guitar';
import RatingStar from '../rating-start/rating-star';

type ReviewProps = {
    review: CommentData
}

function Review({review}: ReviewProps): JSX.Element {


  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4><span className="review__date">{new Date(review.createAt).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric' })}</span>
      </div>
      <div className="rate review__rating-panel">
        <RatingStar ratingNumber={review.rating}/>

        <p className="visually-hidden">Оценка: {RATING[review.rating]}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{review.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{review.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{review.comment}</p>
    </div>
  );

}

export default Review;
