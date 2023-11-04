import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginBody, SignUpBody, User } from '../models/models';
import { url } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  public token: string = '';

  isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  public SignUp(body: SignUpBody): Observable<User> {
    return this.http.post<User>(url + 'auth/signUp', body);
  }

  public Login(body: LoginBody): Observable<User> {
    return this.http.post<User>(url + 'auth/login', body);
  }

  public AuthUserByToken(): Observable<User> {
    return this.http.get<User>(url + 'auth/me')
  } 

  public SaveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public GetToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  public Logout() {
    localStorage.removeItem('token');
    this.user$.next(null);
    this.isUserAuthenticated$.next(false);
  }
}
