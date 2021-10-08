import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.services';
import { CreateBookDto } from './dto/book.dto';

// Controller for books
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post()
  async addBook(@Body() createBookDto: CreateBookDto) {
    const generatedId = this.booksService.insertBook(
      createBookDto.title,
      createBookDto.author,
      createBookDto.description,
      createBookDto.publicationDate,
      createBookDto.image,
    );
    return await { id: generatedId };
  }

  @Get()
  async getAllBooks() {
    return await this.booksService.getBooks();
  }

  @Get('google')
  async getGoogleBooks() {
    return await this.booksService.getGoogleBooks();
  }

  @Get(':bookTitle')
  async getBooks(@Param('bookTitle') bookTitle: string) {
    return await this.booksService.getSearchBooks(bookTitle);
  }
}
