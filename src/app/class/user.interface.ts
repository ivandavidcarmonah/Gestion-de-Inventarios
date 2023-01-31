import { IRoles } from "../interfaces/roles.interface";
import { IGender, ILanguage } from "./master-data";

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

export interface UserDetail {
    id:                number;
    username:          string;
    name:              string;
    email:             string;
    birthDate:         Date;
    numberPhone:       number;
    password:          string;
    pictureUser:       null;
    modification_date: null;
    gender:            IGender;
    language:          ILanguage;
    roles:             IRoles[];
}

