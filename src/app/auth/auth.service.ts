import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  emptyUser!: User;
  private tokenExpirationTimer: any;
  private route = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private key = 'AIzaSyAdB52Ro0Xt-7ke-K5Yf6k7nob1IZBD5qM';
  loggedInChanged = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.route + 'signUp?key=' + this.key,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.route + 
        'signInWithPassword?key='  + this.key,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  // paneme kõikide componentide ngOnInitisse
  // logiks igalpool automaatselt sisse kui on sessioon olemas
  // logiks igalpool automaatselt välja kui on aegunud
  //
  autoLogin() {
    let data = sessionStorage.getItem('userData');
    if (!data) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(data);
   
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    } else {
      this.logout();
    }
  }

  logout() {
    // this.user.next(this.emptyUser);
    this.router.navigate(['/']);
    sessionStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    sessionStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Tekkis tundmatu error!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'See e-mail on juba olemas.';
        break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        errorMessage = 'Parool peab olema vähemalt 6-kohaline.';
        break;
      case 'MISSING_PASSWORD':
        errorMessage = 'Palun sisesta parool.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Sellist e-maili ei eksisteeri.';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Kontrolli e-maili õigust.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Parool ei ole korrektne.';
        break;
    }
    return throwError(errorMessage);
  }
}