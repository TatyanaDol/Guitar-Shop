import { useEffect } from 'react';
import {fetchGuitarsAction} from '../../store/api-action';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {getGuitars, getGuitarsDataLoadedStatus} from '../../store/guitars-data-process/selectors';
import GuitarsCardsList from '../guitars-cards-list/guitars-cards-list';
import {  getTotalGuitarsCount } from '../../store/site-process/selector';
import Pagination from '../pagination/pagination';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogFilterForm from '../catalog-filter-form/catalog-filter-form';


function GuitarsCatalog(): JSX.Element {

  const dispatch = useAppDispatch();
  const {slug} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const guitarsList = useAppSelector(getGuitars);
  const isGuitarsDataLoaded = useAppSelector(getGuitarsDataLoadedStatus);
  const totalGuitarsCount = useAppSelector(getTotalGuitarsCount);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`/catalog/page_1${location.search}`);

  }, [searchParams]);


  useEffect( () => {
    let sortQuery = searchParams.get('_sort');
    const orderQuery = searchParams.get('_order');

    const priceFromQuery = searchParams.get('price_gte');
    const priceToQuery = searchParams.get('price_lte');

    const types = searchParams.getAll('type');

    const guitarsTypesChecked = {
      ukulele: types.includes('ukulele'),
      electric: types.includes('electric'),
      acoustic: types.includes('acoustic'),
    };


    const stringsQuery = searchParams.getAll('stringCount');

    const stringsCount = {
      4: stringsQuery.includes('4'),
      6: stringsQuery.includes('6'),
      7: stringsQuery.includes('7'),
      12: stringsQuery.includes('12'),
    };

    if(!(sortQuery) && orderQuery) {
      searchParams.set('_sort', 'price');
      setSearchParams(searchParams);
      sortQuery = searchParams.get('_sort');
    }

    dispatch(fetchGuitarsAction({slug, sortQuery, orderQuery, priceFromQuery, priceToQuery, guitarsTypesChecked, stringsCount}));

  }, [slug, searchParams]);


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
          <CatalogFilterForm />
          <CatalogSort />

          {
            !isGuitarsDataLoaded ? <LoadingScreen />
              :
              <>
                {guitarsList[0] ? <GuitarsCardsList guitars={guitarsList} /> : <p>По вашему запросу ничего не найдено</p>}

                <Pagination totalGuitarsCount={totalGuitarsCount} />
              </>
          }

        </div>
      </div>
    </main>

  );
}

export default GuitarsCatalog;
