import {GuitarData} from '../../types/guitar';

type GuitarCardProps = {
    guitar: GuitarData
}

const STARS_COUNT = 5;

const RATING = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Удовлетворительно',
  4: 'Хорошо',
  5: 'Отлично',
} as const;


function GuitarCard({guitar}: GuitarCardProps): JSX.Element {


  return (
    <div className="product-card">
      <img src={`/${guitar.previewImg}`} srcSet="img/content/catalog-product-0@2x.jpg 2x" width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            Array.from({ length: STARS_COUNT }, (v, k) => k).map((_, ind) => (
              <svg key={_} width="12" height="11" aria-hidden="true">
                <use xlinkHref={guitar.rating >= (ind + 1) ? '#icon-full-star' : '#icon-star'}></use>
              </svg>))
          }
          <p className="visually-hidden">Рейтинг: {RATING[guitar.rating]}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.comments.length}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{new Intl.NumberFormat('ru-RU').format(guitar.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
