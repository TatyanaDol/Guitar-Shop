import { CommentsData } from '../types/guitar';

export function sortReviewsByDate(reviews: CommentsData) {

  const arrayForSort = [...reviews];
  return arrayForSort.sort((reviewA,reviewB)=> {
    const dateA = new Date(reviewA.createAt) as unknown as number;
    const dateB = new Date(reviewB.createAt) as unknown as number;
    return  dateB - dateA;
  });
}

export function getGuitarImgForSrcSet(guitarImg: string) {
  const imgForSrcSet = guitarImg.split('.')[0];
  return imgForSrcSet;
}
