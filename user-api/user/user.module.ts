import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {LoggerModule} from "../modules/logger/logger.module";
import {User, UserSchema} from "./user.model";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {ContextModule} from "../context/context.module";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigType} from "@nestjs/config";
import {appConfig} from "../modules/config/config";

@Module({
    controllers: [
        UserController
    ],
    imports: [
        forwardRef(() => AuthModule),
        JwtModule.registerAsync({
            useFactory: async (config: ConfigType<typeof appConfig>) => ({
                global: true,
                secret: config.jwtSecret,
            }),
            inject: [appConfig.KEY],
        }),
        ContextModule,
        LoggerModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    providers: [
        UserRepository,
        UserService
    ],
    exports: [
        UserService
    ],
})
export class UserModule {}