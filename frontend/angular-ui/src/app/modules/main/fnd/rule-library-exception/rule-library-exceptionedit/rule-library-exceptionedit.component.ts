import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { ExceptionRuleLibraryService } from 'src/app/services/fnd/exception-rule-library.service';

@Component({
  selector: 'app-rule-library-exceptionedit',
  templateUrl: './rule-library-exceptionedit.component.html',
  styleUrls: ['./rule-library-exceptionedit.component.scss']
})
export class RuleLibraryExceptioneditComponent implements OnInit {
  tech_stacks=[];
  tech_stack_key = ["aspmy", "sphmy"];
  object_types = ["form", "bi", "report"];
  sub_object_types = ["only header", "only line"];
  id;
  ruleData: any = {}
  constructor(private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,private exceptionRuleLibraryService: ExceptionRuleLibraryService,
    private technologyStackService:TechnologyStackService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
      this.tech_stacks=data;
    });
  }
  getById(id){
    this.exceptionRuleLibraryService.getById(id).subscribe((data)=>{
      console.log(data);
      this.ruleData = data;
    });
  }

  onSubmit(){
    this.exceptionRuleLibraryService.update(this.id, this.ruleData).subscribe((data)=>{
      console.log(data);
      if(data){
        this.toastr.success("Update Successfully");
      }
      this.router.navigate(["../../all"], { relativeTo: this.route });
    },(error)=>{
      console.log(error)
      if(error){
        console.log(error);
        this.toastr.error("update not successful");
      }
    });
  }
}
