import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bcf_Exception_Rule_Library } from 'src/app/models/fnd/Bcf_Exception_Rule_Library ';
import { ExceptionRuleLibraryService } from 'src/app/services/fnd/exception-rule-library.service';

@Component({
  selector: 'app-rule-library-exceptionall',
  templateUrl: './rule-library-exceptionall.component.html',
  styleUrls: ['./rule-library-exceptionall.component.scss']
})
export class RuleLibraryExceptionallComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  exceptionRuleLibrary;
  constructor(private exceptionRuleLibraryService: ExceptionRuleLibraryService,
    private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
   // this.isLoading = true;
    this.exceptionRuleLibraryService.getAll().subscribe((data) => {
     // this.isLoading = false;
      console.log(data);
      //console.log(data.items);
      this.exceptionRuleLibrary = data;
      if(this.exceptionRuleLibrary.length == 0){
        this.error="No data Available";
      }
      // if(data.operationMessage =='Your Access is Denied Plz contact Admin'){
      //   this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');
      //  }
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }
  goToAdd(){
    this.router.navigate(["../add"], { relativeTo: this.route });

  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id:number){
    this.modaldelete = false;
    this.exceptionRuleLibraryService.delete(id).subscribe((data)=>{
      console.log(data);
      if(data){
        this.toastr.success("Data deleted Successfully");
      }
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
