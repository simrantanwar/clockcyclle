import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
isOpen:boolean =false;
  constructor() { }

  ngOnInit() {
  }

  openCloseNav() {
    if(!this.isOpen){
      this.isOpen = true;
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }
    else{      
      this.isOpen = false;
      document.getElementById("mySidenav").style.width = "0px";
      document.getElementById("main").style.marginLeft = "0px";
    }
   
  }
}
