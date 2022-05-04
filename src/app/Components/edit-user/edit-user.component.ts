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

  OptionType = [
    { id: 1, name: "" },
    { id: 2, name: "Contingency Option Reminder" },
    { id: 3, name: "Contraction Option Reminder" },
    { id: 4, name: "Expansion Option Reminder" },
    { id: 5, name: "Lease Expiration" },
    { id: 6, name: "Other Option Reminder"},
    { id: 7, name: "Other Option Reminder"},
    { id: 8, name: "Purchase Option Reminder"},
    { id: 9, name: "Relocation Option Reminder"},
    { id: 10, name: "Automatic Renewal Option Reminder"}
  ];

  Hierarchy:any = (i :any,n: any) => [
    { id: i, name: n }
  ]

  selectedOptionType = [{ id: null, name: null}];
  selectedHierarchy = [{ id: null, name: null}];

  
  constructor( public service:SharedService) { }

  ngOnInit(): void {

    this.service.getHierarchy().subscribe(data =>{
      this.hierarchy = data;
    })

    this.service.getOptionType().subscribe(data =>{
      this.optiontype = data;
    })
    
  }

  

}
