import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log(`AddHeaderInterceptor called: ${req.url}`)

        let jsonReq: HttpRequest<any> = req.clone({
            setHeaders: {
                'Content-type': 'application/json',
                /* 'Authorization': 'Bearer ksha76asgdiyGJGuui8768kjhkj' */
            }
        })
        return next.handle(jsonReq);
    }
}