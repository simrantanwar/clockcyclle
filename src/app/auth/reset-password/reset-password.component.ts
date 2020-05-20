import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalService } from 'src/app/shared-services/local.service';
import { ToasterService } from 'src/app/shared-services/toaster.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _fb: FormBuilder, private route: ActivatedRoute, private _authService: AuthService,
     private _localService: LocalService, private router:Router, private _toastService:ToasterService) { }
  resetForm: FormGroup;
  showLoader: boolean;
  email: string;
  show: boolean = false;
  show_eye: boolean = false;
  isValid:boolean=false;
  isChanged:boolean=false;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.validateToken(params.token);
    });
    this.initForm();

  }

  initForm() {
    this.resetForm = this._fb.group({
      password: this._fb.control('', [Validators.required]),
      confirmPassword: this._fb.control('', [Validators.required]),

    })
  }

  validateToken(token) {
    let header = new HttpHeaders();
    header.append('token', token);
    this._authService.validateToken(header).pipe(
      catchError(err => of(err)),
      tap((resp: any) => {
console.log(resp)
        if (resp.success) {
          this.isValid=true;
          this.email = resp.result.email;
        }
        else {
          this.router.navigate(['/error']);
        }
      }),
      finalize(() => {
        this.showLoader = false;

      })
    ).subscribe()
  }

  resetPassword() {
    if (this.resetForm.invalid) { return }

    this.showLoader = true;
    let requestBody = {
      //  email: this._authService.getSessionInLocal(),
      email: this.email,
      // email:localStorage.getItem('email'),
      password: this.resetForm.value.password
    }
    console.log(requestBody);

    this._authService.resetPassword(requestBody).pipe(
      catchError((err) => of(err)),
      tap(resp => {
        console.log(resp)
if(resp.success)
{
  this.isChanged=true;
}
else{
  this._toastService.toasterFun(resp)
}
      }), finalize(() => {
        this.showLoader = false;
      })
    ).subscribe();

  }
  showPassword() {
    this.show = !this.show;
    this.show_eye = !this.show_eye;
  }


}
