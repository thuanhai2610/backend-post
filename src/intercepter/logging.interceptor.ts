import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const {method, url, body} = request;

        console.log(`Request: ${method} ${url}`);
        console.log(`Request body: ${JSON.stringify(body)}`);

        return next.handle().pipe(
            tap(()=>{
                console.log(`Response: ${method} ${url}`);
                console.log(`Response status: `, response.statusCode);
            })
        )
    }
}