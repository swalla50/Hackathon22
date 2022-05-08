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
  panelOpenState!: boolean;
  buildingrowtotal: any;
  optionrowtotal: any;

 

  Hierarchy:any = (i :any,n: any) => [
    { id: i, name: n }
  ]

  selectedOptionType: any = [];
  selectedHierarchy:any = [];

  displayreminder:any = [
    {date: '2/13/2022', frequency: 3, reminderType: 'User Defined'},
    {date: '4/13/2022', frequency: 4, reminderType: 'User Defined'},
    {date: '5/04/2022', frequency: 30, reminderType: 'User Defined'},
    {date: '1/20/2022', frequency: 7, reminderType: 'User Defined'},
    {date: '5/13/2022', frequency: 60, reminderType: 'User Defined'},
    {date: '3/15/2022', frequency: 120, reminderType: 'User Defined'},
  ]

  displayreminderbuilding:any = [
    {date: '2/13/2022', frequency: 20, BuildingID: '2984'},
    {date: '4/13/2022', frequency: 1, BuildingID: '0043'},
    {date: '5/04/2022', frequency: 35, BuildingID: '4534'},
    {date: '3/15/2022', frequency: 100, BuildingID: '1884'},
  ]
  
  constructor( public service:SharedService) { }

  ngOnInit(): void {

    this.service.getHierarchy().subscribe(data =>{
      this.hierarchy = data.map((nd:any) => nd.companyHierarchyLabelDesc);

      console.log("Hierarchy:", this.hierarchy)
    })

    this.service.getOptionType().subscribe(data =>{
      this.optiontype = data.map((ndot:any) => ndot.tickleDescription);

      console.log("OptionType:", this.optiontype)
    })

    this.buildingrowtotal = this.displayreminder.length;

    this.optionrowtotal = this.displayreminderbuilding.length;
    
  }


  changeH(val:any) {
    console.log("Hierarchy selection:", val);
  }
  changeOT(val:any) {
    console.log("OptionType selection:", val);
  }
  






  

}
