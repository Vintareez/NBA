import { Injectable, Injector } from '@angular/core';
import { HttpService } from './http.service';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    Progress:boolean;
    constructor (private inj: Injector){}

    
    
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).do(
        (event:any) => {
            if (event instanceof HttpResponse) {
                this.Progress = true;
                const myService = this.inj.get(HttpService); 
                myService.setProgress(this.Progress);
            }
        },
        (event:any) => {}
    );
  }
}