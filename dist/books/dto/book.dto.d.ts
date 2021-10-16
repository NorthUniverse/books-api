export declare class CreateBookDto {
    readonly id: string;
    readonly title: string;
    readonly authors: string[];
    readonly description: string;
    readonly publicationDate: string;
    readonly infoLink: string;
}
export declare class QueryParamDto {
    searchQuery: string;
    startIndex: string;
}
