import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Aspects } from 'src/app/enums/aspects.enum';
import { Provinces } from 'src/app/enums/provinces.enum';
import { Sectors } from 'src/app/enums/sectors.enum';
import { ConfigService } from 'src/app/services/services.service'

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
    protected _services: ConfigService) { }

  ngOnInit() {
    this.provinces = Object.values(Provinces);
    this.sectors = Object.values(Sectors);
    this.aspects = Object.values(Aspects);
    this.initializeForm();
    this.prueba();
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

  prueba() {
    this._services.getBranchById('60bb4854bcbe6c3d50a5b377').subscribe(res => {
      console.log('respuesta', res);
    })
  }

}
