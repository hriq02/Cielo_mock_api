import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurrentDto } from './create-recurrent.dto';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength } from 'class-validator';


export class UpdateRecurrentDto extends PartialType(CreateRecurrentDto) {
    
    @IsOptional()
    @IsUUID()
    @MaxLength(36)
    PagadorRecurrentPaymentId : string

    @IsOptional()
    @IsNumber()
    Amount : number;
    
    @IsOptional()
    @IsString()
    interval : string;
    
    @IsOptional()
    @IsDateString()
    @MaxLength(20)
    endDate : string;
    
    @IsOptional()
    @IsNumber()
    @Max(99)
    day : number;
    
    @IsOptional()
    @IsDateString()
    @MaxLength(36)
    nextPaymentDate : string;
}
