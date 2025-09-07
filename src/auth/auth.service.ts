import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

import { compare, hash } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIndto";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async signUp(singnUpDto: SignUpDto) {
		const emailIsExist = await this.prisma.user.findUnique({
			where: {
				email: singnUpDto.email,
			},
		});

		if (emailIsExist) {
			throw new ConflictException("This email is already in use");
		}
		const hashedPassword = await hash(singnUpDto.password, 12);
		const user = await this.prisma.user.create({
			data: {
				...singnUpDto,
				password: hashedPassword,
				categories: {
					createMany: {
						data: [
							{ name: "Salario", icon: "travel", type: "INCOME" },
							{ name: "Freelance", icon: "freelance", type: "INCOME" },
							{ name: "Outro", icon: "other", type: "INCOME" },

							{ name: "Aluguel", icon: "home", type: "EXPENSE" },
							{ name: "Mercado", icon: "shopping", type: "EXPENSE" },
							{ name: "Transporte", icon: "car", type: "EXPENSE" },
							{ name: "Restaurante", icon: "food", type: "EXPENSE" },
							{ name: "Saúde", icon: "health", type: "EXPENSE" },
							{ name: "Educação", icon: "education", type: "EXPENSE" },
							{ name: "Lazer", icon: "entertainment", type: "EXPENSE" },
							{ name: "Contas de Casa", icon: "utilities", type: "EXPENSE" },
							{ name: "Assinaturas", icon: "subscription", type: "EXPENSE" },
							{ name: "Outros", icon: "other", type: "EXPENSE" },
						],
					},
				},
			},
		});
		const payload = { sub: user.id };
		const access_token = await this.jwtService.signAsync(payload);
		return {
			access_token,
		};
	}
	async signIn(signInDto: SignInDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: signInDto.email,
			},
		});

		if (!user) {
			throw new UnauthorizedException("Credentials Invalid");
		}

		const isPasswordValid = await compare(signInDto.password, user.password);

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
