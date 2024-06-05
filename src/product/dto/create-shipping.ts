import { IsNumber, IsOptional, IsString, Max, MaxLength } from "class-validator";
export class CreateShippingDto{
    @IsString()
    @MaxLength(255)
    public type: string;

    @IsOptional()
    @IsString()
    @MaxLength(8)
    public originZipCode : string;

    @IsString()
    @MaxLength(128)
    public name : string;

    @IsNumber()
    @Max(10000000000)
    public price : number;
}