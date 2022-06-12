import { KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchResultGuitarsAction } from '../../store/api-action';
import { getSearchResultGuitars } from '../../store/guitars-data-process/selectors';


function SearchForm(): JSX.Element {

  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState('');

  const dispatch = useAppDispatch();

  function handleSearchInputChange(value: string) {

    setSearchInputValue(value);

  }

  useEffect(() => {

    dispatch(fetchSearchResultGuitarsAction(searchInputValue));


  }, [searchInputValue]);

  const serchResultGuitars = useAppSelector(getSearchResultGuitars);

  function handleSearchInputSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if(searchInputValue) {
      dispatch(fetchSearchResultGuitarsAction(searchInputValue));
    }
  }

  function handleSelectListClick(evt: React.MouseEvent<HTMLUListElement>) {
    evt.preventDefault();
    const target = evt.target as HTMLUListElement;
    navigate(`/product/${target.dataset.guitarid}`);
    setSearchInputValue('');

  }

  function handleEnterKeydown(evt: KeyboardEvent<HTMLUListElement>) {
    if(evt.key === 'Enter') {
      evt.preventDefault();
      const target = evt.target as HTMLUListElement;
      navigate(`/product/${target.dataset.guitarid}`);
      setSearchInputValue('');
    }
  }


  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search" onSubmit={(evt) => handleSearchInputSubmit(evt)} onReset={() => handleSearchInputChange('')}>
        <button className="form-search__submit" type="submit" >
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" onChange={(evt) => { handleSearchInputChange(evt.target.value); }}  />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list ${(serchResultGuitars[0]) ? 'list-opened' : 'hidden'} `} onClick={(evt) => handleSelectListClick(evt)} onKeyDown={(evt) => handleEnterKeydown(evt)}>
        {serchResultGuitars.map((serchedGuitar, insx) => <li key={serchedGuitar.id} className="form-search__select-item" data-guitarid={serchedGuitar.id} tabIndex={0}>{serchedGuitar.name}</li>)}
      </ul>
      <button className="form-search__reset" type="reset" form="form-search">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );

}

export default SearchForm;
