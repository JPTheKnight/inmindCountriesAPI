import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onCloseMenu() {
    const sideMenu = document.getElementById('side-menu-bg');
    if (sideMenu != null) sideMenu.style.display = 'none';
  }

  onOpenMenu() {
    const sideMenu = document.getElementById('side-menu-bg');
    if (sideMenu != null) sideMenu.style.display = 'block';
  }
}
