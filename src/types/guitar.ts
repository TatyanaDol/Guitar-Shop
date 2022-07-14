import { GUITAR_TYPE } from '../const';

export type GuitarData = {
    id: number
    name: string
    vendorCode: string
    type: keyof typeof GUITAR_TYPE
    description: string
    previewImg: string
    stringCount: number
    rating: 1 | 2 | 3 | 4 | 5
    price: number
    comments: CommentsData
}

export type GuitarsData = GuitarData[];

export type CommentData = {
    id: string
    userName: string
    advantage: string
    disadvantage: string
    comment: string
    rating: 1 | 2 | 3 | 4 | 5
    createAt: string
    guitarId: number
}

export type CommentsData = CommentData[];

export type NewCommentData = {

   comment: {
    guitarId: number
    userName: string
    advantage: string
    disadvantage: string
    comment: string
    rating: number
   }
   setIsSavingCb:  React.Dispatch<React.SetStateAction<boolean>>
   setIsSuccessReviewModalOpenedCb: React.Dispatch<React.SetStateAction<boolean>>
   setIsFormModalOpenedCb: React.Dispatch<React.SetStateAction<boolean>>


}

export type GuitarTypesChecked = {
    acoustic: boolean,
    electric: boolean,
    ukulele: boolean,
}

export type StringsCountChecked = {
    4: boolean,
    6: boolean,
    7: boolean,
    12: boolean,
}


export type GuitarInCartData = {
    id: number
    name: string
    vendorCode: string
    type: keyof typeof GUITAR_TYPE
    description: string
    previewImg: string
    stringCount: number
    rating: 1 | 2 | 3 | 4 | 5
    price: number
    quantity: number
}

export type GuitarsInCartData = GuitarInCartData[];
