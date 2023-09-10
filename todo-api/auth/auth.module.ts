import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoggerModule} from "../modules/logger/logger.module";
import {ConfigurationModule} from "../modules/config/configuration.module";
import {ContextModule} from "../context/context.module";
import {JwtGuard} from "./jwt.guard";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
        ContextModule,
        LoggerModule,
        ConfigurationModule,
    ],
    providers: [AuthService, JwtGuard],
    exports: [JwtGuard, AuthService]
})
export class AuthModule {
}
