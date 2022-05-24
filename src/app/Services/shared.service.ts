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
  getLeaseReminders():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getleasereminders/reminders');
  }
  getProjectReminders():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getprojectreminder/reminders');
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
  deleteReminder(val: any):Observable<any[]>{
    return this.http.put<any>(this.APIUrl + 'DeleteReminder/delete', val)
  }
  getLH():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getleaseandhierarchy/leasehierarchy');
  }

  getContactReminders():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getcontactreminders/reminder');
  }
  addReminder(val: any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl + 'AddReminder/add', val)
  }
  updateContactR(val:any):Observable<any[]>{
    return this.http.put<any>(this.APIUrl + 'updatecontactreminder/update',val)
  }
  updateLeaseR(val:any):Observable<any[]>{
    return this.http.put<any>(this.APIUrl + 'updateleasereminder/update',val)
  }
  updateProjectR(val:any):Observable<any[]>{
    return this.http.put<any>(this.APIUrl + 'updateprojectreminder/update',val)
  }
  updateBuildingR(val:any):Observable<any[]>{
    return this.http.put<any>(this.APIUrl + 'updatebuildingreminder/update',val)
  }

}
