import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  hierarchy: any;
  optiontype: any;
  buildingreminders: any;
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


  showCompanyDrop!: boolean;



  Hierarchy: any = (i: any, n: any) => [
    { id: i, name: n }
  ]

  selectedOptionType: any = [];
  selectedHierarchy: any = [];
  selectedCompany: any = [];

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


    this.service.getHierarchy().subscribe(data => {
      this.hierarchy = data.map((nd: any) => nd.companyHierarchyLabelDesc);

      console.log("Hierarchy:", this.hierarchy)
    })

    this.service.getOptionType().subscribe(data => {
      this.optiontype = data.map((ndot: any) => ndot.tickleDescription);

      console.log("OptionType:", this.optiontype)
    })

    this.service.getCompanyList().subscribe(data => {
      this.companyname = data.map((ndcl: any) => ndcl.companyName);

      console.log("CompanyName:", this.companyname)
    })

    this.service.getCompanyReminders().subscribe(data => {

      this.companyreminders = data;
      this.companyrowtotal = this.companyreminders.length;

      for (let i = 0; i < this.companyreminders.length; i++) {
        this.companyreminders[i].startDate = new Date(this.companyreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
      }

      console.log("CompanyReminders:", this.companyreminders)
    })

    this.service.getBuildingReminders().subscribe(data => {
      this.buildingreminders = data;
      this.buildingrowtotal = this.buildingreminders.length;

      for (let i = 0; i < this.buildingreminders.length; i++) {
        this.buildingreminders[i].startDate = new Date(this.buildingreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
      }
      console.log("BuildingReminders:", this.buildingreminders)
    })




  }



  //functionality of getting the selected values of dropdown
  changeH(val: any) {
    console.log("Hierarchy selection:", val);
  }
  changeCompany(val: any) {
    console.log("Company selection:", val);
  }
  changeOT(val: any) {
    console.log("OptionType selection:", val);
    if (val == "Company - User Defined") {
      this.showCompanyDrop = true;

      this.ngOnInit()

    }
    else {
      this.showCompanyDrop = false;
      this.ngOnInit()
      this.selectedCompany = [];
    }

    console.log("show:", this.showCompanyDrop)
  }










}
