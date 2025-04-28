export interface Product{
    id:number;
    title:string;
    description:string;
    price:number;
    favorite?:boolean;
    images?:string[];
    quantity?:number;
}