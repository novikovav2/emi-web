import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, tap, throwError} from "rxjs";
import {TOKEN} from "../consts";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor(private router: Router,
  //             private toastr: ToastrService) {  }

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
        }),
        catchError(this.errorHandler)
      )
    } else {
      return next.handle(req)
    }
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorText = ''
    if (error.status === 0) {
      errorText = 'Нет доступа к серверу'
    } else if (error.status === 401) {
      errorText = 'Вы не авторизованы'
      // localStorage.removeItem(TOKEN)
      // this.toastr.error(errorText)
      // this.router.navigate([ROOT])
    } else {
      errorText = 'Ууууупс... Что-то пошло не так'
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorText));
  }
}
