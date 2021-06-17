export interface SearchResult {
    status: boolean;
    error_msg: string;
    info: {
        FirstName: string;
        LastName: string;
        Email: string;
        Parish: string;
        Phone: string;
        City: string;
        State: string;
        Address: string;
    };
    items: {};
}
