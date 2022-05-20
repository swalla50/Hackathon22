import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faMagnifyingGlass= faMagnifyingGlass;

  getUser:any;
  userObj: any;
  acronym:any;
  getacronym:any;
  
  constructor() { }

  ngOnInit(): void {
    this.getacronym = 
    this.acronym = localStorage.getItem('acronym')

    
    console.log('acronym',this.acronym)
  }

}
