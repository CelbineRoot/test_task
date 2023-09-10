import {Controller, Post, Body, HttpCode, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {GetMeDocsSuccess} from "./docs/get-me.docs";
import {ContextService} from "../context/context.service";
import {BadTokenDocs} from "../auth/docs/bad-token.docs";
import {JwtGuard} from "../auth/jwt.guard";

@ApiTags('USER')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly contextService: ContextService
    ) {}

    @HttpCode(200)
    @Get()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Клиент получает свои данные' })
    @ApiResponse(GetMeDocsSuccess)
    @ApiResponse(BadTokenDocs)
    async getMe() {
        const user = await this.userService.findById(this.contextService.user.id);

        return {
            id: user.id,
            username: user.username
        }
    }
}