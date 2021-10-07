import { Injectable, NotFoundException } from '@nestjs/common';

import { Book } from './book.module';

// Books service
@Injectable()
export class BooksService {
  private books: Book[] = [];

  insertBook(
    title: string,
    author: string,
    description: string,
    publicationDate: string,
    image: string,
  ) {
    // I'd use an library to generate unique ID here for simplicity using math.random now.
    const bookId = Math.random().toString();
    const newBook = new Book(
      bookId,
      title,
      author,
      description,
      publicationDate,
      image,
    );
    this.books.push(newBook);
    return bookId;
  }

  getBooks() {
    return [...this.books];
  }

  getSearchBooks(bookTitle: string) {
    const searchResults = this.books.filter((book) => {
      const eachBookTitle = book.title.toLowerCase();
      return eachBookTitle.includes(bookTitle.toLowerCase());
    });
    if (!searchResults) {
      throw new NotFoundException(`no books with ${bookTitle} found`);
    }
    return [...searchResults];
  }
}
