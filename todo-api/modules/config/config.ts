import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export const appConfig = registerAs('app', () => ({
    environment: get('APP_ENVIRONMENT').required().asString(),
    port: get('TODO_API_PORT').required().asString(),
    mongoUri: get('MONGO_URI').required().asString(),
    userApiUrl: get('USER_API_URL').required().asString(),
}));
