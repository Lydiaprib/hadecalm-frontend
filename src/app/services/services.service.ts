import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* END POINTS */
// const GET_BRANCH_BY_ID = /

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  constructor(private _http: HttpClient) { }

  getBranchById(id: string): Observable<any> {
    console.log('aquí');
    return this._http.get<any>(`/branch/${id}`);
  }
}
