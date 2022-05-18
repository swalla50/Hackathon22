import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { faBuilding, faUser, faFingerprint, faPeopleGroup, faFolderTree, faEnvelopeCircleCheck, faXmark, faBell, faCalendarPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
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
  faXmark = faXmark;
  faBell = faBell;
  faEnvelopeCircleCheck = faEnvelopeCircleCheck;
  faCalendarPlus = faCalendarPlus;
  faTrashCan = faTrashCan;
  //arrays
  hierarchy: any;
  optiontype: any;
  buildingreminders: any;
  leasereminders: any;
  allbuildings: any;
  allreminders: any;
  companyname: any;
  companyreminders: any;
  panelOpenState!: boolean;
  buildingrowtotal: any;
  leaserowtotal: any;
  optionrowtotal: any;
  companyrowtotal: any;
  contacts: any;
  allreminderscid: any;
  contactsid: any;
  allreminderlist: any;
  listoleases: any;
  //for filter
  searchTerm = '';
  Companyterm = '';
  Buildingterm = '';
  Allterm = '';
  Leaseterm = '';
  AllContacts = ''
  buildingName: any;
  buildingHierearchy: any;
  //For Deleting Reminde
  isDeleted: boolean | undefined;
  tickleID: number | undefined;
  deltedReminderval: any;
  //Functionality
  showCompanyDrop!: boolean;
  Hierarchy: any = (i: any, n: any) => [
    { id: i, name: n }
  ]
  selectedOptionType: any = [];
  selectedHierarchy: any = [];
  selectedCompany: any = [];
  selectedBuilding: any = [];
  daysOut!: string;
  Frequency!: string;
  Message!: string;
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
  constructor(public service: SharedService, private toastr: ToastrService, private modalService: NgbModal) { }
  //Opens Modals
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, backdrop: false, size: 'lg', fullscreen: true });
  }
  //Updates tblTickler to isDeleted=1
  deleteReminder(value: any) {
    var rval = {
      tickleID: this.tickleID = value,
      isDeleted: this.isDeleted = true,
    }
    this.service.deleteReminder(rval).subscribe(
      (res: any) => {
        this.deltedReminderval = res;
        this.ngOnInit();
        this.toastr.success('Deleted Reminder!');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Failed to update time.', 'Time update failed.')
        else
          console.log(err);
      });
    console.log(rval)
  }
  ngOnInit(): void {
    this.service.getOptionType().subscribe(data => {
      this.optiontype = data.map((ndot: any) => ndot.tickleDescription);
      if (this.selectedOptionType == "Company - User Defined") {
        let test = this.optiontype.filter((obj: any) => obj === "Company - User Defined")
        this.optiontype = test;
        this.ngOnInit
      }
      if (this.selectedOptionType.length > 0 || this.selectedHierarchy.length > 0) {
        let test1 = this.optiontype.filter((obj: any) => obj != 'Company - User Defined')
        this.optiontype = test1;
        this.ngOnInit
      }
    })
    this.service.getHierarchy().subscribe(datah => {
      this.hierarchy = datah.map((nd: any) => nd.hierarchy);
      if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType.length !== 0) {
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
          console.log("listobuilding", this.allbuildings)
        })
      }
    })
    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      this.contactsid = data.map((obj: any) => obj.contactID)
      this.service.getAllReminders().subscribe(datar => {
        this.allreminders = datar;
        this.allreminderscid = datar.map((obj: any) => obj.contactID)
        for (let i = 0; i < this.allreminders.length; i++) {
          this.allreminders[i].startDate = new Date(this.allreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
          for (let j = 0; j < this.contacts.length; j++) {
            if (this.contacts[j].contactID === this.allreminders[i].contactID)
              console.log("contacts: ", this.allreminders[j])
            this.Allterm = this.allreminders[i].length
            this.allreminderlist = this.allreminders
          }
        }
        console.log(this.allreminders)
      })
    })
    this.service.getCompanyList().subscribe(data => {
      this.companyname = data.map((ndcl: any) => ndcl.companyName);
    })
    this.service.getCompanyReminders().subscribe(data => {
      this.companyreminders = data;
      this.companyrowtotal = this.companyreminders.length;
      for (let i = 0; i < this.companyreminders.length; i++) {
        this.companyreminders[i].startDate = new Date(this.companyreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
        const index = this.companyreminders.indexOf(this.companyreminders[i].isDeleted, 0);
        if (this.companyreminders[i].isDeleted !== false) {
          this.companyreminders = this.companyreminders.filter((obj: any) => obj.isDeleted === false)
          console.log("companyr", this.companyreminders)
        }
      }
    })
    this.service.getBuildingReminders().subscribe(data => {
      this.buildingreminders = data;
      this.buildingrowtotal = this.buildingreminders.length;
      for (let i = 0; i < this.buildingreminders.length; i++) {
        this.buildingreminders[i].startDate = new Date(this.buildingreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
        const index = this.buildingreminders.indexOf(this.buildingreminders[i].isDeleted, 0);
        if (this.buildingreminders[i].isDeleted !== false) {
          this.buildingreminders = this.buildingreminders.filter((obj: any) => obj.isDeleted === false)
          console.log("buildingr", this.buildingreminders)
        }
      }
    })
    this.service.getLeaseReminders().subscribe(data => {
      this.leasereminders = data;
      this.leaserowtotal = this.leasereminders.length;
      for (let i = 0; i < this.leasereminders.length; i++) {
        const index = this.leasereminders.indexOf(this.leasereminders[i].isDeleted, 0);
        if (this.leasereminders[i].isDeleted !== false) {
          this.leasereminders = this.leasereminders.filter((obj: any) => obj.isDeleted === false)
          console.log("leaser", this.leasereminders)
        }
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
      this.selectedBuilding = []
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length > 0) {
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length === 0) {
      this.showBuildingDrop = false;
      this.selectedHierarchy = [];
      this.listobuildings = []
      this.buildingName = []
      this.selectedBuilding = []
      this.ngOnInit()
    }
  }
  changeCompany(val: any) {
    if (val.length === 0) {
      this.showCompanyDrop = false;
      this.ngOnInit()
      this.selectedCompany = [];
    }
    this.ngOnInit()
  }
  changeBuilding(val: any) {
    if (this.selectedOptionType.length === 0) {
      val = []
      this.ngOnInit()
    }
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
      console.log("buildingshow", this.showBuildingDrop)
    }
    if (val.length === 0) {
      this.showCompanyDrop = false;
      this.selectedBuilding = [];
      this.showBuildingDrop = false;
      this.ngOnInit()
      this.selectedCompany = [];
    }
    if (this.selectedOptionType.length > 0 && this.selectedOptionType != "Building - Option Reminder") {
      this.showCompanyDrop = false;
      this.selectedBuilding = [];
      this.showBuildingDrop = false;
      this.selectedCompany = [];
      console.log("buildingshow2", this.showBuildingDrop, this.selectedOptionType)
    }
    this.ngOnInit();
    console.log("hierarchy", this.selectedHierarchy)
    console.log("thisoption", this.selectedOptionType)
  }
  reminderobj: any = [];
  onSubmit() {
    for (let i = 0; i < this.selectedOptionType.length; i++) {
      this.reminderobj[i] = {
        optionType: this.selectedOptionType[i],
        hierarchy: this.selectedHierarchy,
        company: this.selectedCompany,
        building: this.selectedBuilding,
        daysOut: this.daysOut,
        Frequency: this.Frequency,
        Message: this.Message
      }
    }
    //More than 1 hierarchy selected
    if (this.selectedOptionType.length > 1) {
      for (let i = 0; i < this.selectedOptionType.length; i++) {
        console.log()
        if (this.reminderobj[i].optionType == "Contact - User Defined") {
          console.log("CONTACT: ", this.reminderobj[i])
        }
        if (this.reminderobj[i].optionType == "Building - Option Reminder") {
          console.log("BUILDING: ", this.reminderobj[i])
          for (let j = 0; j < this.allbuildings.length; j++) {
            for (let k = 0; k < this.reminderobj[i].hierarchy.length; k++) {
              if (this.reminderobj[i].hierarchy[k] == this.allbuildings[j].hierarchy) {
                console.log("Building ", j, " ", this.allbuildings[j])
              }
            }
          }
        }
        if (this.reminderobj[i].optionType == "Lease - User Defined") {
          console.log("LEASE: ", this.reminderobj[i])
          for (let k = 0; k < this.reminderobj[i].hierarchy.length; k++) {
            if (this.reminderobj[i].hierarchy[k] === "Costar Group --> Costar-Dev") {
              console.log("Dev hierarhcy: ", this.reminderobj[i])
            }
          }
        }
      }
      this.toastr.success(this.selectedOptionType + ' reminders added successfully', 'Sucess!')
    }
    //Only 1 hierarchy selected
    if (this.selectedOptionType.length < 2 && this.selectedOptionType != 0) {
      this.toastr.success(this.selectedOptionType + ' reminders added successfully', 'Sucess!')
      if (this.selectedOptionType == "Company - User Defined") {
        console.log("Goes to company")
      }
      if (this.selectedOptionType == "Building - Option Reminder") {
        console.log("Goes to Building")
      }
    }
  }
}
