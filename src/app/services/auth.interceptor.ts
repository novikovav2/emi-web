import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {TOKEN} from "../consts";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(TOKEN)
    if (token) {
      const newReq = req.clone({
        // Add authorization token to request headers
        headers: req.headers.set("Authorization", "Bearer " + token)
      })
      return next.handle(newReq).pipe(
        tap((httpEvent: HttpEvent<any>) => {
          if (httpEvent.type === 0) {
            return
          }
          if (httpEvent instanceof HttpResponse) {
            const newToken = httpEvent.headers.get('x-new-token')
            if (newToken) {
              // Set new token from response header
              localStorage.setItem(TOKEN, newToken)
            }
          }
        })
      )
    } else {
      return next.handle(req)
    }
  }
}
