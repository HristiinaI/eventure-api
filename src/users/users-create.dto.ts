import { IsEmail, IsNotEmpty } from 'class-validator';
export class UsersCreateDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;
    
    type: string;
    
    country: string;
    
    education: string;
    
    workplace: string;

    about: string;
}
