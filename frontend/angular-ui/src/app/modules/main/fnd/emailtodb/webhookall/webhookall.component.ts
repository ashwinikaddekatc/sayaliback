import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Webhookservicesui1Service } from 'src/app/services/fnd/webhookservicesui1.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-webhookall',
  templateUrl: './webhookall.component.html',
  styleUrls: ['./webhookall.component.scss']
})
export class WebhookallComponent implements OnInit {
  data: any;
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;

  constructor(private src:Webhookservicesui1Service,private route: ActivatedRoute,private router: Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }
  goToAdd1(){
    this.router.navigate(["../add"], { relativeTo: this.route });

  }


  getData() {
    this.src.getAll().subscribe(result=>{
      this.data = result;
      console.log(this.data);
      if(result.length == 0){
        this.error="No data Available";
      }
      if(result.operationMessage =='Your Access is Denied Plz contact Admin'){
        this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');

       }

     // this.projectsetup = data.items;
     // this.projectname=data.projectname;
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }


  goToEdit(id) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  // deletedata(id:any){
  //   this.src.deleteAll(id).subscribe(result=>{
  //     console.log(this.data);
  //   })
  // }
 
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id:number){
    this.modaldelete = false;
    this.src.deleteById(id).subscribe((data)=>{
      console.log(data);
      if(data){
        this.toastr.success("Data deleted Successfully");
      }
      this.getData();
    },(error)=>{
      if(error.status == 200){
        console.log(error);
        this.toastr.success("Data deleted Successfully");
        this.getData();
      }
      if(error.status == 404){
        console.log(error);
        this.toastr.error("error in deleting data")
      }
    });
  }


}
