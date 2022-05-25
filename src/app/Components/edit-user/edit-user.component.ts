import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { faBuilding, faUser, faFingerprint, faPeopleGroup, faFolderTree, faEnvelopeCircleCheck, faXmark, faFileExcel, faBell, faCalendarPlus, faTrashCan, faPencil, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ChildComponentComponent } from '../child-component/child-component.component';
import * as XLSX from 'xlsx';
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
  faFileExcel=faFileExcel;
  //arrays
  hierarchy: any;
  optiontype: any;
  buildingreminders: any;
  leasereminders: any;
  allbuildings: any;
  allleases: any;
  allreports: any;
  allprojects: any;
  allreminders: any;
  companyname: any;
  companyreminders: any;
  contactReminders: any;
  projectReminders: any;
  reportReminders: any;
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
  listtoproject: any = [];
  //for filter
  searchTerm = '';
  Companyterm = '';
  Buildingterm = '';
  Contactterm = '';
  Allterm = '';
  Leaseterm = '';
  Projectterm = '';
  AllContacts = ''
  buildingName: any;
  leaseName: any;
  projectName: any;
  reportName: any;
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
  selectedProject: any = [];
  selectedReport: any = [];
  daysOut!: string;
  userdefineddate!: Date;
  Frequency!: string;
  Message!: string;
  listobuildings: any = []
  showBuildingDrop!: boolean;
  showLeaseDrop!: boolean;
  showProjectDrop!: boolean;
  showReminderDrop!: boolean;
  getUser: any;
  userObj: any;
  ticklerFrequency: any;
  tickleBy: any;
  ticklerMessage: any;
  contactReminderDate: any;
  lastModifiedBy: any;
  contacteditR: any;



  leaseexportexcel(): void {
    var Title = "Lease Reminders";
    var fileName = "MyLeaseReminders.xlsx";
    let element = document.getElementById("lease-excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    delete ws[5]
    /* O1 is your Column in Excel*/

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save file */
    XLSX.writeFile(wb, fileName);
  }
  contactexportexcel(): void {
    var Title = "Contact Reminders";
    var fileName = "MyContactReminders.xlsx";
    let element = document.getElementById("contact-excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    delete ws[5]
    /* O1 is your Column in Excel*/

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save file */
    XLSX.writeFile(wb, fileName);
  }
  companyexportexcel(): void {
    var Title = "Company Reminders";
    var fileName = "MyCompanyReminders.xlsx";
    let element = document.getElementById("company-excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    delete ws[5]
    /* O1 is your Column in Excel*/

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save file */
    XLSX.writeFile(wb, fileName);
  }
  buildingexportexcel(): void {
    var Title = "Building Reminders";
    var fileName = "MyBuildingReminders.xlsx";
    let element = document.getElementById("building-excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    delete ws[5]
    /* O1 is your Column in Excel*/

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save file */
    XLSX.writeFile(wb, fileName);
  }
  projectexportexcel(): void {
    var Title = "Project Reminders";
    var fileName = "MyProjectReminders.xlsx";
    let element = document.getElementById("project-excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    delete ws[5]
    /* O1 is your Column in Excel*/

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save file */
    XLSX.writeFile(wb, fileName);
  }

  displayreminder: any = [
    { date: '2/13/2022', frequency: 3, reminderType: 'User Defined' },
    { date: '4/13/2022', frequency: 4, reminderType: 'User Defined' },
    { date: '5/04/2022', frequency: 30, reminderType: 'User Defined' },
    { date: '1/20/2022', frequency: 7, reminderType: 'User Defined' },
    { date: '5/13/2022', frequency: 60, reminderType: 'User Defined' },
    { date: '3/15/2022', frequency: 120, reminderType: 'User Defined' },
  ]
  projectrowtotal: any;
  constructor(public service: SharedService, private toastr: ToastrService, private modalService: NgbModal, private router: Router) { }
  //Opens Modals
  //Opens Modals

  dataPassToChild: any = null;
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, backdrop: false, size: 'lg', windowClass: 'modal-xl' });
  }
  openChildComponentModel(content: any) {

    const modalRef = this.modalService.open(ChildComponentComponent, { centered: true, size: 'lg', backdrop: false });

    (<ChildComponentComponent>modalRef.componentInstance).dataToTakeAsInput = content
    console.log("child", content)

    modalRef.result.then((result) => {
      console.log("result", result);
    }).catch((result) => {
      console.log(result);
    });
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

  //Switching between Contactmyreminder views edit and read
  isEditingContact: boolean = false;
  enableEditIndexContact = null;
  iContact: any;
  switchEditModeContact(iContact: any) {
    this.isEditingContact = true;
    this.enableEditIndexContact= iContact;
  }

  saveContact() {
    this.isEditingContact = false;
    this.enableEditIndexContact = null;
  }

  cancelContact() {
    this.isEditingContact = false;
    this.enableEditIndexContact = null;
  }
  //Switching between Buildingmyreminder views edit and read
  isEditingBuilding: boolean = false;
  enableEditIndexBuilding = null;
  iBuilding: any;
  switchEditModeBuilding(iBuilding: any) {
    this.isEditingBuilding = true;
    this.enableEditIndexBuilding = iBuilding;
  }

  saveBuidling() {
    this.isEditingBuilding = false;
    this.enableEditIndexBuilding = null;
  }

  cancelBuilding() {
    this.isEditingBuilding = false;
    this.enableEditIndexBuilding = null;
  }
   //Switching between Companygmyreminder views edit and read
  isEditingCompany: boolean = false;
  enableEditIndexCompany = null;
  iCompany: any;
  switchEditModeCompany(iCompany: any) {
    this.isEditingCompany = true;
    this.enableEditIndexCompany = iCompany;
  }

  saveCompany() {
    this.isEditingCompany = false;
    this.enableEditIndexCompany = null;
  }

  cancelCompany() {
    this.isEditingCompany = false;
    this.enableEditIndexCompany = null;
  }

     //Switching between Leasegmyreminder views edit and read
     isEditingLease: boolean = false;
     enableEditIndexLease = null;
     iLease: any;
     switchEditModeLease(iLease: any) {
       this.isEditingLease = true;
       this.enableEditIndexLease = iLease;
     }
   
     saveLease() {
       this.isEditingLease = false;
       this.enableEditIndexLease = null;
     }
   
     cancelLease() {
       this.isEditingLease = false;
       this.enableEditIndexLease = null;
     }


        //Switching between Projectgmyreminder views edit and read
  isEditingProjects: boolean = false;
  enableEditIndexProjects = null;
  iProjects: any;
  switchEditModeProjects(iProjects: any) {
    this.isEditingProjects = true;
    this.enableEditIndexCompany = iProjects;
  }

  saveProjects() {
    this.isEditingProjects = false;
    this.enableEditIndexProjects = null;
  }

  cancelProjects() {
    this.isEditingProjects = false;
    this.enableEditIndexProjects = null;
  }

     
  //Refreshed the contactmodule
  refreshContactReminder$ = new BehaviorSubject<boolean>(true);

  //UpdateContactReminder
  updateContactReminder(value: any, byVal: any, freqval: any,mval:any, dateval: any) {
    console.log()
    var crval = {
      tickleID: this.tickleID = value,
      tickleBy: this.tickleBy = byVal,
      ticklerFrequency: this.ticklerFrequency = freqval,
      ticklerMessage: this.ticklerMessage =mval,
      userDefinedDate: this.contactReminderDate = dateval,
      lastModifiedBy: this.userObj.contactID,
      lastModified: moment().format('YYYY-MM-DDTHH:MM:SS')

    }
    this.service.updateContactR(crval).subscribe(
      (res: any) => {
        this.contacteditR = res;
        this.saveContact();
        this.ngOnInit();
        this.toastr.success('Edited Contact Reminder!');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Failed to update contact reminder.', 'Time update failed.')
        else
          console.log(err);
      });

    console.log(crval)
  }
  updateBuildingReminder(value: any, byVal: any, freqval: any,mval:any, dateval: any) {
    console.log()
    var brval = {
      tickleID: this.tickleID = value,
      tickleBy: this.tickleBy = byVal,
      ticklerFreq: this.ticklerFrequency = freqval,
      ticklerMessage: this.ticklerMessage = mval,
      userDefinedDate: this.contactReminderDate = dateval,
      lastModifiedBy: this.userObj.contactID,
      lastModified: moment().format('YYYY-MM-DDTHH:MM:SS')

    }
    this.service.updateBuildingR(brval).subscribe(
      (res: any) => {
        this.contacteditR = res;
        this.saveBuidling();
        this.ngOnInit();
        this.toastr.success('Edited Building Reminder!');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Failed to update building reminder.', 'Time update failed.')
        else
          console.log(err);
      });

    console.log(brval)
  }
  updateLeaseReminder(value: any, byVal: any, freqval: any,mval:any, dateval: any) {
    console.log()
    var lrval = {
      tickleID: this.tickleID = value,
      tickleBy: this.tickleBy = byVal,
      ticklerFrequency: this.ticklerFrequency = freqval,
      ticklerMessage: this.ticklerMessage = mval,
      userDefinedDate: this.contactReminderDate = dateval,
      lastModifiedBy: this.userObj.contactID,
      lastModified: moment().format('YYYY-MM-DDTHH:MM:SS')

    }
    this.service.updateLeaseR(lrval).subscribe(
      (res: any) => {
        this.contacteditR = res;
        this.saveLease();
        this.ngOnInit();
        this.toastr.success('Edited Lease Reminder!');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Failed to update lease reminder.', 'Time update failed.')
        else
          console.log(err);
      });

    console.log(lrval)
  }

  updateProjectReminder(value: any, byVal: any, freqval: any,mval:any, dateval: any) {
    console.log()
    var prval = {
      tickleID: this.tickleID = value,
      tickleBy: this.tickleBy = byVal,
      ticklerFrequency: this.ticklerFrequency = freqval,
      ticklerMessage: this.ticklerMessage = mval,
      userDefinedDate: this.contactReminderDate = dateval,
      lastModifiedBy: this.userObj.contactID,
      lastModified: moment().format('YYYY-MM-DDTHH:MM:SS')

    }
    this.service.updateProjectR(prval).subscribe(
      (res: any) => {
        this.contacteditR = res;
        this.saveProjects();
        this.ngOnInit();
        this.toastr.success('Edited Project Reminder!');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Failed to update project reminder.', 'Time update failed.')
        else
          console.log(err);
      });

    console.log(prval)
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


    // this.service.getPH().subscribe(data => {
    //   this.allprojects = data;
    //   this.allprojects = this.allleases.filter((obj: any) => obj.companyID === this.userObj.companyID)
    //   this.projectName = this.allleases.map((obj: any) => obj.leaseName)
    //   console.log("projectname", this.projectName)
    //   if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType.length !== 0) {
    //     for (let j = 0; j < this.selectedHierarchy.length; j++) {
    //       for (let i = 0; i < this.allprojects.length; i++) {
    //         // console.log("building hierarchy", this.buildingHierearchy)
    //         if (this.selectedHierarchy[j] === this.allprojects[i].hierarchy) {
    //           this.projectName[i] = this.allprojects[i].leaseName;
    //           this.listoprojects.push(this.projectName[i]);
    //           let projectsetOfValue: any = new Set(this.listoprojects)
    //           //   //distinct building name values from array
    //           let uniqueprojectValues = [...projetcsetOfValue]
    //           this.leaseName = uniqueprojectValues;
    //         }
    //         else {
    //           this.projectName = []
    //         }

    //       }
    //     }
    //   }
    // })

    this.service.getContactReminders().subscribe(data => {
      this.contactReminders = data;
      this.contactReminders = this.contactReminders.filter((obj: any) => obj.isDeleted === false && obj.contactID === this.userObj.contactID)
      for (let i = 0; i < this.contactReminders.length; i++) {
        // this.contactReminders[i].userDefinedDate = new Date(this.contactReminders[i].userDefinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
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
      console.log("companyname:", this.companyname)
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
      console.log("building:", this.buildingreminders)
      for (let i = 0; i < this.buildingreminders.length; i++) {
        //this.buildingreminders[i].startDate = new Date(this.buildingreminders[i].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },);
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
      console.log("lease:",this.leasereminders)
      for (let i = 0; i < this.leasereminders.length; i++) {
        for (let j = 0; j < this.userObj.length; j++) {

          if (this.leasereminders[i].isDeleted !== false) {

          }
        }
      }
    })


    this.service.getProjectReminders().subscribe(data => {
      this.projectReminders = data;

      this.projectrowtotal = this.projectReminders.length;
      this.projectReminders = this.projectReminders.filter((obj: any) => { return obj.isDeleted == false && obj.contactID == this.userObj.contactID })
      console.log("Project:", this.projectReminders)
      for (let i = 0; i < this.projectReminders.length; i++) {
        for (let j = 0; j < this.userObj.length; j++) {

          if (this.projectReminders[i].isDeleted !== false) {

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
    //if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType == "Project - Reminder") {
    //  this.listobuildings = []
    //  this.showBuildingDrop = false;
    //   this.showLeaseDrop = true;
    //  this.ngOnInit()
    //   }
    // if (this.selectedHierarchy.length > 0 && this.selectedHierarchy.length < 2 && this.selectedOptionType == "Report- Reminder") {
    //  this.listobuildings = []
    //  this.showBuildingDrop = false;
    //   this.showLeaseDrop = true;
    //   this.ngOnInit()

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
  changeProject(val: any) {
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

    if (this.selectedOptionType.length > 0 && this.selectedOptionType != "Lease - Reminder") {
      this.showCompanyDrop = false;
      this.selectedBuilding = [];
      this.showBuildingDrop = false;
      this.showLeaseDrop = false;
      this.selectedCompany = [];
    }

    if (this.selectedHierarchy.length == 1 && this.selectedOptionType == "Building - Reminder") {
      this.ngOnInit()
      this.showBuildingDrop = true;
      this.showLeaseDrop = false;
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


        if (this.reminderobj[i].optionType == "Project - Reminder") {
          for (let j = 0; j < this.projectReminders.length; j++) {
            for (let k = 0; k < this.reminderobj[i].hierarchy.length; k++) {
              if (this.reminderobj[i].hierarchy[k] == this.allprojects[j].hierarchy) {
                var rval = {
                  tickleBy: this.Frequency,
                  ticklerFrequency: this.Frequency,
                  contactID: this.userObj.contactID,
                  ticklerMessage: this.Message,
                  ticklerTypeID: 6,
                  objectID: this.projectReminders[j].objectID,
                  objectTypeID: 2,
                  ticklerDaysOut: this.reminderobj[i].daysOut,
                  userDefinedDate: this.userdefineddate,
                  isDeleted: false,
                  LastModifiedBy: this.userObj.contactID,
                  LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
                }
                console.log("CONTACT: ", rval)

                this.service.addReminder(rval).subscribe(
                  (res: any) => {
                    this.AddReminderVal = res;
                    this.ngOnInit();
                    this.toastr.success('Added Reminder for Project ID: ' + this.allprojects[j].projectID)
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


        // if (this.reminderobj[i].optionType == "Report - Reminder") {
        //   for (let j = 0; j < this.reportReminders.length; j++) {
        //     for (let k = 0; k < this.reminderobj[i].hierarchy.length; k++) {
        //       if (this.reminderobj[i].hierarchy[k] == this.allbuildings[j].hierarchy) {
        //         var rval = {
        //           tickleBy: this.Frequency,
        //           ticklerFrequency: this.Frequency,
        //           contactID: this.userObj.contactID,
        //           ticklerMessage: this.Message,
        //           ticklerTypeID: 6,
        //           objectID: this.reportReminders[j].objectID,
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
        //         //     this.toastr.success('Added Reminder for Report ID: ' + this.allreports[j].reportID)
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
                    this.toastr.success('Added Reminder for Building ID: ' + this.allbuildings[j].buildingID)
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
        
        //         if (this.selectedOptionType[i] == "Project - Reminder") {
        //   for (let j = 0; j < this.allprojects.length; j++) {
        //     for (let k = 0; k < this.selectedHierarchy.length; k++) {
        //       if (this.reminderobjh[k].hierarchy == this.selectedHierarchy[k]) {
        //         if (this.alllprojects[j].hierarchy == this.selectedHierarchy[k]) {
        //           var rval = {
        //             tickleBy: this.Frequency,
        //             ticklerFrequency: this.Frequency,
        //             contactID: this.userObj.contactID,
        //             ticklerMessage: this.Message,
        //             ticklerTypeID: 2,
        //             objectID: this.allleases[j].leaseID,
        //             objectTypeID: 3,
        //             ticklerDaysOut: this.reminderobj[i].daysOut,
        //             userDefinedDate: this.userdefineddate,
        //             isDeleted: false,
        //             LastModifiedBy: this.userObj.contactID,
        //             LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
        //           }
        //           console.log("Projectrval", rval)
        //           this.service.addReminder(rval).subscribe(
        //             (res: any) => {
        //               this.AddReminderVal = res;
        //               this.ngOnInit();
        //               this.toastr.success('Added Reminder for Project ID: ' + this.allproject[j].projectName)
        //             },
        //             err => {
        //               if (err.status == 400)
        //                 this.toastr.error('Failed to update time.', 'Time update failed.')
        //               else
        //                 console.log(err);
        //             });

        //         }
        //       }
        //     }
        //   }
        // }
      
      if (this.selectedOptionType[i] == "Report - Reminder") {
        for (let j = 0; j < this.allreports.length; j++) {
          for (let k = 0; k < this.selectedHierarchy.length; k++) {
            if (this.reminderobjh[k].hierarchy == this.selectedHierarchy[k]) {
              if (this.allreports[j].hierarchy == this.selectedHierarchy[k]) {
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
                console.log("Reportrval", rval)
                this.service.addReminder(rval).subscribe(
                  (res: any) => {
                    this.AddReminderVal = res;
                    this.ngOnInit();
                    this.toastr.success('Added Reminder for Report ID: ' + this.allreports[j].reportName)
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
                    ticklerTypeID: 1,
                    objectID: this.allleases[j].leaseID,
                    objectTypeID: 4,
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
    }
  }
}
  }
}
