import {Module, Scope} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigurationModule, } from "./modules/config/configuration.module";
import {LoggerModule} from "./modules/logger/logger.module";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {LoggerInterceptor} from "./modules/logger/logger.interceptor";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule, ConfigType} from "@nestjs/config";
import {appConfig} from "./modules/config/config";
import {UserModule} from "./user/user.module";
import {ContextModule} from "./context/context.module";

@Module({
    imports: [
        ConfigurationModule,
        LoggerModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigType<typeof appConfig>) => ({
                uri: config.mongoUri,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [appConfig.KEY]
        }),
        AuthModule,
        UserModule,
        ContextModule,
    ],
    controllers: [],
    providers: [
      {
        provide: APP_INTERCEPTOR,
        scope: Scope.REQUEST,
        useClass: LoggerInterceptor,
      },
    ],
})
export class AppModule {}