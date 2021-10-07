//Books Data Transfer Objects
export class CreateBookDto {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly publicationDate: string;
  readonly image: string;
}
