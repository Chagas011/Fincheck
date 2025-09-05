import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthenticateDto {
	@IsEmail()
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password: string;
}
