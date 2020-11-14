export interface AuthResponse {
    status: boolean;
    user: {
        Id: number;
        FirstName: string;
        LastName: string;
        Email: string;
        Parish: string;
        AccessToken: string;
        ExpiresIn: number;
    };
    info: {
        Id: number;
        FirstName: string;
        LastName: string;
        Dob: string;
        Wedding: string;
        Email: string;
        Phone: string;
        Address: string;
        City: string;
        State: string;
        Parish: string;
        Password: string;
        Region: string;
        Picture: string;
    };
}
