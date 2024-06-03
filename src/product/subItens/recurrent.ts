import { IsDateString, IsJSON, IsNumber, IsString, isNumber } from "class-validator";

export class Recurrent{
    @IsString()
    recurrent : string;

    @IsDateString()
    end_date : string;
}