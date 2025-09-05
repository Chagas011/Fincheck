import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { compare } from "bcryptjs";

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async authenticate(authenticateDTO: AuthenticateDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: authenticateDTO.email,
			},
		});

		if (!user) {
			throw new UnauthorizedException("Credentials Invalid");
		}

		const isPasswordValid = await compare(
			authenticateDTO.password,
			user.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException("Credentials Invalid");
		}
		// Gerar JWT
		return {
			authenticate: true,
		};
	}
}
