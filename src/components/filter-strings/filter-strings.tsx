import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXISTING_STRINGS_COUNT, STRINGS_FOR_TYPES } from '../../const';
import { StringsCountChecked } from '../../types/guitar';


export default function FilterStrings() {

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTypes = searchParams.getAll('type');

  const [stringsSet, setStringsSet] = useState(new Set<number>());

  const searchStringCount = searchParams.getAll('stringCount');

  const [stringsCountChecked, setStringsCountChecked] = useState({
    4: searchStringCount.includes('4'),
    6: searchStringCount.includes('6'),
    7: searchStringCount.includes('7'),
    12: searchStringCount.includes('12'),
  });

  useEffect(() => {

    const set = new Set<number>();

    if(searchTypes[0]) {
      searchTypes.forEach((type) => {
        const stringsForSet = STRINGS_FOR_TYPES[type as keyof typeof STRINGS_FOR_TYPES];
        stringsForSet.forEach((stringsNumber: number) => {
          set.add(stringsNumber);
        });
      });
      setStringsSet(set);
    } else {
      EXISTING_STRINGS_COUNT.forEach((stringsNumber) => {
        set.add(stringsNumber);
      });
      setStringsSet(set);
    }

  }, [searchParams]);

  function deleteAndAppendStringCountInSearchParams(strings: StringsCountChecked) {
    searchParams.delete('stringCount');
    setSearchParams(searchParams);
    const stringsArr = Object.entries(strings);
    for(const el of stringsArr) {
      if(el[1]) {
        searchParams.append('stringCount', el[0]);
        setSearchParams(searchParams);
      }
    }
  }

  function handleGuitarStringCountCheckboxChange(evt: React.FormEvent) {
    const {name, checked} = evt.target as HTMLInputElement;
    setStringsCountChecked({...stringsCountChecked, [name]: checked});
  }

  useEffect(() => {
    deleteAndAppendStringCountInSearchParams(stringsCountChecked);
  }, [stringsCountChecked]);


  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="4-strings" name="4" checked={searchStringCount.includes('4')} disabled={!(stringsSet.has(4))}
          onChange={ (evt) =>
          {
            handleGuitarStringCountCheckboxChange(evt);
          }}
        />
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="6-strings" name="6"  checked={searchStringCount.includes('6')} disabled={!(stringsSet.has(6))}
          onChange={ (evt) =>
          {
            handleGuitarStringCountCheckboxChange(evt);
          }}
        />
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="7-strings" name="7" checked={searchStringCount.includes('7')}  disabled={!(stringsSet.has(7))}
          onChange={ (evt) =>
          {
            handleGuitarStringCountCheckboxChange(evt);
          }}
        />
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="12-strings" name="12" checked={searchStringCount.includes('12')} disabled={!(stringsSet.has(12))}
          onChange={ (evt) =>
          {
            handleGuitarStringCountCheckboxChange(evt);
          }}
        />
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>
  );
}
