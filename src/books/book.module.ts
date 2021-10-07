//Books Module/Class Object
export class Book {
  constructor(
    id: string,
    public title: string,
    public author: string,
    public description: string,
    public publicationDate: string,
    public image: string
  ) {}
}
