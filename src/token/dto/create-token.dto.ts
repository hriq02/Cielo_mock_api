import { IsBase64, IsString, IsUUID } from "class-validator";

export class CreateTokenDto {
    @IsUUID()
    ClientId : string;

    @IsString()
    ClientSecret : string;

    @IsString()
    'ClientId:ClientSecret' : string;

    @IsBase64()
    Base64 : string;
}
