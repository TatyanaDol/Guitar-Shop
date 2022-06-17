import React, { useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMaxAndMinPriceAction } from '../../store/api-action';
import { getMaxGuitarPrice, getMinGuitarPrice } from '../../store/site-process/selector';
import FilterPriceRange from '../filter-price-range/filter-price-range';
import FilterStrings from '../filter-strings/filter-strings';
import FilterType from '../filter-type/filter-type';


export default function CatalogFilterForm() {

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const maximumPrice = useAppSelector(getMaxGuitarPrice).toString();
  const minimumPrice = useAppSelector(getMinGuitarPrice).toString();

  const priceFromQuery = searchParams.get('price_gte');
  const priceToQuery = searchParams.get('price_lte');

  const [minPriceInputValue, setMinPriceInputValue] = useState(priceFromQuery ? priceFromQuery : '');
  const [maxPriceInputValue, setMaxPriceInputValue] = useState(priceToQuery ? priceToQuery : '');

  const filterPriceRangeProps = {
    minPriceInputValue,
    setMinPriceInputValue,
    maxPriceInputValue,
    setMaxPriceInputValue,
  };

  useEffect(() => {

    if(maximumPrice === '0'  && minimumPrice === '0') {
      dispatch(fetchMaxAndMinPriceAction());
    }

  }, []);


  return (
    <form className="catalog-filter" onReset={() => {
      setSearchParams('');
      setMinPriceInputValue('');
      setMaxPriceInputValue('');
    }}
    >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPriceRange {...filterPriceRangeProps} />
      <FilterType />
      <FilterStrings />
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}
