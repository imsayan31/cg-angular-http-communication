import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

import { HttpCacheService } from "./http-cache.service";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //invalidating cache if method is not `GET`
        if(req.method !== 'GET') {
            console.log(`Invalidating cache of: ${req.method} - ${req.url}`)
            this.cacheService.invalidCache()
            return next.handle(req);
        }

        //saving response in cache
        const cahceResponse: HttpResponse<any> = this.cacheService.get(req.url)

        //returning cache response
        if(cahceResponse) {
            console.log(`Returning cache reaponse: ${req.method} - ${cahceResponse.url}`)
            console.log(cahceResponse)
            return of(cahceResponse)
        }

        //updating new response into cache
        return next.handle(req)
            .pipe(
                tap(event => {
                    console.log(event);
                    if(event instanceof HttpResponse) {
                        console.log(`Adding item to cache: ${req.url}`)
                        this.cacheService.put(req.url, event)
                    }
                })
            )

    }
}