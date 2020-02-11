import { IsNotEmpty } from 'class-validator';

export class OrganizationDto {
  @IsNotEmpty()
  users: [];

  @IsNotEmpty()
  password: string;

  about: string;
}
