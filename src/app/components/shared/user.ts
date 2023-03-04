export interface PublicUser {
    uid: string;
    displayName: string;
    photoURL: string;
}

export interface PrivateUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    imageServiceKey?:string;
}

export interface User {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    emailVerified: boolean;
}