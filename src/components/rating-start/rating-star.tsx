const STARS_COUNT = 5;

type RatingStarProps = {
    guitarRating: 1 | 2 | 3 | 4 | 5
}

function RatingStar({guitarRating}: RatingStarProps): JSX.Element {
  return (
    <>
      {
        Array.from({ length: STARS_COUNT }, (v, k) => k).map((_, ind) => (
          <svg key={_} width="12" height="11" aria-hidden="true">
            <use xlinkHref={guitarRating >= (ind + 1) ? '#icon-full-star' : '#icon-star'}></use>
          </svg>))
      }
    </>
  );
}

export default RatingStar;
