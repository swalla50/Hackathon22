import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl ="https://hackwebapp20220504023610.azurewebsites.net/api/";

  constructor(private http:HttpClient) { }

  getHierarchy():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'gethierarchy/gethierarchydata');
  }
  getOptionType():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'GetOptionType/getoptiontypedata');
  }

  getCompanyList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'company/getcompany');
  }
  getBuildingReminders():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getbuildingreminders/reminders');
  }

  getCompanyReminders():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getcompanyreminders/reminders');
  }

  getAllReminders():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getallreminders/reminders');
  }
  getAllBuildings():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getbuildings/buildings');
  }
  getBH():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getbuildingandhierarchy/buildinghierarchy');
  }
  getContacts():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getcontacts/getcontactlist');
  }
}
