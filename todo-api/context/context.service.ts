import {Injectable, Scope} from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
    public user: {
        id: string;
        username: string;
    };
}
