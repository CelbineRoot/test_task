import {Controller, Post, Body, HttpCode, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SignUpDto} from "./dto/sign-up.dto";
import {SignInDto} from "./dto/sign-in.dto";
import {SignInResponseBadRequestDoc, SignInResponseSuccessDoc} from "./docs/sign-in.docs";
import {SignUpDocsSuccess} from "./docs/sign-up.docs";

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(200)
    @Post('signup')
    @ApiOperation({ summary: 'Клиент регистрируется' })
    @ApiResponse(SignUpDocsSuccess)
    async signUp(@Body() body: SignUpDto) {
        return this.authService.signUp(body);
    }

    @HttpCode(200)
    @Post('signin')
    @ApiOperation({ summary: 'Клиент авторизируется' })
    @ApiResponse(SignInResponseSuccessDoc)
    @ApiResponse(SignInResponseBadRequestDoc)
    async signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body);
    }
}