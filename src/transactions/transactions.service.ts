import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TransactionsService {
	constructor(private prisma: PrismaService) {}
	async create(createTransactionDto: CreateTransactionDto, userId: string) {
		const { bankAccountId, categoryId, date, name, type, value } =
			createTransactionDto;

		const bankAccountIsUser = await this.prisma.bankAccount.findFirst({
			where: {
				id: bankAccountId,
				userId,
			},
		});

		if (!bankAccountIsUser) {
			throw new NotFoundException("Bank Account not found");
		}

		const categoryIsUser = await this.prisma.category.findFirst({
			where: {
				id: categoryId,
				userId,
			},
		});

		if (!categoryIsUser) {
			throw new NotFoundException("Category not found");
		}

		return await this.prisma.transaction.create({
			data: {
				userId,
				bankAccountId,
				categoryId,
				date,
				name,
				type,
				value,
			},
		});
	}

	async findAllByUserId(userId: string) {
		return await this.prisma.transaction.findMany({
			where: {
				userId,
			},
		});
	}

	async update(
		transactionId: string,
		updateTransactionDto: UpdateTransactionDto,
		userId: string,
	) {
		const { bankAccountId, categoryId, date, name, type, value } =
			updateTransactionDto;

		const transactionIsUser = await this.prisma.transaction.findFirst({
			where: {
				id: transactionId,
				userId,
			},
		});
		if (!transactionIsUser) {
			throw new NotFoundException("Transaction not found");
		}
		const bankAccountIsUser = await this.prisma.bankAccount.findFirst({
			where: {
				id: bankAccountId,
				userId,
			},
		});

		if (!bankAccountIsUser) {
			throw new NotFoundException("Bank Account not found");
		}

		const categoryIsUser = await this.prisma.category.findFirst({
			where: {
				id: categoryId,
				userId,
			},
		});

		if (!categoryIsUser) {
			throw new NotFoundException("Category not found");
		}

		return await this.prisma.transaction.update({
			where: {
				id: transactionId,
			},
			data: {
				userId,
				bankAccountId,
				categoryId,
				date,
				name,
				type,
				value,
			},
		});
	}

	async remove(transactionId: string, userId: string) {
		const transactionIsUser = await this.prisma.transaction.findFirst({
			where: {
				id: transactionId,
				userId,
			},
		});
		if (!transactionIsUser) {
			throw new NotFoundException("Transaction not found");
		}

		await this.prisma.transaction.delete({
			where: {
				id: transactionId,
			},
		});
	}
}
