import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SureOpsscriptmasterService } from 'src/app/services/admin/sure-opsscriptmaster.service';

@Component({
  selector: 'app-sureops-scriotmaster1add',
  templateUrl: './sureops-scriotmaster1add.component.html',
  styleUrls: ['./sureops-scriotmaster1add.component.scss']
})
export class SureopsScriotmaster1addComponent implements OnInit {
public entryForm:FormGroup;
  constructor(private _fb:FormBuilder,private SureOpsscriptmasterService: SureOpsscriptmasterService,
    private toastr:ToastrService,
    private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.entryForm = this._fb.group({
      script_name : [null],
      description: [null],
      techstack : [null],
      version:[null],
      script:[null],
      isactive:[null],

    });
  }
 onSubmit(){
console.log(this.entryForm.value);
this.SureOpsscriptmasterService.create1(this.entryForm.value).subscribe((data)=>{
  console.log(data);
  this.router.navigate(["../all"],{relativeTo:this.route});
  if(data){
    this.toastr.success('Added successfully');
  }
},
(error) => {
 console.log('Error in adding data...',+error);
   if(error){
     this.toastr.error('Data Not Added Getting Some Error');
   }
});
  }
}
