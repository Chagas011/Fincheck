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
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { ActiveUserId } from "src/decorators/ActiveUserId";

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
	findAll(@ActiveUserId() userId: string) {
		return this.transactionsService.findAllByUserId(userId);
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
