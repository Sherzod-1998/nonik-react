import { 
  BrandCollection,
    ProductCollection, 
    ProductStatus 
  } from "../enums/product.enum";
  
  export interface Product {
	_id: string;
	productStatus: ProductStatus;
	productCollection: ProductCollection;
	brandCollection: BrandCollection;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productDesc?: string;
	productImages: string[];
	productView: number;
	createdAt: Date;
	updatedAt: Date;
}
  
  export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;
  }