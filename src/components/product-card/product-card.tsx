import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneGuitarCardAction } from '../../store/api-action';
import { getOneGuitarCard, getOneGuitarCardDataLoadedStatus } from '../../store/guitars-data-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import Product from '../product/product';
import ReviewsList from '../reviews-list/reviews-list';

function ProductCard() {

  const dispatch = useAppDispatch();

  const {id} = useParams();

  useEffect( () => {
    if(id) {
      dispatch(fetchOneGuitarCardAction(id));
    }

  }, [id]);

  const guitarCardData = useAppSelector(getOneGuitarCard);
  const isOneGuitarCardDataLoaded = useAppSelector(getOneGuitarCardDataLoadedStatus);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">{guitarCardData?.name}</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Главная</Link>
          </li>
          <li className="breadcrumbs__item"><Link to={AppRoute.Main}  className="link">Каталог</Link>
          </li>
          <li className="breadcrumbs__item"><a className="link">{guitarCardData?.name}</a>
          </li>
        </ul>
        {
          !isOneGuitarCardDataLoaded ? <LoadingScreen />
            :
            (guitarCardData &&
            <>
              <Product guitar={guitarCardData}/>
              <ReviewsList guitarName={guitarCardData.name} id={guitarCardData.id}reviews={guitarCardData.comments}/>
            </>
            )
        }

      </div>
    </main>
  );
}

export default ProductCard;
