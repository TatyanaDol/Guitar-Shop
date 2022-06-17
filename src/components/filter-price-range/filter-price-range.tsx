import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getMaxGuitarPrice, getMinGuitarPrice } from '../../store/site-process/selector';

type FilterPriceRangeProps = {
    minPriceInputValue: string,
    setMinPriceInputValue: React.Dispatch<React.SetStateAction<string>>,
    maxPriceInputValue: string,
    setMaxPriceInputValue: React.Dispatch<React.SetStateAction<string>>,
}

export default function FilterPriceRange({minPriceInputValue, setMinPriceInputValue, maxPriceInputValue, setMaxPriceInputValue}: FilterPriceRangeProps): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const maximumPrice = useAppSelector(getMaxGuitarPrice).toString();
  const minimumPrice = useAppSelector(getMinGuitarPrice).toString();

  function handleSearchParamsChange(key: string,  value: string) {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }

  function handleInputPriceMinimumBlur() {
    if(minPriceInputValue !== '' && Number(minPriceInputValue) < Number(minimumPrice)) {
      setMinPriceInputValue(minimumPrice);
      handleSearchParamsChange('price_gte', minimumPrice);
      return;
    }
    if(maxPriceInputValue !== '' &&  Number(minPriceInputValue) > Number(maxPriceInputValue)) {
      setMinPriceInputValue(maxPriceInputValue);
      handleSearchParamsChange('price_gte', maxPriceInputValue);
      return;
    }
    handleSearchParamsChange('price_gte', minPriceInputValue);
  }

  function handleInputPriceMaximumBlur() {
    if(maxPriceInputValue !== '' && Number(maxPriceInputValue) > Number(maximumPrice)) {
      setMaxPriceInputValue(maximumPrice);
      handleSearchParamsChange('price_lte', maximumPrice);
      return;
    }
    if(maxPriceInputValue !== '' &&  Number(maxPriceInputValue) < Number(minPriceInputValue)) {
      setMaxPriceInputValue(minPriceInputValue);
      handleSearchParamsChange('price_lte', minPriceInputValue);
      return;
    }
    handleSearchParamsChange('price_lte', maxPriceInputValue);
  }

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input type="number" placeholder={minimumPrice} id="priceMin" name="от" min="0" value={minPriceInputValue}
            onChange={(evt) => {setMinPriceInputValue(evt.target.value);}}
            onBlur={() => {
              handleInputPriceMinimumBlur();
            }}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input type="number" placeholder={maximumPrice} id="priceMax" name="до" min="0" value={maxPriceInputValue}
            onChange={(evt) => {setMaxPriceInputValue(evt.target.value);}}
            onBlur={() => {
              handleInputPriceMaximumBlur();
            }}
          />
        </div>
      </div>
    </fieldset>

  );

}
