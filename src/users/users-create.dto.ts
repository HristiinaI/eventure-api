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
    
    @IsNotEmpty()
    type: string;
    
    city: string;
    
    education: string;
    
    workplace: string;

    interests: string;

}
