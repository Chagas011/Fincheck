import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { hash } from "bcryptjs";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const emailIsExist = await this.prisma.user.findUnique({
			where: {
				email: createUserDto.email,
			},
		});

		if (emailIsExist) {
			throw new ConflictException("This email is already in use");
		}
		const hashedPassword = await hash(createUserDto.password, 12);
		const user = await this.prisma.user.create({
			data: {
				...createUserDto,
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

		return user;
	}

	async findOne(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				name: true,
				email: true,
				categories: true,
			},
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		return user;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
