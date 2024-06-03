
import { IsAlphanumeric, IsDateString, IsJSON, IsNumber, IsObject, IsString, ValidateNested, isNumber } from "class-validator";
import { Shipping } from "../subItens/shippment";
import { Recurrent } from "../subItens/recurrent";
import { Type } from "class-transformer";
//import { IsString } from "class-validator/types/decorator/typechecker/IsString";


export class CreateProductDto {
    
    id : string;
    
    @IsAlphanumeric()
    OrderNumber : number;

    @IsString()
    type : string

    @IsString()
    name : string

    @IsString()
    description : string

    @IsNumber()
    price : number;

    @IsNumber()
    weight : number;

    @IsDateString()
    expirationDate : string;

    @IsNumber()
    maxNumberOfInstallments : number;

    @IsNumber()
    quantity : number;

    @IsString()
    sku : string;

    //@IsObject()
    @ValidateNested({ each: true })
    @Type(() => Shipping)
    shipping : Shipping

    @ValidateNested({ each: true })
    @IsObject()
    recurrent : Recurrent

    // @IsString()
    // shipping_type : string;

    // @IsString()
    // shipping_name : string;

    // @IsNumber()
    // shipping_price : number;

    // @IsString()
    // recurrent : string;

    // @IsDateString()
    // end_date : string;

}
