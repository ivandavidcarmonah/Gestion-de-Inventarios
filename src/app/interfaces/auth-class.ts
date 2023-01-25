 export interface AuthInterface {
    emailOrUsername: string;
    password: string
}

export interface Role {
    id: number;
    name: string;
}

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    username: string;
    pictureUser?: any;
    roles: Role[];
}

export interface LoginResponse {
    tokenType: string;
    tokenAcces: string;
    userDTO: UserDTO;
    ok: boolean;
}