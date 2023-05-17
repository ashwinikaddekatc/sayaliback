import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';

@Component({
  selector: 'app-code-extractionall',
  templateUrl: './code-extractionall.component.html',
  styleUrls: ['./code-extractionall.component.scss']
})
export class CodeExtractionallComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  codedata;
  constructor( private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute, private codeExtractionService: CodeExtractionService,) { }

  ngOnInit(): void {
    this.getData();
  }
getData(){
  this.codeExtractionService.getAll().subscribe(data => {
      //this.isLoading=false;
      console.log(data);
      this.codedata = data.items;
     // this.rows = this.bcf_extractor;
     // this.temp = [...this.bcf_extractor];
  });
}
  goToAdd(){
    this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToParams(id: number) {
    this.router.navigate(["../params"], {relativeTo: this.route, queryParams: { header_id: id } });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  goToEditor(id: number) {
    this.router.navigate(["../file-editor"], {relativeTo: this.route, queryParams: { header_id: id } });
  }
  gotoworkflow(id:any){
    this.router.navigate(["../workflow/" + id], { relativeTo: this.route });

  }
  staticExtraction(id: number) {
    this.codeExtractionService.staticCodeExtraction(id).subscribe(res => {
      console.log(res);
      this.toastr.success(res.success.message);
    }, err => {
      console.log(err);
    });
  }
  dynamicExtraction(id: number) {
    this.codeExtractionService.dynamicCodeExtraction(id).subscribe(res => {
      console.log(res);
      this.toastr.success(res.success.message);
    }, err => {console.log(err);
    });
  }



  buildMasterBuilder(id: number) {
    this.codeExtractionService.buildMasterBuilder(id).subscribe(res => {
      console.log(res);
      this.toastr.success(res.success.message);
    }, (err) => {
      console.log(err);
      this.toastr.error(err.success.message);
    });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.codeExtractionService.delete1(id).subscribe(
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
  gotoBuilder(id: number){
    this.router.navigate(["../builderFiles"], {relativeTo: this.route, queryParams: { header_id: id } });
  }
}
