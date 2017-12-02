import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ERROR_MESSAGES } from './../shared/constants/constants';

import { LoaderService } from './../shared/services/loader/loader.service';
import { LoginSocketService } from '../shared/services/login/login-socket.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessages = ERROR_MESSAGES;
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private loaderService: LoaderService,
    private loginSocketService: LoginSocketService,
  ) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      nickName: [''],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    setTimeout(() => {
      this.loaderService.setLoadingStatus(false);
    }, 500);
  }

  onSubmit() {
    this.submitted = true;
    const body: any = {};
    body.name = this.registerForm.value.name;
    body.nickName = this.registerForm.value.nickName;
    body.mail = this.registerForm.value.mail;
    body.password = this.registerForm.value.password;
    body.phone = this.registerForm.value.phone;
    body.address =this.registerForm.value.address;

    this.loginSocketService.register(body);
  }
}
