import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getGuitarsInCart } from '../../store/guitars-data-process/selectors';
import SearchForm from '../search-form/search-form';

function Header(): JSX.Element {

  const guitarsInCartData = useAppSelector(getGuitarsInCart);

  const [count, setCount] = useState(0);

  useEffect(( ) => {

    const sum = guitarsInCartData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0,
    );

    setCount(sum);

  }, [guitarsInCartData]);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link to={'/cart'} className="header__cart-link" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span>{guitarsInCartData[0] ? <span className="header__cart-count">{count}</span> : ''}
        </Link>
      </div>
    </header>
  );
}

export default Header;
