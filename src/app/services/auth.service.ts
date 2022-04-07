import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, retry, tap, throwError} from "rxjs";
import {SignedInUserModel} from "../models/signedInUser.model";
import {EXPIRE_AT, TOKEN} from "../consts";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  private signInUrl = '/auth/signIn'
  private signOutUrl = '/auth/signOut'
  private verifyUrl = '/auth/verify'

  constructor(private http: HttpClient) {
  }

  signIn(email: string, password: string) {
    return this.http.post<SignedInUserModel>(environment.apiUrl + this.signInUrl, {email, password})
      .pipe(retry(2),
        map(data => AuthService.setSession(data) ),
        catchError(this.signInErrorHandler)
        )
  }

  signOut() {
    return this.http.delete(environment.apiUrl + this.signOutUrl)
      .pipe(tap(() => {
          AuthService.removeSession()
        }),
        catchError(this.signOutErrorHandler))
  }

  verify() {
    return this.http.get(environment.apiUrl + this.verifyUrl)
  }

  private static setSession(authResult: SignedInUserModel) {
    localStorage.setItem(TOKEN, authResult.token)
    localStorage.setItem(EXPIRE_AT, authResult.expireAt)
  }

  private static removeSession() {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(EXPIRE_AT)
  }

  private signInErrorHandler(error: HttpErrorResponse) {
    let errorText = ''
    if (error.status === 422) {
      errorText = 'Пользователь не найден'
    } else {
      errorText = 'Ууууупс... Что-то пошло не так'
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorText));
  }

  private signOutErrorHandler(error: HttpErrorResponse) {
    let errorText = ''
    if (error.status === 422) {
      errorText = 'Пользователь не найден'
    } else {
      errorText = 'Ууууупс... Что-то пошло не так'
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorText));
  }
}

