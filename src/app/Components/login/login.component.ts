import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ContactUserID: any
  ContactPassword: any;
  contactdata: any;
  getUser: any;
  userObj: any;
  acronym: any;

  constructor(private router: Router, public service: SharedService, public toastr: ToastrService) {

  }

  LoggedIn = 'true';
  ngOnInit(): void {
    console.log(this.ContactUserID, this.ContactPassword)
  }

  login() {
    this.service.getContacts().subscribe(data => {
      this.contactdata = data;
      console.log(this.contactdata)
      for (let i = 0; i < this.contactdata.length; i++) {
        console.log(this.ContactUserID, this.ContactPassword)
        console.log(this.contactdata[i].contactUserID, this.contactdata[i].contactPassword)
        if (this.contactdata[i].contactUserID === this.ContactUserID && this.contactdata[i].contactPassword === this.ContactPassword) {
          
          this.router.navigate(['home'])
            .then(() => {
              window.location.reload()
              
            })
            .then(()=>{
              this.toastr.success('Login Successful!')
            })

          localStorage.setItem('LoggedIn', 'true')
          localStorage.setItem('User', JSON.stringify(this.contactdata[i]))
          this.getUser = localStorage.getItem('User');
          this.userObj = JSON.parse(this.getUser)
          var str = this.userObj.contactFirstName + ' ' + this.userObj.contactLastName
          var matches: any = str.match(/\b(\w)/g); // ['J','S','O','N']
          this.acronym = matches.join(''); // JSON
          localStorage.setItem('acronym', this.acronym)
        }
        


      }
      if (localStorage.getItem('LoggedIn') != 'true') {
        this.toastr.error('Login Denied.')
      }

    })

  }

}
