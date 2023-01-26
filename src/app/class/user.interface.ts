export class Role {
    id: number;
    name: string;
}

export class DataList {
    id: number;
    name: string;
    email: string;
    username: string;
    pictureUser?: any;
    roles: Role[];
}

export class ListUsers {
    dataList: DataList[];
    numberPage: number;
    sizePage: number = 0;
    dataLength: number;
    totalPages: number;
    lastPage: boolean;
}