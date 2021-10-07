import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.services';

// Controller for books
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post()
  addBook(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('description') description: string,
    @Body('publicationDate') publicationDate: string,
    @Body('image') image: string,
  ) {
    const generatedId = this.booksService.insertBook(
      title,
      author,
      description,
      publicationDate,
      image,
    );
    return { id: generatedId };
  }

  @Get()
  getAllBooks() {
    return this.booksService.getBooks();
  }

  @Get(':bookTitle')
  getBooks(@Param('bookTitle') bookTitle: string) {
    return this.booksService.getSearchBooks(bookTitle);
  }
}
