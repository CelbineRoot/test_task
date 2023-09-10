import {Inject, Injectable,} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {appConfig} from "../modules/config/config";
import {ConfigType} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(appConfig.KEY)
        private readonly config: ConfigType<typeof appConfig>,
    ) {}

    async validate(token: string) {
        try {
            const { data } = await this.httpService.axiosRef.request<{ id: string; username: string; }>({
                url: `${this.config.userApiUrl}/user`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return data;
        } catch (e) {
            throw e;
        }
    }

}