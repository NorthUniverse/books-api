import { Injectable, NotFoundException } from '@nestjs/common';

import { Book } from './book.module';

// Books service
@Injectable()
export class BooksService {
  private books: Book[] = [];

  // inserts a book into the books array(in memory)
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

  //gets all the books
  getBooks() {
    //array is a reference type, returing new arry instead of a point to the array
    return [...this.books];
  }

  //gets all the books with title
  getSearchBooks(bookTitle: string) {
    const searchResults = this.books.filter((book) => {
      const eachBookTitle = book.title.toLowerCase();
      return eachBookTitle.includes(bookTitle.toLowerCase());
    });
    if (!searchResults) {
      throw new NotFoundException(`no books with ${bookTitle} found`);
    }
    //array is a reference type, returing new arry instead of a point to the array
    return [...searchResults];
  }
}
