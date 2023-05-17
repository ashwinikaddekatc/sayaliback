import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { BugtrackerService } from 'src/app/services/fnd/bugtracker.service';

@Component({
  selector: 'app-bugall',
  templateUrl: './bugall.component.html',
  styleUrls: ['./bugall.component.scss']
})
export class BugallComponent implements OnInit {

  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
 data;

  constructor(private bugservice:BugtrackerService,private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getall();

  }
  getall(){
    this.bugservice.getall().subscribe((data)=>{
      console.log(data);
      this.data=data;
      if(data== 0){
        this.error="No data Available";
      }

    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });

  }

  goToAdd(){
    this.router.navigate(["../bugadd"], { relativeTo: this.route });
  }
  goToEdit(id:number){
    this.router.navigate(["../bugedit/" +id],{ relativeTo: this.route});
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id){
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.bugservice.delete(id).subscribe(
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
            this.toastr.error('Not deleted Data Getting Some Error');
          }
      });
  }

  onExport(){

  }

}
