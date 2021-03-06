//Create Books Data Transfer Objects
export class CreateBookDto {
  readonly id: string;
  readonly title: string;
  readonly authors: string[];
  readonly description: string;
  readonly publicationDate: string;
  readonly infoLink: string;
}

//QueryParams Data Transfer Objects
export class QueryParamDto {
  searchQuery: string;
  startIndex: string;
}
