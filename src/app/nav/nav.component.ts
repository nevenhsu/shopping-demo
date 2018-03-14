import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isShowMenu: boolean;
  username: string;

  constructor() { }

  ngOnInit() {
    this.isShowMenu = false;
    this.username = 'Username';
  }
  
  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

}
