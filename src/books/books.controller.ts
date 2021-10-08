import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.services';
import { CreateBookDto } from './dto/book.dto';

// Controller for books
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post()
  addBook(@Body() createBookDto: CreateBookDto) {
    const generatedId = this.booksService.insertBook(
      createBookDto.title,
      createBookDto.author,
      createBookDto.description,
      createBookDto.publicationDate,
      createBookDto.image,
    );
    return { id: generatedId };
  }

  @Get()
  getAllBooks() {
    return this.booksService.getBooks();
  }

  @Get('google')
  getGoogleBooks() {
    return this.booksService.getGoogleBooks();
  }

  @Get(':bookTitle')
  getBooks(@Param('bookTitle') bookTitle: string) {
    return this.booksService.getSearchBooks(bookTitle);
  }
}
