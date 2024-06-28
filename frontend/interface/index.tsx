import { ObjectId } from "mongoose";

export interface User_interface {
  id: string;
  name: string;
  email: string;
  photo: string;
}

export interface TopProducts_interface {
  id: string;
  name: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
}
export interface Review_interface {
  id: string;
  review: string;
  comment: string;
  rating: number;
  userRef: User_interface;
  product: string;
}

export interface seller {
  id: string;
  name: string;
  email: string;
  photo: string;
}
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
  reviews: [] | Review_interface[];
  brand: string;
  category: string;
  sellers: {} | seller;
  secretProduct: boolean;
}

export interface ProductContextType_interface {
  top_products: [] | Product_interface[];
  top_products_loading: boolean;
  top_products_error: boolean;
  max_price: number;
  min_price: number;
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
  max_price: number;
  min_price: number;
  products_loading: boolean;
  products_error: boolean;
  category: string[];
  brands: string[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: Product_interface;
}

export interface CartInterface {
  id: string;
  name: string;
  imageCover: string;
  price: number;
  discount: number;
  quantity: number;
  max: number;
}

export interface CardContextType {
  cart: [] | CartInterface[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
  addToCart: (id: string, product: object) => void;
  removeFromCart: (id: string) => void;
  toggleAmount: (id: string, value: string) => void;
  clearCart: () => void;
}
