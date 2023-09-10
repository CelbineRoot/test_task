import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService extends ConsoleLogger {}
