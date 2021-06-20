import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Aspects } from 'src/app/enums/aspects.enum';
import { Provinces } from 'src/app/enums/provinces.enum';
import { Sectors } from 'src/app/enums/sectors.enum';
import { ConfigService } from 'src/app/services/services.service'
import { IGeneralQuestions } from '../models/IGeneralQuestions';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.scss']
})
export class InitialFormComponent implements OnInit {

  public provinces: any[] = [];
  public sectors: any[] = [];
  public aspects: any[] = [];
  public formGroup!: FormGroup;

  constructor(
    protected _formBuilder: FormBuilder,
    protected _services: ConfigService,
    protected _router: Router) { }

  ngOnInit() {
    this.provinces = Object.values(Provinces);
    this.sectors = Object.values(Sectors);
    this.getMainTopics();
    this.initializeForm();
  }

  private initializeForm() {
    this.formGroup = this._formBuilder.group(
      {
        province: '',
        sector: '',
        employees: '',
        aspects: [],
      });
  }

  public continue() {
    const answer = {
      province: this.formGroup.get('province')?.value,
      sector: this.formGroup.get('sector')?.value,
      employeeNumber: this.formGroup.get('employees')?.value,
      aspects: this.formGroup.get('aspects')?.value
    } as IGeneralQuestions;


    this._router.navigate(['questionnaire/'], {state: {data: answer}});

  }

  getMainTopics() {
    this._services.getMainTopics().subscribe(res => {
      console.log('respuesta', res);
      this.aspects = res;
    })
  }

}
