import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXISTING_TYPES_OF_GUITAR, TYPES_FOR_STRINGS } from '../../const';
import { GuitarTypesChecked } from '../../types/guitar';

type FilterTypeProps = {
  reset: boolean,
  setResetCb: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FilterType({reset, setResetCb }: FilterTypeProps) {

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTypes = searchParams.getAll('type');
  const searchStringCount = searchParams.getAll('stringCount');

  const [typesSet, setTypesSet] = useState(new Set<string>());

  const [guitarTypes, setGuitarTypes] = useState({
    acoustic: searchTypes.includes('acoustic'),
    electric: searchTypes.includes('electric'),
    ukulele: searchTypes.includes('ukulele'),
  });

  useEffect(() => {
    if(reset) {
      setGuitarTypes(
        {
          acoustic: false,
          electric: false,
          ukulele: false,
        },
      );
      setResetCb(false);
    }
  }, [reset]);

  useEffect(() => {

    const set = new Set<string>();

    if(searchStringCount[0]) {
      searchStringCount.forEach((stringCount) => {
        const typesForSet = TYPES_FOR_STRINGS[stringCount as keyof typeof TYPES_FOR_STRINGS];
        typesForSet.forEach((typeOfGuitar: string) => {
          set.add(typeOfGuitar);
        });
      });
      setTypesSet(set);
    } else {
      EXISTING_TYPES_OF_GUITAR.forEach((typeOfGuitar) => {
        set.add(typeOfGuitar);
      });
      setTypesSet(set);
    }

  }, [searchParams]);


  function deleteAndAppendTypesInSearchParams(types: GuitarTypesChecked) {
    searchParams.delete('type');
    setSearchParams(searchParams);
    const typesArr = Object.entries(types);
    for(const el of typesArr) {
      if(el[1]) {
        searchParams.append('type', el[0]);
        setSearchParams(searchParams);
      }
    }
  }

  function handleGuitarTypeCheckboxChange(evt: React.FormEvent) {
    const {name, checked} = evt.target as HTMLInputElement;
    setGuitarTypes({...guitarTypes, [name]: checked});
  }

  useEffect(() => {
    deleteAndAppendTypesInSearchParams(guitarTypes);
  }, [guitarTypes]);


  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" data-testid="acoustic-checkbox" checked={searchTypes.includes('acoustic')} disabled={!(typesSet.has('acoustic')) && !(searchTypes.includes('acoustic'))}
          onChange={ (evt) =>
          {
            handleGuitarTypeCheckboxChange(evt);
          }}
        />
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="electric" data-testid="electric-checkbox" name="electric" checked={searchTypes.includes('electric')} disabled={!(typesSet.has('electric'))}
          onChange={ (evt) =>
          {
            handleGuitarTypeCheckboxChange(evt);
          }}
        />
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={searchTypes.includes('ukulele')} disabled={!(typesSet.has('ukulele'))}
          onChange={ (evt) =>
          {
            handleGuitarTypeCheckboxChange(evt);
          }}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}
