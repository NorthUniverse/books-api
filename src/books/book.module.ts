//Books Module/Class Object
export class Book {
  constructor(
    id: string,
    public title: string,
    public authors: string[],
    public description: string,
    public publicationDate: string,
    public infoLink: string,
    public imageUrl: string,
  ) {}
}
