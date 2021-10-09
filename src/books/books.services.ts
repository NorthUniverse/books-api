import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

import { Book } from './book.module';

// Books service
@Injectable()
export class BooksService {
  private books: Book[] = [];
  private searchedBooks = [];
  private totalItems = '';
  private searchedParsedBooks = [];

  // inserts a book into the books array(in memory), ideally this would write into a database
  insertBook(
    title: string,
    authors: string[],
    description: string,
    publicationDate: string,
    infoLink: string,
  ) {
    // I'd use an library to generate unique ID here for simplicity using math.random now.
    const bookId = Math.random().toString();
    const newBook = new Book(
      bookId,
      title,
      authors,
      description,
      publicationDate,
      infoLink,
    );
    this.books.push(newBook);
    return bookId;
  }

  //gets all the books in memory, ideally this would get books from database with a max limit.
  getBooks() {
    //array is a reference type, returing new arry instead of a point to the array
    return [...this.books];
  }

  //gets all the books with title in memory, ideally this would search books from database
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

  //gets books from google api, default search results shows 10 books.
  async getGoogleBooks(reqParam) {
    //secretKey should be set an environement variable for security reasons; Hard coding it for now for simplicity
    const startIndex = reqParam.startIndex || '1';
    const secretKey = 'AIzaSyAstWK0_u4qtuMi-P4kVkhKN7jkozdG97Q';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${reqParam.searchQuery}&startIndex=${startIndex}&key=${secretKey}`;
    await this.getGoogleBooksFromApi(url);
    this.parseBooks();
    return {
      totalItems: this.totalItems,
      searchedBooks: this.searchedParsedBooks,
    };
  }

  async getGoogleBooksFromApi(url: string) {
    await axios.get(url).then((res) => {
      this.totalItems = res.data['totalItems'];
      this.searchedBooks = res.data['items'];
    });
  }

  parseBooks() {
    this.searchedBooks.forEach((bookItem) => {
      const newBook = new Book(
        bookItem.id,
        bookItem.volumeInfo.title,
        bookItem.volumeInfo.authors,
        bookItem.volumeInfo.description,
        bookItem.volumeInfo.publishedDate,
        bookItem.volumeInfo.infoLink,
      );
      this.searchedParsedBooks.push(newBook);
    });
  }
}
