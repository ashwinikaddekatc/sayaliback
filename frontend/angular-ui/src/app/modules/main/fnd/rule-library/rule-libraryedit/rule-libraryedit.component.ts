import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { RuleLibraryService } from 'src/app/services/fnd/rule-library.service';

@Component({
  selector: 'app-rule-libraryedit',
  templateUrl: './rule-libraryedit.component.html',
  styleUrls: ['./rule-libraryedit.component.scss']
})
export class RuleLibraryeditComponent implements OnInit {
  tech_stack_key = ['aspmy', 'sphmy'];
  // tech_stacks = ['SpringMVC-Hibernate-Mysql', 'Angular-SpringBoot-Mysql', 'React-ReactNative-Mysql', 'React-ReactNative-MongoDB', 'Angular-SpringBoot-MongoDB', 'Php-Laravel-Mysql', 'MEAN'];
  object_types = ['form', 'bi', 'report', 'api'];
  sub_object_types = ['only header', 'only line', 'header line', 'header multiline', 'wrokflow', 'setup', 'std report', 'bi report', 'rest api'];
tech_stacks=[];
id;
ruledata:any={};
selected = "true";
  constructor(private router: Router,
    private toastr: ToastrService, private technologyStackService:TechnologyStackService,
    private route: ActivatedRoute,private ruleLibraryService: RuleLibraryService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
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
  getById(id){
this.ruleLibraryService.getById(id).subscribe((data)=>{
  console.log(data);
 this.ruledata=data;
 console.log(this.ruledata);
})
  }

  onChecked(value){
    if(value=="y")
    {
     this.selected="y"
     console.log(this.selected);  // make a call for checked
    }
    else
    {
        this.selected="n"// make a call for unchecked
    }
  }
  onSubmit(){
this.ruleLibraryService.update(this.id,this.ruledata).subscribe((data)=>{
  console.groupCollapsed(data);
  if(data){
    this.toastr.success("Updated Successfully");
  }
  this.router.navigate(["../../all"], { relativeTo: this.route });
},(error) => {
  console.log(error);

    if(error){
      this.toastr.error("Not added getting error");
    }


})
  }
}
