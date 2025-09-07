import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	getUserById(userId: string) {
		return userId;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
