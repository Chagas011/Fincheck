import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

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
		const payload = { sub: user.id };
		const access_token = await this.jwtService.signAsync(payload);
		return {
			access_token,
		};
	}
}
