import { Link } from 'react-router-dom';
import { RATING } from '../../const';
import {GuitarData} from '../../types/guitar';
import RatingStar from '../rating-start/rating-star';

type GuitarCardProps = {
    guitar: GuitarData
}

function GuitarCard({guitar}: GuitarCardProps): JSX.Element {


  return (
    <div className="product-card">
      <img src={`/${guitar.previewImg}`} srcSet="img/content/catalog-product-0@2x.jpg 2x" width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStar ratingNumber={guitar.rating}/>
          <p className="visually-hidden">Рейтинг: {RATING[guitar.rating]}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.comments.length}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{new Intl.NumberFormat('ru-RU').format(guitar.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons"><Link to={`/product/${guitar.id}`} className="button button--mini" >Подробнее</Link><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
