
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import {v4 as uuid} from "uuid"
import ProductB from "../entity/productB";

export default class ProductFactory{

    public static create(
        type:string,
        name: string,
        price:number,
    ): ProductInterface {

        switch (type) {
            case "firstOp":
                return new Product(uuid(), price, name )
            case "secondOp":
                return new ProductB(uuid(), price, name )
                
            default:
                throw new Error("Product type not supported");
                
        }

    } 

}