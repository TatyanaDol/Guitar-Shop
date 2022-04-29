

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
}

export type GuitarsData = GuitarData[];
