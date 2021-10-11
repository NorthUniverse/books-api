import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.services';
import { CreateBookDto } from './dto/book.dto';
import { QueryParamDto } from './dto/book.dto';

// Controller for books
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Post call to add the book
  @Post()
  addBook(@Body() createBookDto: CreateBookDto) {
    const generatedId = this.booksService.insertBook(
      createBookDto.title,
      createBookDto.authors,
      createBookDto.description,
      createBookDto.publicationDate,
      createBookDto.infoLink,
    );
    return { id: generatedId };
  }

  // Get call to add the book
  @Get()
  getAllBooks() {
    return this.booksService.getBooks();
  }

  //Get call to /books/search
  @Get('search')
  getGoogleBooks(@Query() reqParam: QueryParamDto) {
    console.log(`${new Date()} ${reqParam.searchQuery}`);
    return this.booksService.getGoogleBooks(reqParam);
  }

  //Get call to search for a book title
  @Get(':bookTitle')
  getBooks(@Param('bookTitle') bookTitle: string) {
    return this.booksService.getSearchBooks(bookTitle);
  }
}
