export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export type Role = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
}

export const products: Product[] = [
  { id: 1, name: "Shirt", price: 49.9, stock: 100 },
  { id: 2, name: "Jeans", price: 129.9, stock: 50 }
];

export const users: User[] = [
  { id: 1, email: "admin@example.com", password: "123456", role: "admin" },
  { id: 2, email: "user@example.com",  password: "123456", role: "user"  },
];
