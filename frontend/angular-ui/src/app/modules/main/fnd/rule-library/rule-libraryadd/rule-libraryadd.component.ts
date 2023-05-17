import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { RuleLibraryService } from 'src/app/services/fnd/rule-library.service';

@Component({
  selector: 'app-rule-libraryadd',
  templateUrl: './rule-libraryadd.component.html',
  styleUrls: ['./rule-libraryadd.component.scss']
})
export class RuleLibraryaddComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  search;
  ruleLibrary;
  //errorMsg: ValidationError[] = []; // backend validation field error message

  tech_stack_key = ['aspmy', 'sphmy'];
  // tech_stacks = ['SpringMVC-Hibernate-Mysql', 'Angular-SpringBoot-Mysql', 'React-ReactNative-Mysql', 'React-ReactNative-MongoDB', 'Angular-SpringBoot-MongoDB', 'Php-Laravel-Mysql', 'MEAN'];
  object_types = ['form', 'bi', 'report', 'api'];
  sub_object_types = ['only header', 'only line', 'header line', 'header multiline', 'wrokflow', 'setup', 'std report', 'bi report', 'rest api'];
tech_stacks=[];
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService,
    private ruleLibraryService: RuleLibraryService,
    private technologyStackService:TechnologyStackService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      tech_stack: ['',[Validators.required]],
      object_type: ['',[Validators.required]],
      sub_object_type: ['',[Validators.required]],
      version: ['',[Validators.required]],
      isactive:[''],
      keyword:['',[Validators.required]],
      service:['',[Validators.required]],
      priority:['',[Validators.required]],
     // rule_type: [null],
      //identifier_start_string: [null],
      //identifier_end_string: [null],
      replacement_string: ['',[Validators.required]],
      //file_code: [null],
     // group_id: [null],
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
    //this.errorMsg = [];
    this.ruleLibraryService.save(this.entryForm.value).subscribe((data) => {
        this.router.navigate(["../all"], { relativeTo: this.route });
        if(data){
          this.toastr.success("Added Successfully")
        }
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          if(error){
            this.toastr.error("Not added getting error");
          }
         // this.errorMsg.push({ field: k, message: v });
        });
        //console.log(this.errorMsg); // this will come from backend

      }
    );
  }

}
