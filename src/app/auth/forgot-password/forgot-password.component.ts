import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm:FormGroup;
  showLoader:boolean;
  showResetDiv:boolean=false;
  constructor(private _fb: FormBuilder, private _authService:AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.forgotForm=this._fb.group({
      email:this._fb.control('',[Validators.required,Validators.email])
    })
    
    
  }

  forgotPassword()
  {
    if(this.forgotForm.invalid)
    {
      return
    }
    this.showLoader=true;
    let requestBody={
      email:this.forgotForm.value.email.toLowerCase()
    }
   
      this._authService.forgotPassword(requestBody).pipe(
        catchError((err)=>of(err)),
        tap(resp=>{
if(resp.success)
{
this.showResetDiv=true;
}
else{
  console.log(resp.message);
  
}

        }),finalize(()=>{
          this.showLoader=false;
        })
      ).subscribe();
  }
  
}
