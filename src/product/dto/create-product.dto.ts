
import { IsAlphanumeric, IsBoolean, IsDateString, IsNumber, IsOptional, IsString, Max, MaxLength, ValidateNested } from "class-validator";
import { CreateShippingDto } from "./create-shipping";
import { CreateRecurrentDto } from "../../recurrent/dto/create-recurrent.dto";
import { Type } from "class-transformer";
//import { IsString } from "class-validator/types/decorator/typechecker/IsString";


export class CreateProductDto {
    @IsOptional()
    @IsAlphanumeric()
    @MaxLength(20)
    OrderNumber : string;

    @IsString()
    @MaxLength(255)
    type : string

    @IsString()
    @MaxLength(128)
    name : string

    @IsOptional()
    @IsString()
    @MaxLength(256)
    description : string

    @IsNumber()
    @Max(1000000000)
    price : number;

    @IsOptional()
    @IsNumber()
    @Max(2000000)
    weight : number;

    @IsOptional()
    @IsDateString()
    @MaxLength(20)
    expirationDate : string;

    @IsOptional()
    @IsNumber()
    @Max(12)
    maxNumberOfInstallments : number;

    @IsOptional()
    @IsNumber()
    @Max(2)
    quantity : number;

    @IsOptional()
    @IsString()
    @MaxLength(32)
    sku : string;

    //@IsObject()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateShippingDto)
    shipping : CreateShippingDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateRecurrentDto)
    recurrent : CreateRecurrentDto;
    
    @IsOptional()
    @IsBoolean()
    showDescription : boolean;

    @IsOptional()
    @IsString()
    @MaxLength(13)
    softDescriptor : string;

}
