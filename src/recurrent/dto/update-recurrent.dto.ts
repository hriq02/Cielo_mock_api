import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurrentDto } from './create-recurrent.dto';


export class UpdateRecurrentDto extends PartialType(CreateRecurrentDto) {}
