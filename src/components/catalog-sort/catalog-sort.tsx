import { useSearchParams } from 'react-router-dom';


function CatalogSort(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchParamsChange(key: string,  value: string) {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${searchParams.get('_sort') === 'price' ? 'catalog-sort__type-button--active' : ''}`} aria-label="по цене" onClick={() => {
          handleSearchParamsChange('_sort', 'price');
        }}
        >по цене
        </button>
        <button className={`catalog-sort__type-button ${searchParams.get('_sort') === 'rating' ? 'catalog-sort__type-button--active' : ''}`} aria-label="по популярности" onClick={() => {
          handleSearchParamsChange('_sort', 'rating');
        }}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up ${searchParams.get('_order') === 'asc' ? 'catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" onClick={() => {
          handleSearchParamsChange('_order', 'asc');
        }}
        >
        </button>
        <button className={`catalog-sort__order-button catalog-sort__order-button--down ${searchParams.get('_order') === 'desc' ? 'catalog-sort__order-button--active' : ''}`} aria-label="По убыванию" onClick={() => {
          handleSearchParamsChange('_order', 'desc');
        }}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
