import { IsDateString, IsJSON, IsNumber, IsString, isNumber } from "class-validator";
export class Shipping{
    @IsString()
    public type: string;

    @IsString()
    public name : string;

    @IsNumber()
    public price : number;
}