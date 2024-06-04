import { Product } from "src/product/entities/product.entity";
import { Recurrent } from "src/product/entities/recurrent.entity";
import { Shipping } from "src/product/entities/shipping.entity";
import { Column } from "typeorm";

interface Ishippin{
    type : string;
    name : string;
    price : number;
}

interface Irecurrent{
    interval : string;
    endDate : string;
}

interface Method{
    method : string;
    rel : string;
    href : string;
}
/**
 * this class is responsible for generate a response for api
 */
export class Response_api {
    id : string;
    shortUrl : string;
    OrderNumber : string;
    type : string;
    name : string;
    description : string;
    showDescription : boolean;
    price : number;
    weight : number;
    shipping : Ishippin;
    recurrent : Irecurrent;
    softDescriptor : string;
    expirationDate : string;
    maxNumberOfInstallments : number;

    met_get : Method;
    met_put : Method;
    met_del : Method;
    
    constructor(product : Product, shipping : Shipping, recurency : Recurrent) {
        this.id = product.id;
        this.shortUrl = product.short_url;
        this.OrderNumber = product.OrderNumber;
        this.type = product.type;
        this.name = product.name;
        this.description = product.description;
        this.showDescription = product.showDescription;
        this.price = product.price;
        this.weight = product.weight;
        
        this.shipping = {
            type : shipping.type,
            name : shipping.name,
            price : shipping.price
        }
        this.recurrent = {
            interval : recurency.interval,
            endDate : recurency.endDate
        }
        
        this.softDescriptor = product.softDescriptor;
        this.expirationDate = product.expirationDate;
        this.maxNumberOfInstallments = product.maxNumberOfInstallments;

        this.met_get = {
            method : "GET",
            rel : "self",
            href : `http://localhost:3000/product/${this.id}`
        }

        this.met_put = {
            method : "PUT",
            rel : "update",
            href : `http://localhost:3000/product/${this.id}`
        }

        this.met_del = {
            method : "DELETE",
            rel : "delete",
            href : `http://localhost:3000/product/${this.id}`
        }
    }
    
}