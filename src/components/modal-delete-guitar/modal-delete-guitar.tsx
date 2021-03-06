import React, { useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { GUITAR_TYPE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { deleteGuitarFromCart } from '../../store/guitars-data-process/guitars-data-process';
import {  GuitarInCartData } from '../../types/guitar';
import { getGuitarImgForSrcSet } from '../../utils/utils';

type ModalDeleteGuitarProps = {
    guitar: GuitarInCartData
    setIsModalDeleteItemOpenCb: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalDeleteGuitar({guitar, setIsModalDeleteItemOpenCb }: ModalDeleteGuitarProps): JSX.Element {

  const dispatch = useAppDispatch();

  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const firstAutofocusRef = useRef<HTMLButtonElement>(null);

  const lastAutofocusRef = useRef<HTMLButtonElement>(null);

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      setIsModalDeleteItemOpenCb(false);
    }
  }

  function handleModalOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsModalDeleteItemOpenCb(false);
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

  function handleDeleteGuitarButtonClick() {
    dispatch(deleteGuitarFromCart(guitar.id));

  }


  return (
    ReactDOM.createPortal(

      <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
        <div className="modal is-active modal-for-ui-kit">
          <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={modalOverlayRef}>
            </div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium title--red">?????????????? ???????? ???????????</h2>
              <div className="modal__info"><img className="modal__img" src={`/${guitar.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitar.previewImg)}@2x.jpg 2x`} width="67" height="137" alt="???????????? bass" />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">???????????? {guitar.name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">??????????????: {guitar.vendorCode}</p>
                  <p className="modal__product-params">{GUITAR_TYPE[guitar.type]}, {guitar.stringCount} ????????????????</p>
                  <p className="modal__price-wrapper"><span className="modal__price">????????:</span><span className="modal__price">{new Intl.NumberFormat('ru-RU').format(guitar.price)} ???</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--small modal__button"  onClick={handleDeleteGuitarButtonClick} ref={firstAutofocusRef} tabIndex={2} autoFocus>?????????????? ??????????</button>
                <button className="button button--black-border button--small modal__button modal__button--right" tabIndex={3} onClick={() => setIsModalDeleteItemOpenCb(false)}>???????????????????? ??????????????</button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="??????????????" ref={lastAutofocusRef} tabIndex={4} onClick={() => setIsModalDeleteItemOpenCb(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
          <span tabIndex={5} onFocus={(evt) => {firstAutofocusRef.current?.focus();}}/>
        </div>
      </div>,
      document.body,
    )
  );
}


