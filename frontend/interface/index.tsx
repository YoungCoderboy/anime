import { ObjectId } from "mongoose";
export interface Product_interface {
  id: string;
  name: string;
  slug?: string;
  stock: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  description: string;
  priceDiscount?: number;
  imageCover?: string;
  images: string[];
  brand: string;
  category: string;
  sellers: ObjectId | string;
  secretProduct: boolean;
}

export interface ProductContextType_interface {
  top_products: [] | Product_interface[];
  top_products_loading: boolean;
  top_products_error: boolean;
  products: [] | Product_interface[];
  category: string[];
  brands: string[];
  products_loading: boolean;
  products_error: boolean;
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: Product_interface;
  fetchProducts: () => void;
  fetchSingleProduct: (id: string) => void;
  getTopProducts: () => void;
}

export interface ProductState_interface {
  top_products: [] | Product_interface[];
  products: [] | Product_interface[];
  top_products_loading: boolean;
  top_products_error: boolean;
  products_loading: boolean;
  products_error: boolean;
  category: string[];
  brands: string[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: Product_interface;
}
