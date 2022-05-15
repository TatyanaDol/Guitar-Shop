
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type PaginationProps = {
    totalGuitarsCount: number
}

function Pagination({totalGuitarsCount}: PaginationProps): JSX.Element {

  const {slug} = useParams();

  let pageId = slug;

  const pagesCount = Math.ceil(totalGuitarsCount / 9);

  if(!slug) {
    pageId = '1';
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          pageId !== '1' &&
              <li className="pagination__page pagination__page--prev" id="prev"><Link  to={`/catalog/page_${Number(pageId) - 1}`} className="link pagination__page-link" >Назад</Link>
              </li>
        }

        {
          Array.from({ length: pagesCount }, (v, k) => k).map((_, ind) => (
            <li key={_} className={`pagination__page ${ind + 1 === Number(pageId) && 'pagination__page--active'}`} data-testid="page"><Link to={`/catalog/page_${ind + 1}`} className="link pagination__page-link" >{ind + 1}</Link>
            </li>
          ))
        }
        {Number(pageId) !== pagesCount &&
        <li className="pagination__page pagination__page--next" id="next"><Link  to={`/catalog/page_${Number(pageId) + 1}`} className="link pagination__page-link" >Далее</Link>
        </li>}
      </ul>
    </div>
  );

}

export default Pagination;


