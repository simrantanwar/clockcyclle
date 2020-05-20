import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { SharedModule } from '../shared-component/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [ BaseComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
