import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength, IsJWT } from "class-validator";


export class AuthUserResponse {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'User', description: 'User firstname'})
    firstName: string;

    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Booko', description: 'Username'})
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: 'user@mail.ru', description: 'User e-mail'})
    email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({example: '12345', description: 'User password'})
    password: string;

    @IsString()
    @IsJWT()
    @ApiProperty({example: 'here should be jwt token', description: 'JWT Token'})
    accessToken: string;

}