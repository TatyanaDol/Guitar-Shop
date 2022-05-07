import { RATING} from '../../const';
import { GuitarData } from '../../types/guitar';
import ProductTabs from '../product-tabs/product-tabs';
import RatingStar from '../rating-start/rating-star';

type ProductProps = {
    guitar: GuitarData
}

function Product({guitar}: ProductProps): JSX.Element {
  return (
    <div className="product-container"><img className="product-container__img" src={`/${guitar.previewImg}`} srcSet="img/content/catalog-product-2@2x.jpg 2x" width="90" height="235" alt={guitar.name}/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
        <div className="rate product-container__rating">
          <RatingStar ratingNumber={guitar.rating}/>
          <p className="visually-hidden">Оценка: {RATING[guitar.rating]}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.comments.length}</p>
        </div>
        <ProductTabs guitar={guitar} />
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{new Intl.NumberFormat('ru-RU').format(guitar.price)} ₽</p><a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
      </div>
    </div>
  );
}

export default Product;
