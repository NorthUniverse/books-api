"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_services_1 = require("./books.services");
const book_dto_1 = require("./dto/book.dto");
const book_dto_2 = require("./dto/book.dto");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    addBook(createBookDto) {
        const generatedId = this.booksService.insertBook(createBookDto.title, createBookDto.authors, createBookDto.description, createBookDto.publicationDate, createBookDto.infoLink);
        return { id: generatedId };
    }
    getAllBooks() {
        return this.booksService.getBooks();
    }
    getGoogleBooks(reqParam) {
        console.log(`${new Date()} ${reqParam.searchQuery}`);
        return this.booksService.getGoogleBooks(reqParam);
    }
    getBooks(bookTitle) {
        return this.booksService.getSearchBooks(bookTitle);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "addBook", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_2.QueryParamDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getGoogleBooks", null);
__decorate([
    (0, common_1.Get)(':bookTitle'),
    __param(0, (0, common_1.Param)('bookTitle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getBooks", null);
BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_services_1.BooksService])
], BooksController);
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map