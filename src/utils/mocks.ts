import {random, name, image} from 'faker';
import { CommentData, GuitarData } from '../types/guitar';


export const makeFakeGuitarData = (): GuitarData => ({

  id: Math.floor(Math.random() * 100),
  name: name.title(),
  vendorCode: 'SO757575',
  type: 'ukulele',
  description: random.words(),
  previewImg: image.imageUrl(),
  stringCount: Math.floor(Math.random() * 7),
  rating: Math.floor(Math.random() * 5),
  price: Math.floor(Math.random() * 10000),
  comments: [makeFakeReview(), makeFakeReview()],

} as GuitarData);

export const makeFakeReview = (): CommentData => ({

  id: random.words(),
  userName: name.title(),
  advantage: random.words(),
  disadvantage: random.words(),
  comment: random.words(),
  rating: Math.floor(Math.random() * 5),
  createAt: '2022-02-13T21:48:13.678Z',
  guitarId: Math.floor(Math.random() * 100),
} as CommentData);
