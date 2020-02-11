import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
    from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../loader.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private loader: LoaderService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.loader.loader(true);
        if (req.method === 'POST') {
            req = req.clone({
                body: {
                    ...req.body,
                    UserID: "string",
                    UserToken: "string"
                }
            });
        }
            return next.handle(req).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.loader.loader(false);
                        console.log('event--->>>', event);
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    this.loader.loader(false);
                    console.log('Http error =>', error);
                    return throwError(error);
                })
            );
        }
    }