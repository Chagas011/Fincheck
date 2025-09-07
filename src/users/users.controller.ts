import { Controller, Get, Param, Delete, Req } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get("/me")
	me(@Req() request: any) {
		return this.usersService.getUserById(request.userId);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(+id);
	}
}
