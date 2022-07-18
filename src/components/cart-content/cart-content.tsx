import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchDiscountAction } from '../../store/api-action';
import { getGuitarsInCart } from '../../store/guitars-data-process/selectors';
import { getDiscount } from '../../store/site-process/selector';
import { GuitarsInCartData } from '../../types/guitar';
import CartItem from '../cart-item/cart-item';
import LoadingScreen from '../loading-screen/loading-screen';


function calculateTotalPrice(guitars: GuitarsInCartData) {
  const initialValue = 0;
  const sum = guitars.reduce(
    (accumulator, currentGuitar) => accumulator + currentGuitar.price * currentGuitar.quantity,
    initialValue,
  );

  return sum;
}

export default function CartContent() {

  const dispatch = useAppDispatch();

  const discount = useAppSelector(getDiscount);

  const guitarsInCartData = useAppSelector(getGuitarsInCart);
  const [isAdding, setIsAdding] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [codeValidity, setCodeValidity] = useState('');
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(guitarsInCartData));
  const [dicountAmount, setDicountAmount] = useState(totalPrice * discount / 100);


  const [code, setCode] = useState('');

  function handlePromocodeInput(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    const promoCode = evt.target.value;
    const promoCodeWithoutSpaces = promoCode.replaceAll(/\s/g,'');
    setCode(promoCodeWithoutSpaces);
  }


  function handlePromoCodeFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if((evt.currentTarget['coupon'].value)) {
      const promoCode = evt.currentTarget['coupon'].value;
      const promoCodeWithoutSpaces = promoCode.replaceAll(/\s/g,'');
      setIsAdding(true);
      dispatch(fetchDiscountAction({
        promoCode: promoCodeWithoutSpaces,
        setIsAddingCb: setIsAdding,
        setIsValidCb: setIsValid,
      }));
    }
  }

  useEffect(() => {
    if(discount && isValid) {
      setCodeValidity('Промокод принят');
    } else {
      if(!discount && !isValid) {

        setCodeValidity('неверный промокод');
      } else {

        setCodeValidity('');


      }
    }

  }, [isValid, discount]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(guitarsInCartData));
    setDicountAmount(calculateTotalPrice(guitarsInCartData) * discount / 100);
  }, [guitarsInCartData, discount, codeValidity]);


  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
          <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Главная</Link>
          </li>
          <li className="breadcrumbs__item"><Link to={AppRoute.Main}  className="link">Каталог</Link>
          </li>
          <li className="breadcrumbs__item"><a className="link">Корзина</a>
          </li>
        </ul>

        <div className="cart">
          { guitarsInCartData[0] ?
            guitarsInCartData.map((guitar) => <CartItem key={guitar.id} guitarInfo={guitar} />,
            ) : <p>Ваша корзина пуста.</p>}

          <div className="cart__footer">
            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">Промокод на скидку</h2>
              <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
              <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={(evt) => handlePromoCodeFormSubmit(evt) }>
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" onChange={(evt) => {handlePromocodeInput(evt);}} value={code}/>
                  <p className={`form-input__message ${discount && isValid  ? 'form-input__message--success' : 'form-input__message--error'}`}>{codeValidity}</p>
                </div>
                <button type="submit" className="button button--big coupon__button" disabled={!code} >{isAdding ? <LoadingScreen /> : 'Применить' }</button>
              </form>
            </div>
            <div className="cart__total-info">
              <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{new Intl.NumberFormat('ru-RU').format(totalPrice)} ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value ${dicountAmount ? 'cart__total-value--bonus' : ''}`}>{dicountAmount  ? `-${new Intl.NumberFormat('ru-RU').format(dicountAmount)}` : '0'} ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{new Intl.NumberFormat('ru-RU').format(totalPrice - dicountAmount)} ₽</span></p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
