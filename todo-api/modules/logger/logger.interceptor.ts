import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
  ) {}

  public intercept(
    context: ExecutionContext,
    call$: CallHandler,
  ): Observable<unknown> {
    const req: Request = context.switchToHttp().getRequest();
    const { method, url, body, headers, originalUrl, params, query } = req;
    const userAgent = req.get('user-agent') || '';
    const ip = req.ip || '';
    const message = `Incoming request - (${method} ${url} - ${userAgent} ${ip} from ${originalUrl})`;
    const timeNow = Date.now();

    this.logger.log({
      message,
      method,
      params,
      query,
      body,
      headers,
    });

    return call$.handle().pipe(
      tap({
        next: (val: unknown): void => {
          this.logNext(val, context, timeNow);
        },
        error: (err: Error): void => {
          this.logError(err, context, timeNow);
        },
      }),
    );
  }

  private logNext(
    body: unknown,
    context: ExecutionContext,
    timeNow: number,
  ): void {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const res: Response = context.switchToHttp().getResponse<Response>();
    const { method, url } = req;
    const { statusCode } = res;
    const ms = Date.now() - timeNow;
    const message = `Outgoing response - ${statusCode} - ${method} - ${url} [${ms} ms]`;

    this.logger.log({
      message,
      body,
    });
  }

  private logError(
    error: Error,
    context: ExecutionContext,
    timeNow: number,
  ): void {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = req;
    const ms = Date.now() - timeNow;
    if (error instanceof HttpException) {
      const statusCode: number = error.getStatus();
      const message = `Outgoing response - ${statusCode} - ${method} - ${url} [${ms} ms]`;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(
          {
            method,
            url,
            body,
            message,
            error,
          },
          error.stack,
        );
      } else {
        this.logger.warn({
          method,
          url,
          error,
          body,
          message,
        });
      }
    } else {
      this.logger.error(
        {
          message: `Outgoing response - ${method} - ${url} [${ms} ms]`,
        },
        error.stack,
      );
    }
  }
}
