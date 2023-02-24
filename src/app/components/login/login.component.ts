import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
        private router: Router, private authenticationService: AuthenticationService
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    get f() { return this.form.controls; }

    ngOnInit() {
        this.form = this.formBuilder.group({ login: ['', Validators.required], senha: ['', Validators.required] });

        //get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    submeter() {
        this.submitted = true;

        if (this.f.invalid) {
            return;
        }

        this.loading = true;
        let usuario = new User(this.f.login.value, this.f.senha.value);
        this.authenticationService.login(usuario)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/ut']);
                },
                error => {
                    this.router.navigate(['/login']);
                    this.error = error;
                    this.loading = false;
                });
    }
}
