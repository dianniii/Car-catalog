export interface Car {
    id: number,
    name: string,
    model: string,
    year: number,
    color: string,
    price: number,
    latitude: number,
    longitude: number
}

export type SortField = 'year' | 'price';
export type SortDirection = 'asc' | 'desc';