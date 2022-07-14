
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { GUITAR_TYPE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchGuitarForCartAction } from '../../store/api-action';
import { GuitarData } from '../../types/guitar';
import { getGuitarImgForSrcSet } from '../../utils/utils';
import LoadingScreen from '../loading-screen/loading-screen';

type AddToCartModalProps = {
    guitar: GuitarData
    setIsAddToCartModalOpenCb: React.Dispatch<React.SetStateAction<boolean>>
    setIsSuccessAddToCartModalOpenCb: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddToCartModal({guitar, setIsAddToCartModalOpenCb, setIsSuccessAddToCartModalOpenCb}: AddToCartModalProps): JSX.Element {

  const dispatch = useAppDispatch();

  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const firstAutofocusRef = useRef<HTMLButtonElement>(null);

  const lastAutofocusRef = useRef<HTMLButtonElement>(null);

  const [isAdding, setIsAdding] = useState(false);

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      setIsAddToCartModalOpenCb(false);
    }
  }

  function handleModalOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsAddToCartModalOpenCb(false);
  }

  useEffect(() => {
    const modalOverlay = modalOverlayRef.current;

    if(modalOverlay) {
      modalOverlay.addEventListener('click', handleModalOverlayClick);
      document.addEventListener('keydown', handleEscKeydown);
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
      document.body.style.overflow = 'unset';
      if(modalOverlay) {
        modalOverlay.removeEventListener('click', handleModalOverlayClick);
      }
    };

  }, []);

  function handleAddToCartButtonClick() {

    const data = {
      guitarId: guitar.id,
      setIsAddToCartModalOpenCb,
      setIsAddingCb: setIsAdding,
      setIsSuccessAddToCartModalOpenCb,
    };

    setIsAdding(true);
    dispatch(fetchGuitarForCartAction({...data}));
  }


  return (
    ReactDOM.createPortal(

      <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
        <div className="modal is-active modal-for-ui-kit">
          <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={modalOverlayRef}></div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
              <div className="modal__info"><img className="modal__img" src={`/${guitar.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitar.previewImg)}@2x.jpg 2x`} width="67" height="137" alt={guitar.name} />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
                  <p className="modal__product-params">{GUITAR_TYPE[guitar.type]}, {guitar.stringCount} струнная</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{new Intl.NumberFormat('ru-RU').format(guitar.price)} ₽</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--red button--big modal__button modal__button--add" disabled={isAdding} onClick={handleAddToCartButtonClick} ref={firstAutofocusRef} tabIndex={2} autoFocus>{isAdding ? <LoadingScreen /> : 'Добавить в корзину'}</button>
              </div>
              <button className="modal__close-btn button-cross" data-testid="close" type="button" aria-label="Закрыть" ref={lastAutofocusRef} tabIndex={3} onClick={() => setIsAddToCartModalOpenCb(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
          <span tabIndex={4} onFocus={(evt) => {firstAutofocusRef.current?.focus();}}/>
        </div>
      </div>,
      document.body,
    )
  );
}
