import { IsEmail, IsNotEmpty } from 'class-validator';
export class UsersCreateDto {
    email: string;

    password: string;

    firstName: string;

    lastName: string;

    type: string;

    country: string;

    education: string;

    workplace: string;

    about: string;

    organizations: [];

    name: string;

    role: string;
}
