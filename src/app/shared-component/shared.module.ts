import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toaster/toast.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    ToastComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent   
  ],
  imports: [
    CommonModule
  ],
  exports:[ToastComponent, HeaderComponent, FooterComponent, MenuComponent]
})
export class SharedModule { }
