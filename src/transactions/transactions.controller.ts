import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	HttpCode,
	HttpStatus,
	ParseUUIDPipe,
	Query,
	ParseIntPipe,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { ActiveUserId } from "src/decorators/ActiveUserId";
import { OptionalParseUUIDPipe } from "src/pipes/OptionalParseUUIDPipe";
import { TransactionType } from "./entities/transaction.entity";
import { OptionalParseEnumPipe } from "src/pipes/OptionalParseEnumPipe";

@Controller("transactions")
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Post()
	create(
		@ActiveUserId() userId: string,
		@Body() createTransactionDto: CreateTransactionDto,
	) {
		return this.transactionsService.create(createTransactionDto, userId);
	}

	@Get()
	findAll(
		@ActiveUserId() userId: string,
		@Query("month", ParseIntPipe) month: number,
		@Query("year", ParseIntPipe) year: number,
		@Query("bankAccountId", OptionalParseUUIDPipe) bankAccountId?: string,
		@Query("type", new OptionalParseEnumPipe(TransactionType))
		type?: TransactionType,
	) {
		return this.transactionsService.findAllByUserId(userId, {
			month,
			year,
			bankAccountId,
			type,
		});
	}

	@Put(":transactionId")
	update(
		@ActiveUserId() userId: string,
		@Param("transactionId", ParseUUIDPipe) transactionId: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionsService.update(
			transactionId,
			updateTransactionDto,
			userId,
		);
	}

	@Delete(":transactionId")
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(
		@Param("transactionId", ParseUUIDPipe) transactionId: string,
		@ActiveUserId() userId: string,
	) {
		return this.transactionsService.remove(transactionId, userId);
	}
}
