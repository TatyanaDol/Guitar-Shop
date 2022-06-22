import React, { useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch} from '../../hooks';
import { fetchMaxAndMinPriceAction } from '../../store/api-action';
import FilterPriceRange from '../filter-price-range/filter-price-range';
import FilterStrings from '../filter-strings/filter-strings';
import FilterType from '../filter-type/filter-type';


export default function CatalogFilterForm() {

  const [searchParams, setSearchParams] = useSearchParams();

  const priceFromQuery = searchParams.get('price_gte');
  const priceToQuery = searchParams.get('price_lte');

  const [minPriceInputValue, setMinPriceInputValue] = useState(priceFromQuery ? priceFromQuery : '');
  const [maxPriceInputValue, setMaxPriceInputValue] = useState(priceToQuery ? priceToQuery : '');

  const [isResetNeeded, setIsResetNeeded] = useState(false);

  const filterPriceRangeProps = {
    minPriceInputValue,
    setMinPriceInputValue,
    maxPriceInputValue,
    setMaxPriceInputValue,
  };

  const dispatch = useAppDispatch();

  useEffect(() => {

    const priceFrom = searchParams.get('price_gte');
    const priceTo = searchParams.get('price_lte');
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

    dispatch(fetchMaxAndMinPriceAction({priceFrom, priceTo, guitarsTypesChecked, stringsCount}));

  }, [searchParams]);


  return (
    <form className="catalog-filter" onReset={() => {
      setIsResetNeeded(true);
      setSearchParams('');
      setMinPriceInputValue('');
      setMaxPriceInputValue('');
    }}
    >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPriceRange {...filterPriceRangeProps} />
      <FilterType reset={isResetNeeded} setResetCb={setIsResetNeeded}/>
      <FilterStrings reset={isResetNeeded} setResetCb={setIsResetNeeded} />
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}
