import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { faBuilding, faUser, faFingerprint, faPeopleGroup, faFolderTree, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  //Icons
  faBuilding = faBuilding;
  faUser = faUser;
  faFingerprint = faFingerprint;
  faPeopleGroup = faPeopleGroup;
  faFolderTree = faFolderTree;
  faEnvelopeCircleCheck = faEnvelopeCircleCheck;
  //arrays
  hierarchy: any;
  optiontype: any;
  buildingreminders: any;
  allbuildings: any;
  allreminders: any;
  companyname: any;
  companyreminders: any;
  panelOpenState!: boolean;
  buildingrowtotal: any;
  optionrowtotal: any;
  companyrowtotal: any;
  //for filter
  searchTerm = '';
  Companyterm = '';
  Buildingterm = '';
  Allterm = '';
  buildingName: any;
  buildingHierearchy: any;
  showCompanyDrop!: boolean;
  Hierarchy: any = (i: any, n: any) => [
    { id: i, name: n }
  ]
  selectedOptionType: any = [];
  selectedHierarchy: any = [];
  selectedCompany: any = [];
  selectedBuilding: any = [];
  listobuildings: any = []
  showBuildingDrop!: boolean;
  displayreminder: any = [
    { date: '2/13/2022', frequency: 3, reminderType: 'User Defined' },
    { date: '4/13/2022', frequency: 4, reminderType: 'User Defined' },
    { date: '5/04/2022', frequency: 30, reminderType: 'User Defined' },
    { date: '1/20/2022', frequency: 7, reminderType: 'User Defined' },
    { date: '5/13/2022', frequency: 60, reminderType: 'User Defined' },
    { date: '3/15/2022', frequency: 120, reminderType: 'User Defined' },
  ]
  constructor(public service: SharedService) { }
  ngOnInit(): void {

    this.service.getOptionType().subscribe(data => {
      this.optiontype = data.map((ndot: any) => ndot.tickleDescription);
      if (this.selectedOptionType == "Company - User Defined") {
        let test = this.optiontype.filter((obj: any) => obj === "Company - User Defined")
        this.optiontype = test;
        this.ngOnInit
      }
      if (this.selectedOptionType.length > 0) {
        let test1 = this.optiontype.filter((obj: any) => obj !== 'Company - User Defined')
        this.optiontype = test1;
        this.ngOnInit
      }
    })
    this.service.getHierarchy().subscribe(datah => {
      this.hierarchy = datah.map((nd: any) => nd.hierarchy);
      if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2) {
        this.service.getBH().subscribe(data => {
          this.allbuildings = data;
          this.buildingName = this.allbuildings.map((obj: any) => obj.buildingName)
          for (let j = 0; j < this.selectedHierarchy.length; j++) {
            for (let i = 0; i < this.allbuildings.length; i++) {
              // console.log("building hierarchy", this.buildingHierearchy)
              if (this.selectedHierarchy[j] === this.allbuildings[i].hierarchy) {
                this.buildingName[i] = this.allbuildings[i].buildingName;
                this.listobuildings.push(this.buildingName[i]);
                let setOfValue: any = new Set(this.listobuildings)
                //   //distinct building name values from array
                let uniqueBuildingValues = [...setOfValue]
                this.buildingName = uniqueBuildingValues;
              }
            }
          }
          console.log("listobuilding", this.buildingName)
        })
      }
    })
    this.service.getAllReminders().subscribe(data => {
      this.allreminders = data;
      for (let i = 0; i < this.allreminders.length; i++) {
        this.allreminders[i].startDate = new Date(this.allreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
      }
    })
    this.service.getCompanyList().subscribe(data => {
      this.companyname = data.map((ndcl: any) => ndcl.companyName);
    })
    this.service.getCompanyReminders().subscribe(data => {
      this.companyreminders = data;
      this.companyrowtotal = this.companyreminders.length;
      for (let i = 0; i < this.companyreminders.length; i++) {
        this.companyreminders[i].startDate = new Date(this.companyreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
      }
    })
    this.service.getBuildingReminders().subscribe(data => {
      this.buildingreminders = data;
      this.buildingrowtotal = this.buildingreminders.length;
      for (let i = 0; i < this.buildingreminders.length; i++) {
        this.buildingreminders[i].startDate = new Date(this.buildingreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
      }
    })
  }
  //functionality of getting the selected values of dropdown
  changeH(val: any) {
    if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType == "Building - Option Reminder") {
      this.showBuildingDrop = true;
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length > 1) {
      this.showBuildingDrop = false;
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length === 0) {
      this.showBuildingDrop = false;
      this.ngOnInit()
      this.selectedHierarchy = [];
      this.listobuildings = []
      this.buildingName = []
    }
  }
  changeCompany(val: any) {
    this.ngOnInit()
  }
  changeBuilding(val: any) {
    this.ngOnInit()
  }
  changeOT(val: any) {
    console.log("OptionType selection:", val);
    if (val == "Company - User Defined") {
      this.showCompanyDrop = true;
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType == "Building - Option Reminder") {
      this.showBuildingDrop = true;
      this.ngOnInit()
    }
    if (val === 0) {
      this.showCompanyDrop = false;
      this.ngOnInit()
      this.selectedCompany = [];
    }
  }

}
