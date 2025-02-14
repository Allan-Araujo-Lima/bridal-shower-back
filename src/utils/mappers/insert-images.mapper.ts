import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";


@Injectable()
export class InsertImageMapper implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map((data) => {
            return data.map((item) => {
                const userId = item.event.user.id;
                delete item.event.user;
                return { ...item, imageUrl: `${process.env.AWS_S3_BASEURL_IMAGE}/${userId}/${item.event.id}/${item.id}` }
            })
        }));
    }
}
