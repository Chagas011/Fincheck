import { Injectable } from "@nestjs/common";
import { CreateBankAccountDto } from "./dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "./dto/update-bank-account.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class BankAccountsService {
	constructor(private prisma: PrismaService) {}
	create(userId: string, createBankAccountDto: CreateBankAccountDto) {
		const { color, initialBalance, name, type } = createBankAccountDto;
		return this.prisma.bankAccount.create({
			data: {
				userId,
				color,
				initialBalance,
				name,
				type,
			},
		});
	}

	findAllById(userId: string) {
		return this.prisma.bankAccount.findMany({
			where: {
				userId,
			},
		});
	}

	findOne(id: number) {
		return `This action returns a #${id} bankAccount`;
	}

	update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
		return `This action updates a #${id} bankAccount`;
	}

	remove(id: number) {
		return `This action removes a #${id} bankAccount`;
	}
}
