 import { IsNumber, IsOptional, IsString } from "class-validator";

export class UsersDto {
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    surname: string

    @IsOptional()
    @IsNumber()
    height: number

    @IsOptional()
    @IsNumber()
    weight: number

    @IsString()
    @IsOptional()
    gender: string

    @IsOptional()
    @IsString()
    placeOfResidence: string

    @IsOptional()
    @IsString()
    avatarPath: string

}






