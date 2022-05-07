
type ShowMoreButtonProps = {
    onClickCb: () => void;
}

export function ShowMoreButton({onClickCb}: ShowMoreButtonProps): JSX.Element {

  return (
    <button className="button button--medium reviews__more-button" type="button" onClick={(evt) => onClickCb()}>Показать еще отзывы</button>
  );
}
