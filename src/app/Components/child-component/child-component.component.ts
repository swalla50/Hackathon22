import { Component, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {
  
  faXmark = faXmark;
  @Input() dataToTakeAsInput: any;
  ticklerMessage: any;
  

  constructor() { }
  updateContactReminderMessage(value: any) {
    console.log()
    var crmval = {
      ticklerMessage: this.ticklerMessage = value

    }
    // this.service.updateContactR(crval).subscribe(
    //   (res: any) => {
    //     this.contacteditR = res;
    //     this.save();
    //     this.ngOnInit();
    //     this.toastr.success('Edited Contact Reminder!');
    //   },
    //   err => {
    //     if (err.status == 400)
    //       this.toastr.error('Failed to update time.', 'Time update failed.')
    //     else
    //       console.log(err);
    //   });
    this.ngOnInit
    console.log(crmval)
  }
  ngOnInit(): void {  
    this.ticklerMessage = this.dataToTakeAsInput;

  }

}
