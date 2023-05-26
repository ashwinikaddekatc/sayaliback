import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { ExceptionRuleLibraryService } from 'src/app/services/fnd/exception-rule-library.service';

@Component({
  selector: 'app-rule-library-exceptionadd',
  templateUrl: './rule-library-exceptionadd.component.html',
  styleUrls: ['./rule-library-exceptionadd.component.scss']
})
export class RuleLibraryExceptionaddComponent implements OnInit {
  public entryForm: FormGroup;
  tech_stacks=[];
  tech_stack_key = ["aspmy", "sphmy"];
  object_types = ["form", "bi", "report"];
  sub_object_types = ["only header", "only line"];
  submitted = false;
  constructor( private _fb: FormBuilder,
    private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,
    private exceptionRuleLibraryService: ExceptionRuleLibraryService,
    private technologyStackService:TechnologyStackService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      tech_stack: ['',[Validators.required]],
      object_type: [null,[Validators.required]],
      sub_object_type: [null,[Validators.required]],
      object_name_variable: [null,[Validators.required]],
      object_name_dynamic_string: [null,[Validators.required]],
      type: [null,[Validators.required]],
      service: [null,[Validators.required]],
      path: [null,[Validators.required]],
      file_name: [null,[Validators.required]],
	    startstring: [null,[Validators.required]],
      endstring: [null,[Validators.required]],
	    replaceWith: [null,[Validators.required]],
	    linestring: [null,[Validators.required]],
	    keyword: [null,[Validators.required]],
    });

      //for dynamic tech stack
      this.technologyStackService.getAll().subscribe((data)=>{
        console.log(data)
this.tech_stacks=data;
        // for(let ts of data.items)
        // {
        //   if(ts.tech_stack==null)
        //   {
        //     return;
        //   }
        //   console.warn(ts.tech_stack);

        //   this.tech_stacks.push(ts.tech_stack)

        // }

      });
  }
  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate() {

    this.exceptionRuleLibraryService.save(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        if(data){
          this.toastr.success("Added Successfully");
        }
        this.router.navigate(["../all"], { relativeTo: this.route });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          if(error){
            this.toastr.success(" Not Added getting some error");
          }
        });

      }
    );
  }
}
