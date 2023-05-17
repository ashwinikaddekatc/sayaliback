import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewwebhookService } from 'src/app/services/fnd/newwebhook.service';

@Component({
  selector: 'app-webhook1',
  templateUrl: './webhook1.component.html',
  styleUrls: ['./webhook1.component.scss']
})
export class Webhook1Component implements OnInit {
  id;
  webData;
  constructor(private router:Router, private route:ActivatedRoute,
    private toastr:ToastrService,private webhookService:NewwebhookService){


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id){
    this.webhookService.getDetailsById(id).subscribe((data)=>{
      console.log(data);
      this.webData = data;
    });
  }

  onSubmit(){
    this.webhookService.updateData(this.id, this.webData).subscribe((data)=>{
      console.log(data);
      if(data){
        this.toastr.success("Update Successfully");
      }
      this.router.navigate(["../../all"], { relativeTo: this.route });
    },(error)=>{
      if(error.status == 200){
        console.log(error);
        this.toastr.success("Data Update Successfully");
        this.router.navigate(["../../all"], { relativeTo: this.route });
      }
      if(error.status == 404){
        console.log(error);
        this.toastr.error("error in Update data")
        this.router.navigate(["../../all"], { relativeTo: this.route });
      }
    });
  }

  goback(){

    this.router.navigate(["../../all"], { relativeTo: this.route });
  }

//   loading = false;
//   error;
//   selected: any[] = [];
//   rowSelected :any= {};
//   modaldelete=false;
//   modaladd=false;
//   modaledit=false;
//   data;
//   selectedFile=[];
//   temdata;
//   public entryForm: FormGroup;
//   submitted = false;
//   constructor(private router: Router, private toastr: ToastrService,private _fb: FormBuilder,
//     private route: ActivatedRoute,private excel: ExcelService,private temservice:CtemplateService) { }

//   ngOnInit(): void {
//     this.getall();
//     this.getalltem();
//     this.entryForm = this._fb.group({
//       job_type:['',[Validators.required]],
//       send_to:['',[Validators.required]] ,
//       cc:['',[Validators.required]] ,
//       attachment:['',[Validators.required]],
//       gatewaydone:['',[Validators.required]],
//       template_name:['',[Validators.required]],
//       replacement_string:['',[Validators.required]],
//        });
//   }
//   getall(){
//     this.temservice.getAll1().subscribe((data)=>{
//       console.log(data);
//       this.data=data;
//       if(this.data.lenght==0){
//         this.error="No data"
//       }
//     },(error) => {
//       console.log(error);
//       if(error){
//        this.error="No data Available OR server Error";
//      }
//     })
//   }
//   getalltem(){
//     this.temservice.getAll().subscribe((data)=>{
//       console.log(data);
//       this.temdata=data;
//     })
//   }
//   public onFileChanged(event) {
//     //Select File
//     console.log(event);
//     this.selectedFile = event.target.files[0];
//   }
//   onSubmit(){
//     this.submitted = true;
//     if (this.entryForm.invalid) {
//       return;
//     }
//     console.log(this.entryForm.value);
//     this.temservice.create1(this.entryForm.value,this.selectedFile).subscribe((data)=>{
//       console.log(data);

//     },
//     (error) => {
//     console.log('Error in adding data...',+error);
//     if(error){
//       this.toastr.error('Not added Data Getting Some Error');
//     }

//     });
//     this.modaladd=false;
//   }
//   goToAdd(){
//     this.modaladd=true;

//   }

//   onExport() {
//     this.excel.exportAsExcelFile(this.data, 'user_',
//       moment().format('YYYYMMDD_HHmmss'))
//   }

//   goToEdit(row) {
//     this.rowSelected = row;
//     console.log(row)
//     this.modaledit=true;
//   }
//   onDelete(row) {
//     this.rowSelected = row;
//     this.modaldelete=true;
//   }

//   delete(id)
//   {
//     this.modaldelete = false;
//     console.log("in delete  "+id);
//     this.temservice.delete1(id).subscribe((data)=>{
//       console.log(data);
//       if (data) {
//         this.toastr.success('Deleted successfully');
//             }
//     },
//     (error) => {
//       console.log('Error in adding data...',+error);
//       if(error){
//         this.toastr.error('Not Deleted Data Getting Some Error');
//       }
//     });

//   }
//   onUpdate(id){
//     this.modaledit=false;
// this.temservice.update1(id,this.rowSelected,this.selectedFile).subscribe((data)=>{
// console.log(data);
// if (data) {
//   this.toastr.success('Updated successfully');
//       }
// },
// (error) => {
// console.log('Error in adding data...',+error);
// if(error){
//   this.toastr.error('Not updated Data Getting Some Error');
// }
// });
//   }
}

