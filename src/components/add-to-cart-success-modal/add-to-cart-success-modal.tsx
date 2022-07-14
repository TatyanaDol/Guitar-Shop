import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

type AddToCartSuccessModalProps = {
    setIsSuccessAddToCartModalOpenCb: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddToCartSuccessModal({setIsSuccessAddToCartModalOpenCb}: AddToCartSuccessModalProps) {
  const navigate = useNavigate();

  const location = useLocation();

  function handleToCartButtonClick(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();
    navigate('/cart');
  }

  const modalSuccessOverlayRef = useRef<HTMLDivElement>(null);

  const firstAutofocusRef = useRef<HTMLButtonElement>(null);

  const lastAutofocusRef = useRef<HTMLButtonElement>(null);

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      setIsSuccessAddToCartModalOpenCb(false);
    }
  }

  function handleModalSuccessOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsSuccessAddToCartModalOpenCb(false);
  }

  function handleContinueButtonClick() {
    setIsSuccessAddToCartModalOpenCb(false);
    if(location.pathname.includes('product')) {
      navigate('/');
    }
  }

  useEffect(() => {
    const modaSuccesslOverlay = modalSuccessOverlayRef.current;

    if(modaSuccesslOverlay) {
      modaSuccesslOverlay.addEventListener('click', handleModalSuccessOverlayClick);
      document.addEventListener('keydown', handleEscKeydown);
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
      document.body.style.overflow = 'unset';
      if(modaSuccesslOverlay) {
        modaSuccesslOverlay.removeEventListener('click', handleModalSuccessOverlayClick);
      }
    };

  }, []);

  return (
    ReactDOM.createPortal(
      <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
        <div className="modal is-active modal--success modal-for-ui-kit">
          <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal ref={modalSuccessOverlayRef}></div>
            <div className="modal__content">
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <p className="modal__message">Товар успешно добавлен в корзину</p>
              <div className="modal__button-container modal__button-container--add">
                <button className="button button--small modal__button" onClick={(evt) => handleToCartButtonClick(evt)} ref={firstAutofocusRef} tabIndex={2} autoFocus>Перейти в корзину</button>
                <button className="button button--black-border button--small modal__button modal__button--right" onClick={() => handleContinueButtonClick()} tabIndex={3}>Продолжить покупки</button>
              </div>
              <button className="modal__close-btn button-cross" data-testid="close" type="button" aria-label="Закрыть" ref={lastAutofocusRef} tabIndex={4} onClick={() => setIsSuccessAddToCartModalOpenCb(false)}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
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
