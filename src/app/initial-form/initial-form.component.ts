import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aspects } from 'src/app/enums/aspects.enum';
import { Provinces } from 'src/app/enums/provinces.enum';
import { Sectors } from 'src/app/enums/sectors.enum';

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
    protected _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.provinces = Object.values(Provinces);
    this.sectors = Object.values(Sectors);
    this.aspects = Object.values(Aspects);
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

}
