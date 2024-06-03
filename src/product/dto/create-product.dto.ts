
import { IsAlphanumeric, IsBoolean, isBoolean, IsDateString, IsJSON, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateShippingDto } from "./shippment-product.dto.subItem";
import { CreateRecurrentDto } from "./recurrent-product.dto.subItem";
import { Type } from "class-transformer";
//import { IsString } from "class-validator/types/decorator/typechecker/IsString";


export class CreateProductDto {
    @IsAlphanumeric()
    OrderNumber : string;

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

    @IsOptional()
    @IsString()
    sku : string;

    //@IsObject()
    @ValidateNested({ each: true })
    @Type(() => CreateShippingDto)
    shipping : CreateShippingDto;

    @ValidateNested({ each: true })
    @Type(() => CreateRecurrentDto)
    recurrent : CreateRecurrentDto;
    
    @IsOptional()
    @IsBoolean()
    showDescription : boolean;

    @IsOptional()
    @IsString()
    softDescriptor : string;

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
