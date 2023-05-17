import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';

@Component({
  selector: 'app-code-extraction-paramall',
  templateUrl: './code-extraction-paramall.component.html',
  styleUrls: ['./code-extraction-paramall.component.scss']
})
export class CodeExtractionParamallComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  codepdata;
  header_id;
  bcf_extractor;
  constructor(private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute,private codeExtractionService: CodeExtractionService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.header_id = +params['header_id'];
    });

      this.getData(this.header_id);
  }
  getData(id: number) {
    //this.isLoading=true;
    this.codeExtractionService.getCodeExtractionParams(id).subscribe(data => {
        //this.isLoading=false;
        console.log(data);
        this.codepdata = data.items;
        //this.rows = this.bcf_extractor;
        //this.temp = [...this.bcf_extractor];
    });
}
goToEdit(id) {
  this.router.navigate(["../edit/" + id], { relativeTo: this.route, queryParams: { header_id: this.header_id  }});
  //this.router.navigate(["../add"], { relativeTo: this.route });
}
onDelete(row) {
  this.rowSelected = row;
   this.modaldelete=true;
}

delete(id)
{
  this.modaldelete = false;
  console.log("in delete  "+id);
  this.codeExtractionService.delete(id).subscribe(
    (data) => {
      console.log(data);
      this.ngOnInit();
      if (data) {
        this.toastr.success('Deleted successfully');
            }
    },
    (error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Deleted Data Getting Some Error');
      }
    }
  );

}
goToEditor(id: number) {
  this.router.navigate(["../file-editor-new/"+id], {relativeTo: this.route, queryParams: { header_id: this.header_id } });
}
}
