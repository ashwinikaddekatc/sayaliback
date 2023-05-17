import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';

@Component({
  selector: 'app-technology-stackadd',
  templateUrl: './technology-stackadd.component.html',
  styleUrls: ['./technology-stackadd.component.scss']
})
export class TechnologyStackaddComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;

  tech_stack_key = ["aspmy", "sphmy"];
  tech_stacks = [
    "SpringMVC-Hibernate-Mysql",
    "Angular-SpringBoot-Mysql",
    "React-ReactNative-Mysql",
    "React-ReactNative-MongoDB",
    "Angular-SpringBoot-MongoDB",
    "Php-Laravel-Mysql",
    "MEAN",
  ];
  object_types = ["form", "bi", "report", "api"];
  sub_object_types = [
    "only header",
    "only line",
    "header line",
    "header multiline",
    "wrokflow",
    "setup",
    "std report",
    "bi report",
    "rest api",
  ];

  get f() {
    return this.entryForm.controls;
  }
  setStackKey(): string {
    if (this.f.tech_stack.value === "Angular-SpringBoot-Mysql") {
      return "aspmy";
    } else if (this.f.tech_stack.value === "SpringMVC-Hibernate-Mysql") {
      return "sphmy";
    }
  }
  constructor( private _fb: FormBuilder,
    private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,
    private technologyStackService: TechnologyStackService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      tech_stack: ['',[Validators.required]],
      tech_stack_key: [null],
      tags: ['',[Validators.required]],
      base_prj_file_name: [null],
      active: [null],
      description:['',[Validators.required]],
      version:['',[Validators.required]],
      technology_elements: this._fb.array([this.initLinesForm()]),
    });
  }
  initLinesForm() {
    return this._fb.group({
      model: ''
      //model:JSON.stringify(this.nodeField)
    });
  }
  public zipFile: File = null;
  onSelectFile(event) {
    //let flag = 0;
    //const mimeType = event.target.files[0].type;
    //if(mimeType.match(/zip\/*/) === null ) {
    //this.message = 'Only Image Type Is Supported';
    //flag = flag + 1;
    //return;
    //}
    const size = event.target.files[0].size;
    console.log("zip file size",size);

    //if(size > 5000000) {
    //flag = flag + 1;
    //this.message = 'Plese Select image file under 2 MB';
    //return;
    //}
    //console.log('flag value = ', flag);
    //if(flag === 0) {
    this.zipFile = <File>event.target.files[0];
    console.log("zip file name",this.zipFile);
    // read file into byte stream
    //const reader = new FileReader();
    //reader.readAsDataURL(this.zipFile);
    //reader.onload = (_event) => {
    //this.image = reader.result;
    //console.log(reader.result);
    //}
    //this.zipUpload();
  }

  onSubmit() {
    //console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate() {
    //this.router.navigate(['../all'], {relativeTo: this.route});
    let bcf_technology_stack = JSON.stringify(this.entryForm.value);
    console.log("tech stack name:",this.entryForm.value.tech_stack);

    console.log(bcf_technology_stack);
    const formData = new FormData();
    formData.append("bcf_technology_stack", bcf_technology_stack);
   // formData.append("file", this.zipFile, this.zipFile.name); with zip send fornData
    this.technologyStackService.saveFormAndUploadFile1(this.entryForm.value).subscribe(
      (res) => {
        console.log(res);
        if(res.status==200){
          this.toastr.success("Added Successfully");
        }
        this.router.navigate(["../all"], { relativeTo: this.route });
      },
      (err) => {
        console.log(err);
        if(err){
          this.toastr.error("Not Added Successfully");
        }
      }
    );
  }
}
