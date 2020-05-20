import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { ToasterService } from 'src/app/shared-services/toaster.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  show_eye: boolean = false;
  showLoader: boolean = false;
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _toastService: ToasterService,
    private router:Router) {

  }

  ngOnInit(): void {
    this.intiForm();
  }

  intiForm() {
    this.loginForm = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [Validators.required]),
    })
  }

  showPassword() {
    this.show = !this.show;
    this.show_eye = !this.show_eye;
  }

  login() {

    if (this.loginForm.invalid) {
      return;
    }

    this.showLoader = true;
    let requestBody = {
      email: this.loginForm.value.email.toLowerCase(),
      password: this.loginForm.value.password,
      device_token: ''
    }
    this._authService.login(requestBody).pipe(
      catchError(err => of(err)),
      tap((resp: any) => {

        let message = {
          msg: resp.message,
          type: '',
          timeout: 3000
        }
console.log(resp)
        if (resp.success) {
          this._authService.saveSessionInLocal(resp.result);
          message.type = 'success';
        }
        else {
          message.type = 'error';
message.msg = resp.error && resp.error.message ? resp.error.message : resp.message ;
        }
        this._toastService.toasterFun(message);
      }),
      finalize(() => { 
        this.showLoader = false;

      })
    ).subscribe()

  }

}
