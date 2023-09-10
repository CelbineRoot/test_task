import {Injectable, Scope} from "@nestjs/common";
import {User} from "../user/user.model";

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
    public user: User;
}
