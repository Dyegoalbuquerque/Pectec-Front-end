import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        let local = localStorage.getItem('currentUser');
        let user = local ? JSON.parse(atob(local)) : new User();
        this.currentUserSubject =  new BehaviorSubject<User>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    
    private loginMock(usuario: User): Observable<any> {
        let retornoMock: any = {};

        if (usuario.login !== "" && usuario.senha !== "") {
            retornoMock.sucesso = true;
            retornoMock.usuario = usuario;
            retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
            return of(retornoMock);
        }

        retornoMock.sucesso = false;
        retornoMock.usuario = usuario;
        return of(retornoMock);
    }


    login(usuario: User) {

        return this.loginMock(usuario).pipe(tap((resposta) => {

            if (!resposta.sucesso) return;

            localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
            localStorage.setItem('currentUser', btoa(JSON.stringify(usuario)));

            this.currentUserSubject.next(usuario);
            this.router.navigate(['/']);
        }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}