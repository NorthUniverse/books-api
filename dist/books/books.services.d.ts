import { Book } from './book.module';
export declare class BooksService {
    private books;
    private searchedBooks;
    private totalItems;
    private searchedParsedBooks;
    insertBook(title: string, authors: string[], description: string, publicationDate: string, infoLink: string): string;
    getBooks(): Book[];
    getSearchBooks(bookTitle: string): Book[];
    getGoogleBooks(reqParam: any): Promise<{
        totalItems: string;
        searchedBooks: any[];
        auth: boolean;
    }>;
    getGoogleBooksFromApi(url: string): Promise<void>;
    parseBooks: () => void;
    clearMemory: () => void;
    decryptData: (data: any) => any;
}
