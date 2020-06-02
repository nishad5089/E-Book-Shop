import { Category } from './category';

export class Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: number;
    coverFileName: string;
    category: Category[]
}
