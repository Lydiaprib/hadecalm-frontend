import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  constructor(
    protected router: Router) { }


  goHome() {
    this.router.navigate(['introduction']);
  }

  goESIWeb() {
    window.location.href = 'https://esi.uclm.es/';
  }

}
