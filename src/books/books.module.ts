import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.services';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
