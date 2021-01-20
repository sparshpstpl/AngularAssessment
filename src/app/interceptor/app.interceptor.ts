import { Injectable } from '@angular/core';
import {AuthService,DataService} from '../services';
import { EMPTY } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import {tap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  token: string;
  constructor(private router: Router,private auth:AuthService,private data:DataService) {}

  intercept(request: HttpRequest<unknown>,
            next: HttpHandler): Observable<HttpEvent<unknown>> {
            this.auth.setHeader();
                        
            request = request.clone({headers:this.auth.headers});
            
            return next.handle(request).pipe(
              tap(
                event => {
                  if (event instanceof HttpResponse) { 
                    console.log('responce',event);               
                    console.log('response body',event.body);               
                          if(event.body)
                          {
                            if(event.body.token)
                            {
                              this.auth.setToken(event.body.token);
                              this.data.setUserDetail(event.body);
                            }
                          }
                  }
                },
                error => {
                  if (error instanceof HttpErrorResponse) {
                    if (error?.status === 401) {
                      const url = window.location.pathname;
                      if (url !== '/auth/login') {
                        this.data.setRedirectUrl(url);
                      }
                      this.router.navigateByUrl('/auth/login');
                    }
                    return EMPTY;
                    return throwError(error);
                  }
                }
              )
            );


        
              

  }
}
 