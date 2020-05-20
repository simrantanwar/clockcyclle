import { Component , ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {
  isCollapse:boolean=false;
  

collapseMenu(){
  this.isCollapse=!this.isCollapse;
}
}
  