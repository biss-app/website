export interface Ingredient {
  name: string;
  allergen?: string;
}

export interface ClientProduct {
  _id: string;
  name: string;
  label?: string;
  price: number;
  discount?: number;
  stock?: number;
  description?: string;
  ingredients?: Ingredient[];
}