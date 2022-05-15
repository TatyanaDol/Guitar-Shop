const STARS_COUNT = 5;

type RatingStarProps = {
    ratingNumber: 1 | 2 | 3 | 4 | 5
}

function RatingStar({ratingNumber}: RatingStarProps): JSX.Element {
  return (
    <>
      {
        Array.from({ length: STARS_COUNT }, (v, k) => k).map((_, ind) => (
          <svg key={_} width="12" height="11" aria-hidden="true">
            <title>Star</title>
            <use xlinkHref={ratingNumber >= (ind + 1) ? '#icon-full-star' : '#icon-star'}></use>
          </svg>))
      }
    </>
  );
}

export default RatingStar;
