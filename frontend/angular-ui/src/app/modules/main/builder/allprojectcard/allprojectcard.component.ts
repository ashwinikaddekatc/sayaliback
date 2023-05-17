import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IconService } from 'src/app/services/builder/icon.service';
import { ProjectSetupService } from '../../../../services/builder/project-setup.service';
@Component({
  selector: 'app-allprojectcard',
  templateUrl: './allprojectcard.component.html',
  styleUrls: ['./allprojectcard.component.scss'],
  providers: [  ProjectSetupService ]
})
export class AllprojectcardComponent implements OnInit {
  projectsetup;
  type="project";
  public entryForm: FormGroup;
  statusClass = 'not-active';
  constructor( private mainService: ProjectSetupService,
    private iconservice:IconService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,) {this.projectsetup =this.mainService.data; console.log(this.mainService.data);
   }

  ngOnInit(): void {
    this.getData();
    this.entryForm = this._fb.group({
      type: [this.type],
      objectId: [null],
    });
  }
  getData() {
    this.mainService.getallsharedwithme().subscribe((data) => {
      console.log(data);
      this.projectsetup = data;
     // this.projectsetup =data.items;
//this.projectsetup=(JSON.stringify(data.items));
console.log(this.projectsetup)
    });
  }
  gotosureboard(id:any){
    console.log(id);
    this.router.navigate(["../sureboard"],{relativeTo: this.route, queryParams: { pid: id }});
  }
  gotosureops(id){
    this.router.navigate(["../module1"],{relativeTo: this.route, queryParams: { pid: id }});
  }
  goToedit(id: number) {
    this.router.navigate(["../project/edit/" + id], { relativeTo: this.route });
  }
  goToModule(id: number,name:any) {
    this.router.navigate(["../modulecard"], { relativeTo: this.route, queryParams: { p_id: id } });
  }
  addfav(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.statusClass = 'active';
    this.iconservice.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Favourite');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not added Data Getting Some Error');
      }
    })
    let btn1 = document.getElementById('heart');
    btn1.addEventListener('click', function() {
      btn1.style.color = "red";
  });
  }
  removefav(id:any){
    console.log("in delete  "+id);
    this.iconservice.delete(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Remove Favourite');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addpin(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createpin(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Pinned');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removepin(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletepin(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed Pinned');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addstar(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createstar(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Stared');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removestar(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletestar(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed Stared');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addwatch(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createwatch(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added WatchList');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removewatch(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletewatch(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed WatchList');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addfuture(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createfuture(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Futuristic');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removefuture(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletefuture(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed Futuristic');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
}
