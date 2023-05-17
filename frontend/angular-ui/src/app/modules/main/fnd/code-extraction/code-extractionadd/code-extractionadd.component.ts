import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';

@Component({
  selector: 'app-code-extractionadd',
  templateUrl: './code-extractionadd.component.html',
  styleUrls: ['./code-extractionadd.component.scss']
})
export class CodeExtractionaddComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  tech_stacks=[] ;

  object_types = ['form', 'bi', 'report', 'api'];
  sub_object_types = ['only header', 'only line', 'header line', 'header multiline', 'wrokflow', 'setup', 'std report', 'bi report', 'rest api'];
  constructor(private _fb: FormBuilder, private codeExtractionServie: CodeExtractionService,
    private techstackservice:TechnologyStackService,private router: Router,
    private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      tech_stack: ['',[Validators.required]],
      tech_stack_key: ['',[Validators.required]],
      object_type: ['',[Validators.required]],
      sub_object_type: ['',[Validators.required]],
      form_type_name: ['',[Validators.required]],
      std_wf_name: ['',[Validators.required]],
      icon_file_name: [null],
      service:['',[Validators.required]],
    });
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
  }
  public zipFile: File = null;
  onSelectFile(event) {

    const size = event.target.files[0].size;

      this.zipFile = <File> event.target.files[0];
      console.log(this.zipFile);

    }
    onSubmit() {
      //console.log(this.entryForm.value);
      this.submitted = true;
      // if (this.entryForm.invalid) {
      //   return;
      // }
      this.onCreate();
    }

     onCreate() {
       let bcf_extractor = JSON.stringify(this.entryForm.value);
       console.log(bcf_extractor);
       /* this.codeExtractionServie.create(bcf_extractor).subscribe(res => {
         console.log(res);
        }, err => {console.log(err);}
       ); */
       const formData = new FormData();
       //formData.append('bcf_extractor', JSON.stringify(bcf_extractor));
       formData.append('bcf_extractor', bcf_extractor);
       formData.append('file', this.zipFile, this.zipFile.name);
console.log(formData);
       this.codeExtractionServie.saveFormAndUploadFile(formData).subscribe(res => {
         console.log(res);
         if (res.body) {
          this.toastr.success('Added successfully');
              }
         this.router.navigate(['../all'], {relativeTo: this.route});
       }, err => {console.log(err);
        if(err){
          this.toastr.error('Not added Data Getting Some Error');
        }
       });
     }


}
