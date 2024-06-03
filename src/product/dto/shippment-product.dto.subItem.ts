import { IsNumber, IsString } from "class-validator";
export class CreateShippingDto{
    @IsString()
    public type: string;

    @IsString()
    public name : string;

    @IsNumber()
    public price : number;
}