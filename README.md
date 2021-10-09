<h1 align="center">Welcome to books-api</h1>

## Description

books-api exposes end point to

1. Add book to memory
2. Get books from memory
3. Get books from memory with a specific title
4. Get books from memory google-api

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## HTTP requests

```bash
# Post request to /books
post request to `/books` with book object within the body adds to book to memory(db not yet implemented)

# Get request to /books
get request to `/books` gets all books from memory(db not yet implemented)

# Get request to /books/param
get request to `/books/param` searches for book with title passed in param and gets all books from memory(db not yet connected) that matches title

# Get request to /books/search?searchQuery=searchValue
get request to `/books/search?searchQuery=searchValue` gets all books from google-api, trims the response and returs parse meta data.
```

## Stay in touch

- Author - [Dennis Richard](https://www.linkedin.com/in/dennis-richard-3176737/)
