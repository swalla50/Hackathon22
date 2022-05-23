import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { faBuilding, faUser, faFingerprint, faPeopleGroup, faFolderTree, faEnvelopeCircleCheck, faXmark, faBell, faCalendarPlus, faTrashCan, faPencil, faCheck,faX} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  encapsulation: ViewEncapsulation.None,
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
  faPencil = faPencil;
  faCheck = faCheck;
  faX = faX; 
  //arrays
  hierarchy: any;
  optiontype: any;
  buildingreminders: any;
  leasereminders: any;
  allbuildings: any;
  allleases: any;
  allreminders: any;
  companyname: any;
  companyreminders: any;
  contactReminders: any;
  panelOpenState!: boolean;
  buildingrowtotal: any;
  leaserowtotal: any;
  optionrowtotal: any;
  companyrowtotal: any;
  contacts: any;
  allreminderscid: any;
  contactsid: any;
  allreminderlist: any;
  listoleases: any = [];
  listohierarchy: any;
  //for filter
  searchTerm = '';
  Companyterm = '';
  Buildingterm = '';
  Contactterm = '';
  Allterm = '';
  Leaseterm = '';
  AllContacts = ''
  buildingName: any;
  leaseName: any;
  buildingHierearchy: any;
  //For Deleting Reminde
  isDeleted: boolean | undefined;
  tickleID: number | undefined;
  deltedReminderval: any;
  AddReminderVal: any;
  //Functionality
  showCompanyDrop!: boolean;
  Hierarchy: any = (i: any, n: any) => [
    { id: i, name: n }
  ]
  selectedOptionType: any = [];
  selectedHierarchy: any = [];
  selectedCompany: any = [];
  selectedBuilding: any = [];
  selectedLease: any = [];
  daysOut!: string;
  userdefineddate!: Date;
  Frequency!: string;
  Message!: string;
  listobuildings: any = []
  showBuildingDrop!: boolean;
  showLeaseDrop!: boolean;
  getUser: any;
  userObj: any;
  ticklerFrequency: any;
  ticklerMessage:any;
  userDefinedDate:any;
  lastModifiedBy: any;
  contacteditR: any;

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
    this.modalService.open(content, { centered: true, backdrop: false, size: 'lg', windowClass: 'modal-xl'});
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
  }

  //Switching between myreminder views edit and read
  isEditing: boolean = false;
  enableEditIndex = null;
  i: any;
  switchEditMode(i: any) {
    this.isEditing = true;
    this.enableEditIndex = i;
  }

  save() {
    this.isEditing = false;
    this.enableEditIndex = null;
  }

  cancel() {
    this.isEditing = false;
    this.enableEditIndex = null;
  }
