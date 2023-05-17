import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';

@Component({
  selector: 'app-code-extractionedit',
  templateUrl: './code-extractionedit.component.html',
  styleUrls: ['./code-extractionedit.component.scss']
})
export class CodeExtractioneditComponent implements OnInit {
  tech_stacks=[] ;
id;
tdata:any={};
  object_types = ['form', 'bi', 'report', 'api'];
  sub_object_types = ['only header', 'only line', 'header line', 'header multiline', 'wrokflow', 'setup', 'std report', 'bi report', 'rest api'];
  constructor(private codeExtractionServie: CodeExtractionService, private techstackservice:TechnologyStackService,
    private router: Router,
    private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);

    this.techstackservice.getAll().subscribe((data)=>{

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

    this.getById(this.id);
  }
  getById(id: number) {
    this.codeExtractionServie.getById(id).subscribe((data) => {
        this.tdata = data;
        console.log(this.tdata)

      },
      (err) => {
        console.log(err);
      }
    );
  }
  public zipFile: File = null;
  onSelectFile(event) {

    const size = event.target.files[0].size;

      this.zipFile = <File> event.target.files[0];
      console.log(this.zipFile);

    }
    onSubmit(){
this.codeExtractionServie.update(this.id,this.tdata).subscribe((data)=>{
  console.log(data);
  if (data) {
    this.toastr.success('Updated successfully');
        }
   this.router.navigate(['../../all'], {relativeTo: this.route});
 }, err => {console.log(err);
  if(err){
    this.toastr.error('Not added Data Getting Some Error');
  }
 });
    }
}
