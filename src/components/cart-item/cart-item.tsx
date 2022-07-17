import React, { useRef, useState } from 'react';
import { GUITAR_TYPE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { decrementGuitarQuantityInCart, incrementGuitarQuantityInCart, setNewGuitarQuantityInCart } from '../../store/guitars-data-process/guitars-data-process';
import { GuitarInCartData } from '../../types/guitar';
import { getGuitarImgForSrcSet } from '../../utils/utils';
import ModalDeleteGuitar from '../modal-delete-guitar/modal-delete-guitar';

type CartItemProps = {
    guitarInfo: GuitarInCartData,
}

export default function CartItem({guitarInfo}: CartItemProps) {

  const countInputRef = useRef<HTMLInputElement>(null);

  const [isModalDeleteItemOpen, setIsModalDeleteItemOpen] = useState(false);

  const [guitarsCount, setGuitarsCount] = useState(1);

  const dispatch = useAppDispatch();

  function handleDecrementButtonClick() {
    if(guitarInfo.quantity > 1) {
      dispatch(decrementGuitarQuantityInCart(guitarInfo.id));
      setGuitarsCount(guitarInfo.quantity - 1);
    } else {
      setIsModalDeleteItemOpen(true);
    }
  }

  function handleIncrementButtonClick() {
    if(guitarInfo.quantity < 99) {
      dispatch(incrementGuitarQuantityInCart(guitarInfo.id));
      setGuitarsCount(guitarInfo.quantity + 1);
    }
  }

  function handleQuantityInput(evt: React.FormEvent<HTMLInputElement>) {
    evt.preventDefault();

    const target = evt.target as HTMLInputElement;
    if(countInputRef.current) {
      if(Number(target.value) <= 99 && Number(target.value) > 0) {
        dispatch(setNewGuitarQuantityInCart({id: guitarInfo.id, count: Number(target.value)}));
        setGuitarsCount(Number(target.value));
        countInputRef.current.setCustomValidity('');
      } else if(Number(target.value) > 99 || Number(target.value) < 0) {

        countInputRef.current.setCustomValidity('Введите число не более 99 и не менее 1');

      }
      countInputRef.current.reportValidity();
    }
  }

  return (
    <>
      <div className="cart-item">
        <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={() => {
          setIsModalDeleteItemOpen(true);
        }}
        ><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
        </button>
        <div className="cart-item__image"><img src={`/${guitarInfo.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitarInfo.previewImg)}@2x.jpg 2x`} width="55" height="130" alt="ЭлектроГитара Честер bass" />
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title">{guitarInfo.name}</p>
          <p className="product-info__info">Артикул: {guitarInfo.vendorCode}</p>
          <p className="product-info__info">{GUITAR_TYPE[guitarInfo.type]}, {guitarInfo.stringCount} струнная</p>
        </div>
        <div className="cart-item__price">{new Intl.NumberFormat('ru-RU').format(guitarInfo.price)} ₽</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" aria-label="Уменьшить количество" onClick={handleDecrementButtonClick}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input ref={countInputRef} className="quantity__input" type="number" placeholder={`${guitarInfo.quantity}`} id="2-count" name="2-count" max="99" value={guitarsCount} onInput={(evt) => handleQuantityInput(evt)}/>
          <button className="quantity__button" aria-label="Увеличить количество" onClick={handleIncrementButtonClick}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{new Intl.NumberFormat('ru-RU').format(guitarInfo.price * guitarInfo.quantity)} ₽</div>
      </div>
      {isModalDeleteItemOpen && <ModalDeleteGuitar guitar={guitarInfo} setIsModalDeleteItemOpenCb={setIsModalDeleteItemOpen}/>}
    </>
  );
}
