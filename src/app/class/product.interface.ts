export class ProductResponseDTO {
    dataList:   DataList[];
    numberPage: number;
    sizePage:   number;
    dataLength: number;
    totalPages: number;
    lastPage:   boolean;
}

export class DataList {
    name:        string;
    description: string;
    preparesin:  string;
    allergies:   string;
    price:       number;
    picture:     null;
    typeProduct: null;
    company:     null;
    creaDate:    null;
    modDate:     null;
    creaUser:    number;
    modUser:     number;
    user:        User;
    valid:       boolean;
    spent:       boolean;
    idProduct:   number;
}

export class User {
    id:          number;
    name:        null | string;
    email:       null | string;
    username:    null | string;
    pictureUser: null;
    roles:       Role[];
}

export class Role {
    id:   number;
    name: string;
}


export class ProductDTO {
    name:        string;
    description: string;
    preparesin:  string;
    allergies:   string;
    price:       number;
    picture:     null;
    typeProduct: null;
    company:     null;
    creaDate:    null;
    modDate:     null;
    creaUser:    number;
    modUser:     number;
    user:        User;
    valid:       boolean;
    spent:       boolean;
    idProduct:   number;
}
