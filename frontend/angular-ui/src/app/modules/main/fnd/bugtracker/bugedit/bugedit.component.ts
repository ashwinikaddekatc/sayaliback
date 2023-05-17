import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { BugtrackerService } from 'src/app/services/fnd/bugtracker.service';

@Component({
  selector: 'app-bugedit',
  templateUrl: './bugedit.component.html',
  styleUrls: ['./bugedit.component.scss']
})
export class BugeditComponent implements OnInit {
  selectedFile: File[]=[];
  projectsetup;
 er;
 id;
 iddata:any={};
  constructor(private pservice:ProjectSetupService,private bugservice:BugtrackerService,
    private toastr: ToastrService,private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.getprojectdata();
  }
  getById(id:any){
    this.bugservice.getbyid(id).subscribe((data)=>{
      console.log(data);
      this.iddata=data;
    })
  }
  getprojectdata(){

    this.pservice.getallmyproject().subscribe((data) => {
      console.log(data);
      this.projectsetup = data;

      if(data.length == 0){
        this.er="No data Available";
        console.log(this.er);
      }

    },(error) => {
      console.log(error);
      if(error){
       this.er="No data Available OR server Error";
     }
    });

}
public onFileChanged(event) {
  //Select File
  console.log(event);
  this.selectedFile = event.target.files[0];

}
onSubmit(){
  console.log(this.iddata);
  this.bugservice.update(this.id,this.iddata,this.selectedFile).subscribe(
    (data) => {
      console.log(data);

      this.router.navigate(["../../bugall"], { relativeTo: this.route });
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  );
}
}