//Refreshed the contactmodule
  refreshContactReminder$ = new BehaviorSubject<boolean>(true);

  //UpdateContactReminder
  updateContactReminder(value: any){
        
    var crval = {
      tickleID: this.tickleID = value,
      tickleBy: this.ticklerFrequency,
      ticklerFrequency: this.ticklerFrequency,
      ticklerMessage: this.ticklerMessage,
      userDefinedDate: this.userDefinedDate,
      lastModifiedBy: this.userObj.contactID,
      lastModified: moment().format('YYYY-MM-DDTHH:mm:ss')

    } 
    // this.service.updateContactR(crval).subscribe(
    //   (res:any) =>{
    //     this.contacteditR = res;
    //     this.refreshContactReminder$.next(true)
        
    //     this.toastr.success('Edited Contact Reminder!');
    //   },
    //   err =>{
    //     if(err.status == 400)
    //     this.toastr.error('Failed to update time.', 'Time update failed.')
    //     else
    //     console.log(err);
    //   });
    console.log(crval)
  }
  ngOnInit(): void {

    this.getUser = localStorage.getItem('User');
    this.userObj = JSON.parse(this.getUser)

    console.log(this.userObj);
    this.service.getOptionType().subscribe(data => {
      this.optiontype = data.map((ndot: any) => ndot.tickleDescription);
      if (this.selectedOptionType == "Company - Reminder") {
        let test = this.optiontype.filter((obj: any) => obj === "Company - Reminder")
        this.optiontype = test;
        this.ngOnInit
      }
      if (this.selectedOptionType.length > 0 || this.selectedHierarchy.length > 0) {
        let test1 = this.optiontype.filter((obj: any) => obj != 'Company - Reminder')
        this.optiontype = test1;
        this.ngOnInit
      }
    })




    this.service.getBH().subscribe(data => {
      this.allbuildings = data;
      this.hierarchy = this.allbuildings.filter((obj: any) => obj.companyID === this.userObj.companyID)
      this.hierarchy = this.hierarchy.map((nd: any) => nd.hierarchy);
      let hierarchysetOfValue: any = new Set(this.hierarchy)
      //   //distinct building name values from array
      let uniqueHierachyValues = [...hierarchysetOfValue]
      this.hierarchy = uniqueHierachyValues
      this.allbuildings = this.allbuildings.filter((obj: any) => obj.companyID === this.userObj.companyID)
      this.buildingName = this.allbuildings.map((obj: any) => obj.buildingName)
      if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType.length !== 0) {
        for (let j = 0; j < this.selectedHierarchy.length; j++) {
          for (let i = 0; i < this.allbuildings.length; i++) {
            // console.log("building hierarchy", this.buildingHierearchy)
            if (this.selectedHierarchy[j] === this.allbuildings[i].hierarchy) {

              this.buildingName[i] = this.allbuildings[i].buildingName;
              this.listobuildings.push(this.buildingName[i]);
              let setOfValue: any = new Set(this.listobuildings)
              //   //distinct building name values from array
              let uniqueBuildingValues = [...setOfValue]
              this.buildingName = uniqueBuildingValues
            }

          }
        }
      }

    })

    this.service.getLH().subscribe(data => {
      this.allleases = data;
      this.allleases = this.allleases.filter((obj: any) => obj.companyID === this.userObj.companyID)
      this.leaseName = this.allleases.map((obj: any) => obj.leaseName)
      console.log("leasename", this.leaseName)
      if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType.length !== 0) {
        for (let j = 0; j < this.selectedHierarchy.length; j++) {
          for (let i = 0; i < this.allleases.length; i++) {
            // console.log("building hierarchy", this.buildingHierearchy)
            if (this.selectedHierarchy[j] === this.allleases[i].hierarchy) {
              this.leaseName[i] = this.allleases[i].leaseName;
              this.listoleases.push(this.leaseName[i]);
              let leasesetOfValue: any = new Set(this.listoleases)
              //   //distinct building name values from array
              let uniqueleaseValues = [...leasesetOfValue]
              this.leaseName = uniqueleaseValues;
            }
            else {
              this.leaseName = []
            }

          }
        }
      }
    })


    this.service.getContactReminders().subscribe(data => {
      this.contactReminders = data;
      this.contactReminders = this.contactReminders.filter((obj: any) => obj.isDeleted === false && obj.contactID === this.userObj.contactID)
      for (let i = 0; i < this.contactReminders.length; i++) {
        this.contactReminders[i].userDefinedDate = new Date(this.contactReminders[i].userDefinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
        const index = this.contactReminders.indexOf(this.contactReminders[i].isDeleted, 0);
        if (this.contactReminders[i].isDeleted !== false) {
          this.contactReminders = this.contactReminders.filter((obj: any) => obj.isDeleted === false && obj.contactID === this.userObj.contactID)
        }
      }

      console.log("contact reminder:", this.contactReminders)
    })


    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      this.contactsid = data.map((obj: any) => obj.contactID)
      this.contacts = this.contacts.filter((obj: any) => obj.companyID === this.userObj.companyID)

      this.service.getAllReminders().subscribe(datar => {
        this.allreminders = datar;
        this.allreminderscid = datar.map((obj: any) => obj.contactID)
        for (let i = 0; i < this.allreminders.length; i++) {
          this.allreminders[i].startDate = new Date(this.allreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
          for (let j = 0; j < this.contacts.length; j++) {
            if (this.contacts[j].contactID === this.allreminders[i].contactID)
              this.Allterm = this.allreminders[i].length
            this.allreminderlist = this.allreminders

          }
        }
      })
    })
    this.service.getCompanyList().subscribe(data => {
      this.companyname = data;
      console.log("companyname:",this.companyname)
    })
    this.service.getCompanyReminders().subscribe(data => {
      this.companyreminders = data;
      this.companyrowtotal = this.companyreminders.length;
      this.companyreminders = this.companyreminders.filter((obj: any) => obj.isDeleted === false && obj.contactID === this.userObj.contactID)
      for (let i = 0; i < this.companyreminders.length; i++) {
        this.companyreminders[i].startDate = new Date(this.companyreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
        const index = this.companyreminders.indexOf(this.companyreminders[i].isDeleted, 0);
        if (this.companyreminders[i].isDeleted !== false) {

        }
      }
    })
    this.service.getBuildingReminders().subscribe(data => {
      this.buildingreminders = data;
      this.buildingrowtotal = this.buildingreminders.length;
      this.buildingreminders = this.buildingreminders.filter((obj: any) => obj.isDeleted === false && obj.contactID === this.userObj.contactID)
      for (let i = 0; i < this.buildingreminders.length; i++) {
        this.buildingreminders[i].startDate = new Date(this.buildingreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
        const index = this.buildingreminders.indexOf(this.buildingreminders[i].isDeleted, 0);
        if (this.buildingreminders[i].isDeleted !== false) {
          this.buildingreminders = this.buildingreminders.filter((obj: any) => obj.isDeleted === false && obj.contactID === this.userObj.contactID)
        }
      }
    })
    this.service.getLeaseReminders().subscribe(data => {
      this.leasereminders = data;

      this.leaserowtotal = this.leasereminders.length;
      this.leasereminders = this.leasereminders.filter((obj: any) => { return obj.isDeleted == false && obj.contactID == this.userObj.contactID })
      for (let i = 0; i < this.leasereminders.length; i++) {
        for (let j = 0; j < this.userObj.length; j++) {

          if (this.leasereminders[i].isDeleted !== false) {

          }
        }


      }
    })
  }
  //functionality of getting the selected values of dropdown
  changeH(val: any) {
    if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType == "Building - Reminder") {
      this.listobuildings = []
      this.showBuildingDrop = true;
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType == "Lease - Reminder") {
      this.listobuildings = []
      this.showBuildingDrop = false;
      this.showLeaseDrop = true;
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length > 1) {
      this.showBuildingDrop = false;
      this.showLeaseDrop = false;
      this.selectedBuilding = []
      this.selectedLease = []
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length > 0) {
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length === 0) {
      this.showBuildingDrop = false;
      this.showLeaseDrop = false;
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
  changeLease(val: any) {
    if (this.selectedOptionType.length === 0) {
      val = []
      this.ngOnInit()
    }
    this.ngOnInit()
  }
  changeOT(val: any) {
    if (val == "Company - Reminder") {
      this.showCompanyDrop = true;
      this.ngOnInit()
    }
    if (val == "Lease - Reminder" && this.selectedHierarchy.length > 0) {
      this.showLeaseDrop = true;
      this.ngOnInit()
    }
    if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType == "Building - Reminder") {
      this.showBuildingDrop = true;
      this.showLeaseDrop = false;
      this.ngOnInit()
    }
    if (val.length === 0) {
      this.showCompanyDrop = false;
      this.selectedBuilding = [];
      this.selectedHierarchy = []
      this.showBuildingDrop = false;
      this.showLeaseDrop = false;
      this.ngOnInit()
      this.selectedCompany = [];
      this.listobuildings = []
    }
    if (this.selectedOptionType.length > 0 && this.selectedOptionType != "Building - Reminder") {
      this.showCompanyDrop = false;
      this.selectedBuilding = [];
      this.showBuildingDrop = false;
      this.selectedCompany = [];
    }
    if (this.selectedOptionType.length > 0 && this.selectedOptionType != "Lease - Reminder") {
      this.showCompanyDrop = false;
      this.selectedBuilding = [];
      this.showBuildingDrop = false;
      this.showLeaseDrop = false;
      this.selectedCompany = [];
    }
    this.ngOnInit();
  }
  reminderobj: any = [];
  reminderobjh: any = []
  onSubmit() {
    for (let i = 0; i < this.selectedOptionType.length; i++) {
      this.reminderobj[i] = {
        optionType: this.selectedOptionType[i],
        hierarchy: this.selectedHierarchy,
        company: this.selectedCompany,
        building: this.selectedBuilding,
        lease: this.selectedLease,
        daysOut: this.daysOut,
        Frequency: this.Frequency,
        Message: this.Message,
        userdefineddate: this.userdefineddate
      }
      console.log("rbuilding", this.selectedHierarchy[0], this.selectedHierarchy[1])
    }
    for (let i = 0; i < this.selectedHierarchy.length; i++) {
      this.reminderobjh[i] = {
        optionType: this.selectedOptionType,
        hierarchy: this.selectedHierarchy[i],
        company: this.selectedCompany,
        building: this.selectedBuilding,
        lease: this.selectedLease,
        daysOut: this.daysOut,
        Frequency: this.Frequency,
        Message: this.Message,
        userdefineddate: this.userdefineddate
      }
      console.log("rbuildinghoer", this.reminderobjh[i])
    }

    // --------------------------------------------------------------------------------------
    //More than 1 Option selected
    if (this.selectedOptionType.length > 1) {
      for (let i = 0; i < this.selectedOptionType.length; i++) {

        // if (this.reminderobj[i].optionType == "Company - Reminder") {
        //   for (let j = 0; j < this.contactReminders.length; j++) {
        //     for (let k = 0; k < this.reminderobj[i].hierarchy.length; k++) {
        //       if (this.reminderobj[i].hierarchy[k] == this.allbuildings[j].hierarchy) {
        //         var rval = {
        //           tickleBy: this.Frequency,
        //           ticklerFrequency: this.Frequency,
        //           contactID: this.userObj.contactID,
        //           ticklerMessage: this.Message,
        //           ticklerTypeID: 6,
        //           objectID: this.contactReminders[j].objectID,
        //           objectTypeID: 2,
        //           ticklerDaysOut: this.reminderobj[i].daysOut,
        //           userDefinedDate: this.userdefineddate,
        //           isDeleted: false,
        //           LastModifiedBy: this.userObj.contactID,
        //           LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
        //         }
        //         console.log("CONTACT: ", rval)

        //         // this.service.addReminder(rval).subscribe(
        //         //   (res: any) => {
        //         //     this.AddReminderVal = res;
        //         //     this.ngOnInit();
        //         //     this.toastr.success('Added Reminder for Lease ID: ' + this.allbuildings[j].buildingID)
        //         //   },
        //         //   err => {
        //         //     if (err.status == 400)
        //         //       this.toastr.error('Failed to update time.', 'Time update failed.')
        //         //     else
        //         //       console.log(err);
        //         //   });
        //       }
        //     }
        //   }

        // }

        if (this.reminderobj[i].optionType == "Building - Reminder") {
          for (let j = 0; j < this.allbuildings.length; j++) {
            for (let k = 0; k < this.reminderobj[i].hierarchy.length; k++) {
              if (this.reminderobj[i].hierarchy[k] == this.allbuildings[j].hierarchy) {
                var rval = {
                  tickleBy: this.Frequency,
                  ticklerFrequency: this.Frequency,
                  contactID: this.userObj.contactID,
                  ticklerMessage: this.Message,
                  ticklerTypeID: 2,
                  objectID: this.allbuildings[j].buildingID,
                  objectTypeID: 2,
                  ticklerDaysOut: this.reminderobj[i].daysOut,
                  userDefinedDate: this.userdefineddate,
                  isDeleted: false,
                  LastModifiedBy: this.userObj.contactID,
                  LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
                }
                console.log("BUILDING: ", rval)

                this.service.addReminder(rval).subscribe(
                  (res: any) => {
                    this.AddReminderVal = res;
                    this.ngOnInit();
                    this.toastr.success('Added Reminder for Lease ID: ' + this.allbuildings[j].buildingID)
                  },
                  err => {
                    if (err.status == 400)
                      this.toastr.error('Failed to update time.', 'Time update failed.')
                    else
                      console.log(err);
                  });
              }
            }
          }
        }


        if (this.reminderobj[i].optionType == "Lease - Reminder") {
          console.log("LEASE: ", this.reminderobj[i])

          for (let j = 0; j < this.allleases.length; j++) {
            for (let k = 0; k < this.reminderobj[i].hierarchy.length; k++) {
              if (this.reminderobj[i].hierarchy[k] == this.allleases[j].hierarchy) {
                var rval = {
                  tickleBy: this.Frequency,
                  ticklerFrequency: this.Frequency,
                  contactID: this.userObj.contactID,
                  ticklerMessage: this.Message,
                  ticklerTypeID: 1,
                  objectID: this.allleases[j].leaseID,
                  objectTypeID: 4,
                  ticklerDaysOut: this.reminderobj[i].daysOut,
                  userDefinedDate: this.userdefineddate,
                  isDeleted: false,
                  LastModifiedBy: this.userObj.contactID,
                  LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
                }
                this.service.addReminder(rval).subscribe(
                  (res: any) => {
                    this.AddReminderVal = res;
                    this.ngOnInit();
                    this.toastr.success('Added Reminder for Lease ID: ' + this.allleases[j].leaseID)
                  },
                  err => {
                    if (err.status == 400)
                      this.toastr.error('Failed to update time.', 'Time update failed.')
                    else
                      console.log(err);
                  });
              }
            }
          }
        }
      }
    }

    // ------------------------------------------------------------------------------------
    //Only 1 option selected
    if (this.selectedOptionType.length < 2 && this.selectedOptionType.length > 0) {
      for (let i = 0; i < this.selectedOptionType.length; i++) {

        //More than one hierarchy
        if (this.selectedHierarchy.length > 1) {
          // if (this.selectedOptionType == "Company - Reminder") {
          //   console.log("Goes to company")
          // }
          if (this.selectedOptionType[i] == "Building - Reminder") {
            for (let j = 0; j < this.allbuildings.length; j++) {
              for (let k = 0; k < this.selectedHierarchy.length; k++) {
                if (this.reminderobjh[k].hierarchy == this.selectedHierarchy[k]) {
                  // console.log("greater than 1",this.allbuildings[j].hierarchy,this.selectedHierarchy[k] )
                  if (this.allbuildings[j].hierarchy == this.selectedHierarchy[k]) {
                    var rval = {
                      tickleBy: this.Frequency,
                      ticklerFrequency: this.Frequency,
                      contactID: this.userObj.contactID,
                      ticklerMessage: this.Message,
                      ticklerTypeID: 2,
                      objectID: this.allbuildings[j].buildingID,
                      objectTypeID: 3,
                      ticklerDaysOut: this.reminderobj[i].daysOut,
                      userDefinedDate: this.userdefineddate,
                      isDeleted: false,
                      LastModifiedBy: this.userObj.contactID,
                      LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
                    }
                    this.service.addReminder(rval).subscribe(
                      (res: any) => {
                        this.AddReminderVal = res;
                        this.ngOnInit();
                        this.toastr.success('Added Reminder for Building ID: ' + this.allbuildings[j].buildingName)
                      },
                      err => {
                        if (err.status == 400)
                          this.toastr.error('Failed to update time.', 'Time update failed.')
                        else
                          console.log(err);
                      });

                  }
                }
              }
            }
          }
          if (this.selectedOptionType[i] == "Lease - Reminder") {
            for (let j = 0; j < this.allleases.length; j++) {
              for (let k = 0; k < this.selectedHierarchy.length; k++) {
                if (this.reminderobjh[k].hierarchy == this.selectedHierarchy[k]) {
                  if (this.allleases[j].hierarchy == this.selectedHierarchy[k]) {
                    var rval = {
                      tickleBy: this.Frequency,
                      ticklerFrequency: this.Frequency,
                      contactID: this.userObj.contactID,
                      ticklerMessage: this.Message,
                      ticklerTypeID: 2,
                      objectID: this.allleases[j].leaseID,
                      objectTypeID: 3,
                      ticklerDaysOut: this.reminderobj[i].daysOut,
                      userDefinedDate: this.userdefineddate,
                      isDeleted: false,
                      LastModifiedBy: this.userObj.contactID,
                      LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
                    }
                    console.log("Leaserval", rval)
                    this.service.addReminder(rval).subscribe(
                      (res: any) => {
                        this.AddReminderVal = res;
                        this.ngOnInit();
                        this.toastr.success('Added Reminder for Lease ID: ' + this.allleases[j].leaseName)
                      },
                      err => {
                        if (err.status == 400)
                          this.toastr.error('Failed to update time.', 'Time update failed.')
                        else
                          console.log(err);
                      });

                  }
                }
              }
            }
          }
        }

        //Only 1 hierarchy
        if (this.selectedHierarchy.length = 1) {
          if (this.selectedOptionType == "Company - Reminder") {
          }
          if (this.reminderobj[i].optionType == "Building - Reminder") {
            for (let j = 0; j < this.allbuildings.length; j++) {
              for (let k = 0; k < this.selectedHierarchy.length; k++) {
                for (let m = 0; m < this.selectedBuilding.length; m++) {
                  if (this.reminderobjh[k].hierarchy == this.selectedHierarchy[k]) {
                    if (this.allbuildings[j].buildingName == this.selectedBuilding[m]) {
                      var rval = {
                        tickleBy: this.Frequency,
                        ticklerFrequency: this.Frequency,
                        contactID: this.userObj.contactID,
                        ticklerMessage: this.Message,
                        ticklerTypeID: 2,
                        objectID: this.allbuildings[j].buildingID,
                        objectTypeID: 3,
                        ticklerDaysOut: this.reminderobj[i].daysOut,
                        userDefinedDate: this.userdefineddate,
                        isDeleted: false,
                        LastModifiedBy: this.userObj.contactID,
                        LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
                      }
                      this.service.addReminder(rval).subscribe(
                        (res: any) => {
                          this.AddReminderVal = res;
                          this.ngOnInit();
                          this.toastr.success('Added Reminder for Building ID: ' + this.allbuildings[j].buildingName)
                        },
                        err => {
                          if (err.status == 400)
                            this.toastr.error('Failed to update time.', 'Time update failed.')
                          else
                            console.log(err);
                        });

                    }
                  }
                }
              }
            }
          }
          if (this.reminderobj[i].optionType == "Lease - Reminder") {
            for (let j = 0; j < this.allleases.length; j++) {
              for (let k = 0; k < this.selectedHierarchy.length; k++) {
                for (let m = 0; m < this.selectedLease.length; m++) {
                  if (this.reminderobjh[k].hierarchy == this.selectedHierarchy[k]) {
                    if (this.allleases[j].leaseName == this.selectedLease[m]) {
                      var rval = {
                        tickleBy: this.Frequency,
                        ticklerFrequency: this.Frequency,
                        contactID: this.userObj.contactID,
                        ticklerMessage: this.Message,
                        ticklerTypeID: 2,
                        objectID: this.allleases[j].leaseID,
                        objectTypeID: 3,
                        ticklerDaysOut: this.reminderobj[i].daysOut,
                        userDefinedDate: this.userdefineddate,
                        isDeleted: false,
                        LastModifiedBy: this.userObj.contactID,
                        LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
                      }
                      console.log("Leaserval", rval)
                      this.service.addReminder(rval).subscribe(
                        (res: any) => {
                          this.AddReminderVal = res;
                          this.ngOnInit();
                          this.toastr.success('Added Reminder for Building ID: ' + this.allleases[j].leaseName)
                        },
                        err => {
                          if (err.status == 400)
                            this.toastr.error('Failed to update time.', 'Time update failed.')
                          else
                            console.log(err);
                        });

                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
