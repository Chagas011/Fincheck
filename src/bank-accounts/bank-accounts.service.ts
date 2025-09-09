import { Injectable, NotFoundException } from "@nestjs/common";
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
	// Verificar se bankAccount pertence ao usuario antes de fazer o update
	async update(
		userId: string,
		bankAccountId: string,
		updateBankAccountDto: UpdateBankAccountDto,
	) {
		const isUserBankAccount = await this.prisma.bankAccount.findFirst({
			where: {
				userId,
				id: bankAccountId,
			},
		});

		if (!isUserBankAccount) {
			throw new NotFoundException("Bank Account not found");
		}
		const { name, initialBalance, color, type } = updateBankAccountDto;
		return this.prisma.bankAccount.update({
			where: {
				id: bankAccountId,
			},
			data: {
				name,
				initialBalance,
				color,
				type,
			},
		});
	}

	async remove(userId: string, bankAccountId: string) {
		const isUserBankAccount = await this.prisma.bankAccount.findFirst({
			where: {
				userId,
				id: bankAccountId,
			},
		});

		if (!isUserBankAccount) {
			throw new NotFoundException("Bank Account not found");
		}

		await this.prisma.bankAccount.delete({
			where: {
				id: bankAccountId,
			},
		});

		return null;
	}
}
