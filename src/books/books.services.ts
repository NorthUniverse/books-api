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
    this.clearMemory();
    console.log(reqParam);
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
    // 'purpleHippo' must be an env variable
    if (key !== 'purpleHippo') {
      return {
        totalItems: this.totalItems,
        searchedBooks: this.searchedParsedBooks,
        auth: false,
      };
    } else {
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

  async getGoogleBooksFromApi(url: string) {
    const res = await axios.get(url).then((response) => {
      return response;
    });
    this.totalItems = res.data['totalItems'];
    this.searchedBooks = res.data['items'] || [];
  }

  parseBooks = () => {
    if (this.searchedBooks.length === 0) {
      this.searchedParsedBooks = [];
    }
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
  };

  clearMemory = () => {
    this.totalItems = '';
    this.searchedParsedBooks = [];
  };

  // https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/
  decryptData = (data) => {
    data = JSON.parse(data);
    // Includes crypto module
    const crypto = require('crypto');
    const key = data.key;
    let iv = Buffer.from(data.iv, 'hex');
    let encryptedText = Buffer.from(data.encryptedData, 'hex');
    // Creating Decipher
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    // Updating encrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    // returns data after decryption
    return decrypted.toString();
  };
}
