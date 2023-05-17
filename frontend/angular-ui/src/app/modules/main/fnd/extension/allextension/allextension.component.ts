import { Component, OnInit, TemplateRef, ViewChild,ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ToastrService } from 'ngx-toastr';
import { ExtensionField } from "src/app/models/fnd/ExtensionField";
//import { Teacher } from "src/app/pages/university/teacher/Teacher";
import { ExtensionService } from "src/app/services/fnd/extension.service";
import { UserInfoService } from "src/app/services/user-info.service";

interface Rows {
  id: number;
  field_name: any;
  mapping: any;
  data_type: any;
  isActive:any;
}
@Component({
  selector: 'app-allextension',
  templateUrl: './allextension.component.html',
  styleUrls: ['./allextension.component.scss']
})
export class AllextensionComponent implements OnInit {
  @ViewChild("extById") extensionById: TemplateRef<any>;
  @ViewChild("showInGrid") txId: TemplateRef<any>;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  //@ViewChild("filter") filter: ElementRef;
  basic: boolean = false;
 // whoColumns: Teacher; // who columns data
  columns: any[];
  rows: Rows[];
  temp = [];
  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  error;
  selected: any[] = [];
  filterData: string;
  isLoading: boolean = false;
  extensionField: ExtensionField[] = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private extensionService: ExtensionService,
    private userInfoService: UserInfoService) { }

    private account_id: any;
   // private formCode: any;
    private formCode: string ='teacher_form';
    public key: string = "formCode";
    public storage: Storage = sessionStorage;
  ngOnInit(): void {
    this.account_id = this.userInfoService.getUserId();
    this.formCode = this.storage.getItem(this.key);
    console.log("[ngOnInit] acc_id: " + this.account_id + " formCode: " + this.formCode);
    this.getData();
    this.columns = [
      /* { prop: "id", name: "Actions", width: 65, cellTemplate: this.extensionById }, */
      { prop: "field_name", name: "Field Name", width: 120 },
      { prop: "mapping", name: "Mapping", width: 150 },
      { prop: "data_type", name: "Data Type", width: 190 },
      /* { prop: "id", name: "Show In Grid", width: 90, cellTemplate: this.txId } */
    ];
  }
  getData() {
    this.isLoading = true;
    //this.extensionField = new ExtensionField();
    this.extensionService.getAll().subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.extensionField = data;
      this.rows = this.extensionField;
      if(this.extensionField.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
      //this.temp = [...this.extensionField];
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }

  alertType: string;
  alertMessage: string = "";
  alert = [
    { type: "success", message: "Build Successfully" },
    { type: "danger", message: "Some error Happens" },
  ];

  buildExtension() {
    console.log("buildExtension() Account id = " + this.account_id + " Form Code = ",
      this.formCode);
    if (this.account_id === null && this.formCode === null) {
      this.alertType = this.alert[1].type;
      this.alertMessage = "form_code is null";
      return;
    }
    this.extensionService
      .buildExtension(this.account_id, this.formCode)
      .subscribe(
        (data) => {
          console.log("build successfully ", data);
          this.alert.forEach((e) => {
            if (e.type === "success") {
              this.alertType = e.type;
              this.alertMessage = e.message;
            } //data.type === true : e.message ? e.message
          });
          // go to parent entry form...
          //this.router.navigate(['../../'], { relativeTo: this.route.parent });
        },
        (err) => {
          console.log("build failed ", err);
          this.alertType = this.alert[1].type;
          this.alertMessage = this.alert[1].message;
        }
      );
  }

  isChecked(id: number) {
    return (
      this.extensionField.find(c => {
        if(c.id === id) return c.isActive;
      }) !== undefined
    );
  }

  chk(checked) {
    console.log(checked);
    return !checked;
  }

  extField: ExtensionField;
  checked: boolean;
  toggle(id: number) {
    console.log(id);
    this.extensionService.getById(id).subscribe(ext => {
      this.extField = ext;
      this.checked = ext.isActive;
      console.log('extField ', this.extField);
      console.log('checked ', this.checked);
    });
    console.log(this.extField.isActive);
    //this.extensionService.update(id,this.extField).subscribe();
  }

  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  goToWhoColumns(id: number) {
    this.basic = !this.basic;
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id){
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.extensionService.delete(id).subscribe((data) => {
        console.log(data);
        this.ngOnInit();
        if (data.body) {
          this.toastr.success('Deleted successfully');
              }
      },(error) => {
        console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not Deleted Data Getting Some Error');
        }
      }  );
      }
}
