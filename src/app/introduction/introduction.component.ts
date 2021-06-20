import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(
    protected translate: TranslateService,
    protected _router: Router) { }

  ngOnInit() {
  }

  public onContinueClick() {
    this._router.navigate(['general/']);
  }

}
