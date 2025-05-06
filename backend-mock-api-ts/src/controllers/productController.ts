import { Request, Response } from 'express';
import { products, Product } from '../data';

let nextId = products.length + 1;

export const getAll = (_req: Request, res: Response): void => {
  res.json(products);
};

export const getById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);

  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  res.json(product);
};

export const create = (req: Request, res: Response): void => {
  const { name, price, stock } = req.body as Partial<Product>;

  if (!name || price == null || stock == null) {
    res.status(400).json({ message: 'Missing fields' });
    return;
  }

  const newProduct: Product = { id: nextId++, name, price, stock };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const update = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);
  const { name, price, stock } = req.body as Partial<Product>;

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;

  res.json(product);
};

export const remove = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === id);

  if (index < 0) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  products.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
};
