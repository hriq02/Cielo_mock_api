import { IsDateString, IsString } from "class-validator";

export class CreateRecurrentDto{
    @IsString()
    interval : string;

    @IsDateString()
    endDate : string;
}