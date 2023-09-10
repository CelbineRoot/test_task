import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export const appConfig = registerAs('app', () => ({
    environment: get('APP_ENVIRONMENT').required().asString(),
    port: get('CLIENTS_API_PORT').required().asString(),
    jwtSecret: get('JWT_SECRET').required().asString(),
    mongoUri: get('MONGO_URI').required().asString(),
}));
