import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from "../user/user.service";
import {SignUpDto} from "./dto/sign-up.dto";
import {SignInDto} from "./dto/sign-in.dto";
import {compare, hash} from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private userService: UserService
    ) {}

    hashPassword(pass: string, saltOrRounds?: number) {
        if (!saltOrRounds) {
            saltOrRounds = 10;
        }

        return hash(pass, saltOrRounds);
    }

    comparePass(pass: string, hash: string) {
        return compare(pass, hash);
    }

    async signUp({username, password}: SignUpDto) {
        // Проверка, нет ли уже пользователя с таким именем

        const user = await this.userService.findByUsername(username);

        if (user) {
            throw new UnauthorizedException('Username is already taken');
        }

        // Создание пользователя и генерация токена
        const createdUser = await this.userService.create({username, password: await this.hashPassword(password)});
        const payload = {username: createdUser.username, sub: createdUser.id};
        const token = this.jwtService.sign(payload);

        return {id: createdUser.id, token};
    }

    async signIn({id, password}: SignInDto) {
        const user = await this.userService.findById(id);

        if (!user || !(await this.comparePass(password, user.password))) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error_message: 'Bad id or password',
            }, HttpStatus.UNAUTHORIZED);
        }

        const payload = {username: user.username, sub: user.id};
        const token = this.jwtService.sign(payload);

        return {token};
    }
}