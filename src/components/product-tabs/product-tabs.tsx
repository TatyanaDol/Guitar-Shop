import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GUITAR_TYPE } from '../../const';
import { GuitarData } from '../../types/guitar';

type ProductTabsProps = {
    guitar: GuitarData
}

function ProductTabs({guitar}: ProductTabsProps): JSX.Element {

  const [activeTab, setActiveTab] = useState('#characteristics');

  const {hash} = useLocation();

  useEffect(() => {
    if(hash) {
      setActiveTab(hash);
    }

  }, [hash]);


  return (
    <div className="tabs">
      <Link to={'#characteristics'} className={`button ${activeTab !== '#characteristics' && 'button--black-border'} button--medium tabs__button`} >Характеристики</Link>
      <Link to={'#description'} className={`button ${activeTab !== '#description' && 'button--black-border'} button--medium tabs__button`} >Описание</Link>
      <div className="tabs__content" id="characteristics">
        {
          activeTab === '#characteristics' ?
            <div className="tabs__table">
              <ul className="tabs__table-row">
                <li className="tabs__title">Артикул:</li>
                <li className="tabs__value">{guitar.vendorCode}</li>
              </ul>
              <ul className="tabs__table-row">
                <li className="tabs__title">Тип:</li>
                <li className="tabs__value">{GUITAR_TYPE[guitar.type]}</li>
              </ul>
              <ul className="tabs__table-row">
                <li className="tabs__title">Количество струн:</li>
                <li className="tabs__value">{guitar.stringCount} струнная</li>
              </ul>
            </div>
            : <p className="tabs__product-description">{guitar.description}</p>
        }
      </div>
    </div>
  );
}

export default ProductTabs;
