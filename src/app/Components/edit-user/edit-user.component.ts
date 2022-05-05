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

 

  Hierarchy:any = (i :any,n: any) => [
    { id: i, name: n }
  ]

  selectedOptionType: any = [];
  selectedHierarchy:any = [];

  
  constructor( public service:SharedService) { }

  ngOnInit(): void {

    this.service.getHierarchy().subscribe(data =>{
      this.hierarchy = data;

      console.log("Hierarchy:", this.hierarchy)
    })

    this.service.getOptionType().subscribe(data =>{
      this.optiontype = data;

      console.log("OptionType:", this.optiontype)
    })
    
  }


  changeH(val:any) {
    console.log("Hierarchy selection:", val);
  }
  changeOT(val:any) {
    console.log("OptionType selection:", val);
  }
  






  

}
