import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

export interface CollapsibleItem { 
  label: string; 
  text: string;
  state: boolean;
}


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})


export class UserSettingsComponent implements OnInit {

  faCaretRight=faCaretRight;
  faCaretLeft=faCaretLeft;

  showFiller = false;
  
  //List of nav items
   nav = [
     {
       title: 'Edit User',
       url:'editUser'
     },
     {
      title: 'Assign Rights',
      url:'userRights'
    },
    {
      title: 'Assign Modules',
      url:'userModules'
    },
  ]

  

  menuItems: CollapsibleItem[] = [
    { label: 'First', text: 'Lorem Ipsum', state: true }
   ];

    menuClick(clickedItem: number) {
        this.menuItems[clickedItem].state = !this.menuItems[clickedItem].state  // flips the boolean value for the clicked item 
        for (let item of this.menuItems) {  
           if ( item !== this.menuItems[clickedItem] ) { 
               item.state = false; 
           }
        }
        // the for loop goes through the array and sets each item to false *if* its not the item that was clicked
     }   
     
  constructor(public router: Router) { }
  

  ngOnInit(): void {
  }

}
