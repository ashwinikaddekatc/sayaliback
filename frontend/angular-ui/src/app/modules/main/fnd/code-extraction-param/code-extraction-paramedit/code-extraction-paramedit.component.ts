import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bcf_Extractor_Params } from 'src/app/models/fnd/Bcf_Extractor_Params';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';

@Component({
  selector: 'app-code-extraction-paramedit',
  templateUrl: './code-extraction-paramedit.component.html',
  styleUrls: ['./code-extraction-paramedit.component.scss']
})
export class CodeExtractionParameditComponent implements OnInit {
  tech_stacks = [];
  tech_stack_key = ['aspmy', 'sphmy'];
  object_types = ['form', 'bi', 'report'];
  sub_object_types = ['only header', 'only line'];

  updated = false;
  bcf_Extractor_param: Bcf_Extractor_Params;
  header_id: number;
  id: number;
  constructor(private router: Router,
    private route: ActivatedRoute,private toastr: ToastrService,
    private codeExtractionService: CodeExtractionService,
    private techstackservice:TechnologyStackService) { }

  ngOnInit(): void {
     // path variable
     this.id = this.route.snapshot.params["id"];
     console.log(this.id);
     // query param
     this.route.queryParams.subscribe((params) => {
       this.header_id = +params["header_id"];
       console.log(this.header_id)
     });
     this.bcf_Extractor_param = new Bcf_Extractor_Params();
     this.getById(this.id);

     this.techstackservice.getAll().subscribe((data)=>{

       console.log(data)
this.tech_stacks=data;
      //  for(let ts of data.items)
      //  {
      //    if(ts.tech_stack==null)
      //    {
      //      return;
      //    }
      //    console.warn(ts.tech_stack);

      //    this.tech_stacks.push(ts.tech_stack)

      //  }
     });
  }
  getById(id: number) {
    this.codeExtractionService.getCodeExtractionParamById(id).subscribe((data) => {
      console.log(data);
      this.bcf_Extractor_param = data;
    });
  }
  onSubmit() {
    this.updated = true;
    this.update();
  }
  update() {
    this.codeExtractionService.updatecodeparam(this.id,this.bcf_Extractor_param).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.toastr.success('Updated successfully');
              }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        if (error) {
          this.toastr.error(' Not Updated successfully');
              }
      }
    );

    this.router.navigate(["/cns-portal/code-extraction/params"], {relativeTo: this.route, queryParams: { header_id: this.header_id } });
   // this.bcf_Extractor_param = new Bcf_Extractor_Params();
  }
}
