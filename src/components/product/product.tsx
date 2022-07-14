import { useState } from 'react';
import { RATING} from '../../const';
import { GuitarData } from '../../types/guitar';
import { getGuitarImgForSrcSet } from '../../utils/utils';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';
import AddToCartSuccessModal from '../add-to-cart-success-modal/add-to-cart-success-modal';
import ProductTabs from '../product-tabs/product-tabs';
import RatingStar from '../rating-start/rating-star';

type ProductProps = {
    guitar: GuitarData
}

function Product({guitar}: ProductProps): JSX.Element {

  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [isSuccessAddToCartModalOpen, setIsSuccessAddToCartModalOpen] = useState(false);

  return (
    <div className="product-container"><img className="product-container__img" src={`/${guitar.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitar.previewImg)}@2x.jpg 2x`} width="90" height="235" alt={guitar.name}/>
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
        <p className="product-container__price-info product-container__price-info--value">{new Intl.NumberFormat('ru-RU').format(guitar.price)} ₽</p><a className="button button--red button--big product-container__button" href="#" onClick={() => setIsAddToCartModalOpen(true)}>Добавить в корзину</a>
      </div>
      {isAddToCartModalOpen && <AddToCartModal guitar={guitar} setIsAddToCartModalOpenCb={setIsAddToCartModalOpen} setIsSuccessAddToCartModalOpenCb={setIsSuccessAddToCartModalOpen}/>}
      {isSuccessAddToCartModalOpen && <AddToCartSuccessModal setIsSuccessAddToCartModalOpenCb={setIsSuccessAddToCartModalOpen}/>}
    </div>
  );
}

export default Product;
