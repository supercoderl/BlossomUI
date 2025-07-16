export interface Filter {
    query?: Page;
    searchTerm?: string;
    includeDeleted?: boolean;
    [key: string]: any
}

interface Page {
    page: number;
    pageSize: number;
}