import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addNewCommentAction } from '../../store/api-action';
import { NewCommentData } from '../../types/guitar';
import LoadingScreen from '../loading-screen/loading-screen';

type ShowMoreButtonProps = {
    setIsSuccessReviewModalOpenedCb: React.Dispatch<React.SetStateAction<boolean>>
    setIsFormModalOpenedCb: React.Dispatch<React.SetStateAction<boolean>>
    guitarName: string
    id: number
}

function ModalReviewForm({setIsSuccessReviewModalOpenedCb, setIsFormModalOpenedCb, guitarName, id}: ShowMoreButtonProps): JSX.Element  {
  const [isSaving, setIsSaving] = useState(false);

  const [invalidName, setInvalidName] = useState(false);
  const [invalidAdvantage, setInvalidAdvantage] = useState(false);
  const [invalidDisadvantage, setInvalidDisadvantage] = useState(false);
  const [invalidComment, setInvalidComment] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);

  const formReviewRef = useRef<HTMLFormElement>(null);

  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const firstAutofocusRef = useRef<HTMLInputElement>(null);

  const lastAutofocusRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      setIsFormModalOpenedCb(false);
    }
  }

  function handleModalOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsFormModalOpenedCb(false);
  }

  useEffect(() => {
    const modalOverlay = modalOverlayRef.current;

    if(modalOverlay) {
      modalOverlay.addEventListener('click', handleModalOverlayClick);
    }

    if(formReviewRef.current) {
      document.addEventListener('keydown', handleEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);

      if(modalOverlay) {
        modalOverlay.removeEventListener('click', handleModalOverlayClick);
      }
    };

  }, []);

  const onSubmit = (newCommentData: NewCommentData) => {
    setIsSaving(true);
    dispatch(addNewCommentAction(newCommentData));
  };

  function handleReviewFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if(!(evt.currentTarget['user-name'].value)) {
      setInvalidName(true);
    } else {
      setInvalidName(false);
    }
    if(!(evt.currentTarget['advantage'].value)) {
      setInvalidAdvantage(true);
    } else {
      setInvalidAdvantage(false);
    }
    if(!(evt.currentTarget['disadvantage'].value)) {
      setInvalidDisadvantage(true);
    } else {
      setInvalidDisadvantage(false);
    }
    if(!(evt.currentTarget['comment'].value)) {
      setInvalidComment(true);
    } else {
      setInvalidComment(false);
    }
    if(!(evt.currentTarget['rate'].value)) {
      setInvalidRate(true);
    } else {
      setInvalidRate(false);
    }

    if(evt.currentTarget['user-name'].value && evt.currentTarget['advantage'].value && evt.currentTarget['disadvantage'].value && evt.currentTarget['comment'].value && evt.currentTarget['rate'].value) {
      onSubmit({
        comment: {
          guitarId: id,
          userName: evt.currentTarget['user-name'].value,
          advantage: evt.currentTarget['advantage'].value,
          disadvantage: evt.currentTarget['disadvantage'].value,
          comment: evt.currentTarget['comment'].value,
          rating: Number(evt.currentTarget['rate'].value),
        },
        setIsSavingCb: setIsSaving,
        setIsSuccessReviewModalOpenedCb: setIsSuccessReviewModalOpenedCb,
        setIsFormModalOpenedCb: setIsFormModalOpenedCb,
      });
    }

  }

  return (
    <div className="modal is-active modal--review modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal ref={modalOverlayRef} >

        </div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
          <form className="form-review" ref={formReviewRef} onSubmit={handleReviewFormSubmit}>
            <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name" id="user-name"  data-testid="user" name="user-name" type="text" autoComplete="off" ref={firstAutofocusRef} tabIndex={2} autoFocus/>
                <p className="form-review__warning" style={{opacity: `${invalidName ? 1 : 0}`}}>Заполните поле</p>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse" tabIndex={3}>
                  <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                  <p className="rate__message" style={{opacity: `${invalidRate ? 1 : 0}`}}>Поставьте оценку</p>
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
            <input className="form-review__input" id="adv" type="text" name="advantage" data-testid="advantage" autoComplete="off" tabIndex={4}/>
            <p className="form-review__warning" style={{opacity: `${invalidAdvantage ? 1 : 0}`}}>Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
            <input className="form-review__input" id="disadv" type="text" name="disadvantage" data-testid="disadvantage" autoComplete="off" tabIndex={5}/>
            <p className="form-review__warning" style={{opacity: `${invalidDisadvantage ? 1 : 0}`}}>Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
            <textarea className="form-review__input form-review__input--textarea" id="comment" name="comment" rows={10} data-testid="comment" autoComplete="off" tabIndex={6}></textarea>
            <p className="form-review__warning" style={{opacity: `${invalidComment ? 1 : 0}`}}>Заполните поле</p>
            <button className="button button--medium-20 form-review__button" type="submit" disabled={isSaving} tabIndex={7}>{isSaving ? <LoadingScreen /> : 'Отправить отзыв'}</button>
          </form>
          <button className="modal__close-btn button-cross" data-testid="close" type="button" aria-label="Закрыть" onClick={(evt) => setIsFormModalOpenedCb(false)}><span className="button-cross__icon" ref={lastAutofocusRef} tabIndex={8}></span><span className="modal__close-btn-interactive-area"></span>
          </button>
          <span tabIndex={9} onFocus={(evt) => {firstAutofocusRef.current?.focus();}}/>
        </div>
      </div>
    </div>
  );
}

export default ModalReviewForm;
