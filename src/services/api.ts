import axios from "axios";
import { Product } from "../types/Product";

const BASE_URL="https://dummyjson.com/products"

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${BASE_URL}`);
    console.log("a",response.data.products)
    return response.data.products;
  };

  export const searchProducts = async (query: string): Promise<Product[]> => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`);
    return response.data.products;
  };
  
  export const addProduct = async (newProduct: Partial<Product>): Promise<Product> => {
    const response = await axios.post(`${BASE_URL}/add`, newProduct);
    return response.data;
  };


  export const deleteProduct = async (id: number): Promise<Product> => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  };

