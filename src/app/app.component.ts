import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',]
})
export class AppComponent implements OnInit {

  private activeLang = "es"

  constructor(
    private translate: TranslateService,) {
    this.translate.setDefaultLang(this.activeLang);
    }

  ngOnInit(): void { }


}
