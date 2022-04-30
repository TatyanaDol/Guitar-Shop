

export type GuitarData = {
    id: number
    name: string
    vendorCode: string
    type: string
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
