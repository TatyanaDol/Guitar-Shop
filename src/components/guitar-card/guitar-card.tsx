import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RATING } from '../../const';
import { useAppSelector } from '../../hooks';
import {GuitarData} from '../../types/guitar';
import { getGuitarImgForSrcSet } from '../../utils/utils';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';
import AddToCartSuccessModal from '../add-to-cart-success-modal/add-to-cart-success-modal';
import RatingStar from '../rating-start/rating-star';
import {getGuitarsInCart} from '../../store/guitars-data-process/selectors';

type GuitarCardProps = {
    guitar: GuitarData
}


function GuitarCard({guitar}: GuitarCardProps): JSX.Element {

  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [isSuccessAddToCartModalOpen, setIsSuccessAddToCartModalOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(false);


  const guitarsInCart = useAppSelector(getGuitarsInCart);

  function checkIsInCart(id: number) {

    const check = guitarsInCart.find((element) => element.id === id);

    if(check) {
      return true;
    }

    return false;
  }

  useEffect(() => {

    setIsInCart(checkIsInCart(guitar.id));

  }, [guitarsInCart]);


  return (
    <>
      <div className="product-card">
        <img src={`/${guitar.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitar.previewImg)}@2x.jpg 2x`} width="75" height="190" alt={guitar.name} />
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
        <div className="product-card__buttons"><Link to={`/product/${guitar.id}`} className="button button--mini" >Подробнее</Link>
          {!isInCart && <a className="button button--red button--mini button--add-to-cart" href="#" onClick={() => setIsAddToCartModalOpen(true)}>Купить</a>}
          {isInCart && <Link to={'/cart'}><button className="button button--red-border button--mini button--in-cart">В Корзине</button></Link>}
        </div>
      </div>
      {isAddToCartModalOpen && <AddToCartModal guitar={guitar} setIsAddToCartModalOpenCb={setIsAddToCartModalOpen} setIsSuccessAddToCartModalOpenCb={setIsSuccessAddToCartModalOpen}/>}
      {isSuccessAddToCartModalOpen && <AddToCartSuccessModal setIsSuccessAddToCartModalOpenCb={setIsSuccessAddToCartModalOpen}/>}
    </>
  );
}

export default GuitarCard;
