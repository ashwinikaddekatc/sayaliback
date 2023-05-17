import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SureOpsscriptmasterService } from 'src/app/services/admin/sure-opsscriptmaster.service';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';

@Component({
  selector: 'app-sure-opsscriptadd',
  templateUrl: './sure-opsscriptadd.component.html',
  styleUrls: ['./sure-opsscriptadd.component.scss']
})
export class SureOpsscriptaddComponent implements OnInit {
  public entryForm:FormGroup;
  tech_stacks;
  constructor(private _fb:FormBuilder,private SureOpsscriptmasterService: SureOpsscriptmasterService,
    private toastr:ToastrService,
    private router : Router,private technologyStackService: TechnologyStackService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      script_name : [null],
      description: [null],
      techstack : [null],
      version:[null],
      //script:[null],
      isactive:[null],
      script_Lines: this._fb.array([this.initLinesForm()]),
    });
    this.techstackdata();
  }
  initLinesForm() {
    return this._fb.group({
      model: ''
      //model:JSON.stringify(this.nodeField)
    });
  }
  techstackdata(){
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
this.tech_stacks=data;
    });
  }
  onSubmit(){
console.log(this.entryForm.value);
this.SureOpsscriptmasterService.create(this.entryForm.value).subscribe((data)=>{
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
