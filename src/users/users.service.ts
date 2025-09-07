import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getUserById(userId: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				name: true,
				email: true,
			},
		});
		if (!user) {
			throw new NotFoundException();
		}

		return {
			user,
		};
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
