import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }
  toast= new BehaviorSubject({});
  toastState=this.toast.asObservable();

toasterFun(value)
{
  this.toast.next(value);
}

}
