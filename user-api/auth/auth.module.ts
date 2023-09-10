import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoggerModule} from "../modules/logger/logger.module";
import {ConfigurationModule} from "../modules/config/configuration.module";
import {JwtModule} from "@nestjs/jwt";
import {appConfig} from "../modules/config/config";
import {ConfigType} from "@nestjs/config";
import {AuthController} from "./auth.controller";
import {ContextModule} from "../context/context.module";
import {JwtGuard} from "./jwt.guard";
import {UserModule} from "../user/user.module";

@Module({
    controllers: [
        AuthController
    ],
    imports: [
        ContextModule,
        forwardRef(() => UserModule),
        LoggerModule,
        ConfigurationModule,
        JwtModule.registerAsync({
            useFactory: async (config: ConfigType<typeof appConfig>) => ({
                global: true,
                secret: config.jwtSecret,
            }),
            inject: [appConfig.KEY],
        }),
    ],
    providers: [AuthService, JwtGuard],
    exports: [JwtGuard]
})
export class AuthModule {
}
