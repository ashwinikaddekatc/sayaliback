import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bcf_TechnologyStack } from 'src/app/models/builder/Bcf_TechnologyStack';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';

@Component({
  selector: 'app-technology-stackall',
  templateUrl: './technology-stackall.component.html',
  styleUrls: ['./technology-stackall.component.scss']
})
export class TechnologyStackallComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  bcf_technologyStack: Bcf_TechnologyStack[];
  constructor(private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute, private technologyStackService: TechnologyStackService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    //this.isLoading = true;
    this.technologyStackService.getAll().subscribe((data) => {
     // this.isLoading = false;
      console.log(data);
      this.bcf_technologyStack = data;
      if(data.length == 0){
        this.error="No data Available";
      }
      if(data.operationMessage =='Your Access is Denied Plz contact Admin'){
        this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');

       }
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToEdit(id) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
    //this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToElement(id){
    this.router.navigate(["../techstackelement/" + id], { relativeTo: this.route });

  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.technologyStackService.delete(id).subscribe(
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
}
