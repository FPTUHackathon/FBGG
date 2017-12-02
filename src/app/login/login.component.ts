import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ERROR_MESSAGES } from './../shared/constants/constants';

import { LoaderService } from './../shared/services/loader/loader.service';
import { LoginService } from './../shared/services/login/login.service';
import { AuthService } from './../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages = ERROR_MESSAGES;
  submitted = false;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private loaderService: LoaderService,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    });

    setTimeout(() => {
      this.loaderService.setLoadingStatus(false);
    }, 500);
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const body: any = {};
      body.mail = this.loginForm.value.mail;
      body.password = this.loginForm.value.password;
      this.loginService.login(body)
      .subscribe(res => {
        if (res.token) {
          this.authService.setToken(res.token);
          this.router.navigate(['/']);
        }
      });
    }
  }
}
