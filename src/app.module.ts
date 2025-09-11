import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { CategoriesModule } from "./categories/categories.module";
import { BankAccountsModule } from "./bank-accounts/bank-accounts.module";
import { TransactionsModule } from "./transactions/transactions.module";

@Module({
	imports: [
		UsersModule,
		AuthModule,
		CategoriesModule,
		BankAccountsModule,
		TransactionsModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
