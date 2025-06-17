export interface Filter {
    query?: Page;
    searchTerm?: string;
    includeDeleted?: boolean;  
}

interface Page {
    page: number;
    pageSize: number;
}