import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass,faArrowRightFromBracket, faCalculator, faUserAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faMagnifyingGlass= faMagnifyingGlass;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faCalculator = faCalculator;
  faUserAlt = faUserAlt;


  getUser:any;
  userObj: any;
  acronym:any;
  getacronym:any;
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getUser = localStorage.getItem('User');
    this.userObj = JSON.parse(this.getUser)
    this.acronym = localStorage.getItem('acronym')

    
    console.log('acronym',this.acronym)
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("");
  }
}
