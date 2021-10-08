import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

import { Book } from './book.module';

// Books service
@Injectable()
export class BooksService {
  private books: Book[] = [];
  private searchedBooks = [];

  // inserts a book into the books array(in memory)
  async insertBook(
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
    return await bookId;
  }

  //gets all the books
  async getBooks() {
    //array is a reference type, returing new arry instead of a point to the array
    return await [...this.books];
  }

  //gets all the books with title
  async getSearchBooks(bookTitle: string) {
    const searchResults = this.books.filter((book) => {
      const eachBookTitle = book.title.toLowerCase();
      return eachBookTitle.includes(bookTitle.toLowerCase());
    });
    if (!searchResults) {
      throw new NotFoundException(`no books with ${bookTitle} found`);
    }
    //array is a reference type, returing new arry instead of a point to the array
    return await  [...searchResults];
  }

  //gets books from google api
  async getGoogleBooks() {
    //key should be set an environement variable for security reasons, hard coding it for now for simplicity
    const url = `https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=AIzaSyAstWK0_u4qtuMi-P4kVkhKN7jkozdG97Q`;
    await this.getGoogleBooksFromApi(url);
    return this.searchedBooks;
  }

  async getGoogleBooksFromApi(url: string) {
    const response = await axios.get(url);
    this.searchedBooks = response.data['items'];
  }
}
