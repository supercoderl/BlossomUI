import { UserInfo } from "./user";

export interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    hasResponse: boolean;
    contactResponse?: ContactResponse | null;
}

export interface ContactResponse {
    id: string;
    contactId: string;
    responseText: string;
    responderId: string;
    createdAt: Date;
    responder?: UserInfo | null;
}