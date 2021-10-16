import { BooksService } from './books.services';
import { CreateBookDto } from './dto/book.dto';
import { QueryParamDto } from './dto/book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    addBook(createBookDto: CreateBookDto): {
        id: string;
    };
    getAllBooks(): import("./book.module").Book[];
    getGoogleBooks(reqParam: QueryParamDto): Promise<{
        totalItems: string;
        searchedBooks: any[];
        auth: boolean;
    }>;
    getBooks(bookTitle: string): import("./book.module").Book[];
}
