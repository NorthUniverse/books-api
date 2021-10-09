import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiStatus(): string {
    return 'Books API is up!';
  }
}
