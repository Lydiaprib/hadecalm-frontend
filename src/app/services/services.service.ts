import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* END POINTS */
// const GET_BRANCH_BY_ID = /
const ROOT_URL = "/branch/";

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  constructor(private _http: HttpClient) { }

  getBranchById(id: string): Observable<any> {
    return this._http.get<any>(`${ROOT_URL}${id}`);
  }

  getMainTopics(): Observable<any> {
    return this._http.get<any>(`${ROOT_URL}getMainTopics`);
  }

  getQuestionByParentId(id: string): Observable<any> {
    return this._http.get<any>(`${ROOT_URL}children/${id}`);
  }
}
