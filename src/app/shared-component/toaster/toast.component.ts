import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/shared-services/toaster.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  response: any;
  show: boolean = false;
  constructor(private _toasterService: ToasterService) { }

  ngOnInit(): void {
    this.toaster();
  }
  toaster() {
    this._toasterService.toastState.subscribe((resp: any) => {
      if (resp.msg) {
        this.response = resp;
        this.show = true;

        setTimeout(() => {
          this.closeToaster();
        }, resp.timeout);
      }
    })
  }

  closeToaster(){
    this.show=false;
  }
}
