export interface Order {
    _id: string;
    customerName: string;
    items: string[];
    totalAmount: number;
    status: string;
    createdAt: string;
}

export interface User {
    _id: string;
    username: string;
    password: string;
    role: string;
}
