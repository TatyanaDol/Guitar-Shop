import { GUITAR_TYPE, RATING} from '../../const';
import { GuitarData } from '../../types/guitar';
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
          <RatingStar guitarRating={guitar.rating}/>
          <p className="visually-hidden">Оценка: {RATING[guitar.rating]}</p>
        </div>
        <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
          <div className="tabs__content" id="characteristics">
            <table className="tabs__table">
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{guitar.vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{GUITAR_TYPE[guitar.type]}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{guitar.stringCount} струнная</td>
              </tr>
            </table>
            <p className="tabs__product-description hidden">{guitar.description}</p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{new Intl.NumberFormat('ru-RU').format(guitar.price)} ₽</p><a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
      </div>
    </div>
  );
}

export default Product;
