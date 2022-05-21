import { useEffect } from 'react';
import {fetchGuitarsAction} from '../../store/api-action';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {getGuitars, getGuitarsDataLoadedStatus} from '../../store/guitars-data-process/selectors';
import GuitarsCardsList from '../guitars-cards-list/guitars-cards-list';
import { getTotalGuitarsCount } from '../../store/site-process/selector';
import Pagination from '../pagination/pagination';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


function GuitarsCatalog(): JSX.Element {

  const dispatch = useAppDispatch();
  const {slug} = useParams();

  const guitarsList = useAppSelector(getGuitars);
  const isGuitarsDataLoaded = useAppSelector(getGuitarsDataLoadedStatus);
  const totalGuitarsCount = useAppSelector(getTotalGuitarsCount);

  useEffect( () => {
    dispatch(fetchGuitarsAction(slug));

  }, [slug]);


  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Главная</Link>
          </li>
          <li className="breadcrumbs__item"><Link to={AppRoute.Main}  className="link">Каталог</Link>
          </li>
        </ul>
        <div className="catalog">
          <form className="catalog-filter">
            <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Цена, ₽</legend>
              <div className="catalog-filter__price-range">
                <div className="form-input">
                  <label className="visually-hidden">Минимальная цена</label>
                  <input type="number" placeholder="1 000" id="priceMin" name="от" />
                </div>
                <div className="form-input">
                  <label className="visually-hidden">Максимальная цена</label>
                  <input type="number" placeholder="30 000" id="priceMax" name="до" />
                </div>
              </div>
            </fieldset>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Тип гитар</legend>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                <label htmlFor="acoustic">Акустические гитары</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked readOnly/>
                <label htmlFor="electric">Электрогитары</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked readOnly/>
                <label htmlFor="ukulele">Укулеле</label>
              </div>
            </fieldset>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Количество струн</legend>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked readOnly/>
                <label htmlFor="4-strings">4</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked readOnly/>
                <label htmlFor="6-strings">6</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
                <label htmlFor="7-strings">7</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled readOnly/>
                <label htmlFor="12-strings">12</label>
              </div>
            </fieldset>
            <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
          </form>
          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>
            <div className="catalog-sort__type">
              <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
              <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
            </div>
            <div className="catalog-sort__order">
              <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
              <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
            </div>
          </div>

          {
            !isGuitarsDataLoaded ? <LoadingScreen />
              :
              <>
                {guitarsList[0] && <GuitarsCardsList guitars={guitarsList} />}

                <Pagination totalGuitarsCount={totalGuitarsCount} />
              </>
          }

        </div>
      </div>
    </main>

  );
}

export default GuitarsCatalog;
