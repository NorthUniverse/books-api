"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const book_module_1 = require("./book.module");
let BooksService = class BooksService {
    constructor() {
        this.books = [];
        this.searchedBooks = [];
        this.totalItems = '';
        this.searchedParsedBooks = [];
        this.parseBooks = () => {
            if (this.searchedBooks.length === 0) {
                this.searchedParsedBooks = [];
            }
            this.searchedBooks.forEach((bookItem) => {
                const newBook = new book_module_1.Book(bookItem.id, bookItem.volumeInfo.title, bookItem.volumeInfo.authors, bookItem.volumeInfo.description, bookItem.volumeInfo.publishedDate, bookItem.volumeInfo.infoLink);
                this.searchedParsedBooks.push(newBook);
            });
        };
        this.clearMemory = () => {
            this.totalItems = '';
            this.searchedParsedBooks = [];
        };
        this.decryptData = (data) => {
            data = JSON.parse(data);
            const crypto = require('crypto');
            const key = data.key;
            let iv = Buffer.from(data.iv, 'hex');
            let encryptedText = Buffer.from(data.encryptedData, 'hex');
            let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        };
    }
    insertBook(title, authors, description, publicationDate, infoLink) {
        const bookId = Math.random().toString();
        const newBook = new book_module_1.Book(bookId, title, authors, description, publicationDate, infoLink);
        this.books.push(newBook);
        return bookId;
    }
    getBooks() {
        return [...this.books];
    }
    getSearchBooks(bookTitle) {
        const searchResults = this.books.filter((book) => {
            const eachBookTitle = book.title.toLowerCase();
            return eachBookTitle.includes(bookTitle.toLowerCase());
        });
        if (!searchResults) {
            throw new common_1.NotFoundException(`no books with ${bookTitle} found`);
        }
        return [...searchResults];
    }
    async getGoogleBooks(reqParam) {
        this.clearMemory();
        if (reqParam.debug === '1') {
            const startIndex = reqParam.startIndex || '0';
            const secretKey = 'AIzaSyCz6Q7UNsH_VmBbrAxdM1J-ksoFSE6dT6U';
            const url = `https://www.googleapis.com/books/v1/volumes?q=${reqParam.searchQuery}&startIndex=${startIndex}&key=${secretKey}`;
            await this.getGoogleBooksFromApi(url);
            this.parseBooks();
            return {
                totalItems: this.totalItems,
                searchedBooks: this.searchedParsedBooks,
                auth: true,
            };
        }
        const key = this.decryptData(reqParam.encryptedData);
        if (key !== 'purpleHippo') {
            return {
                totalItems: this.totalItems,
                searchedBooks: this.searchedParsedBooks,
                auth: false,
            };
        }
        else {
            const startIndex = reqParam.startIndex || '0';
            const secretKey = 'AIzaSyCz6Q7UNsH_VmBbrAxdM1J-ksoFSE6dT6U';
            const url = `https://www.googleapis.com/books/v1/volumes?q=${reqParam.searchQuery}&startIndex=${startIndex}&key=${secretKey}`;
            await this.getGoogleBooksFromApi(url);
            this.parseBooks();
            return {
                totalItems: this.totalItems,
                searchedBooks: this.searchedParsedBooks,
                auth: true,
            };
        }
    }
    async getGoogleBooksFromApi(url) {
        const res = await axios_1.default.get(url).then((response) => {
            return response;
        });
        this.totalItems = res.data['totalItems'];
        this.searchedBooks = res.data['items'] || [];
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.services.js.map