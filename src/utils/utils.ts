import { CommentsData, GuitarTypesChecked, StringsCountChecked} from '../types/guitar';

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

export function makeAPiaceOfReuestURL(key: string, obj: StringsCountChecked | GuitarTypesChecked) {

  let URLPart = '';
  const data = Object.entries(obj);

  data.forEach((element) => {
    if(element[1]) {
      URLPart = URLPart.concat(key, element[0]);
    }
  });

  return URLPart;
}
