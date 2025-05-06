export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
}

export const products: Product[] = [
  { id: 1, name: "Camiseta", price: 49.9, stock: 100 },
  { id: 2, name: "Calça Jeans", price: 129.9, stock: 50 }
];

export const users: User[] = [
  { id: 1, email: "user@example.com", password: "123456" }
];