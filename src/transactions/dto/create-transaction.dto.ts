import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	IsUUID,
} from "class-validator";
import { TransactionType } from "../entities/transaction.entity";

export class CreateTransactionDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	bankAccountId: string;

	@IsNotEmpty()
	@IsString()
	@IsUUID()
	categoryId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	value: number;

	@IsNotEmpty()
	@IsDateString()
	date: string;

	@IsNotEmpty()
	@IsEnum(TransactionType)
	type: TransactionType;
}
