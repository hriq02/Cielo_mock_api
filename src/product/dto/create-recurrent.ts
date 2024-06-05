import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRecurrentDto{
    @IsOptional()
    @IsString()
    @MaxLength(128)
    interval : string;

    @IsOptional()
    @IsDateString()
    @MaxLength(10)
    endDate : string;
}