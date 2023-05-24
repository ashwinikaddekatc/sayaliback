import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { MenumaintanceService } from 'src/app/services/admin/menumaintance.service';
import { UsergrpmaintainceService } from 'src/app/services/admin/usergrpmaintaince.service';
import { UsermaintanceService } from '../../../../services/admin/usermaintance.service';
@Component({
  selector: 'app-menuaccesscontrol',
  templateUrl: './menuaccesscontrol.component.html',
  styleUrls: ['./menuaccesscontrol.component.scss']
})
export class MenuaccesscontrolComponent implements OnInit {
  loading = false;
  givendata;
  alldata;
  colvalue="true";
  usergrpid=40;
  secmenuaccessdata;
  modalAdd= false;
  modaledit=false;
  modaldelete=false;
  modaldelete1=false;
  rowSelected :any= {};
  public entryForm: FormGroup;
  selected = "true";
  menudata;
  menus;
  menuselectid=1;
  msg;
  error;
  mcreate;
  medit;
  mdelete;
  toggle: boolean = false;
  maindata;
  showdata;
  constructor(private mainservice:UsermaintanceService,
    private _fb: FormBuilder,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private usergrpservice:UsergrpmaintainceService,
    private menuGroupService: MenuGroupService,
    private menuservice:MenumaintanceService,) { }

  ngOnInit(): void {
    this.showdata = this.menuGroupService.getdata();
    console.log(this.showdata);
      this.mcreate=this.showdata.mcreate;
      console.log(this.mcreate);
      this.mdelete=this.showdata.mdelete
      console.log(this.mdelete);
      this.medit=this.showdata.medit
      console.log(this.medit);
    this.dropddowngetdata();
   // this.getall();
this.getbyuseriddata();

this.entryForm=this._fb.group({
  grpid:this.usergrpid ,
  gmenuid:this.menuselectid ,
  });

}
dropddowngetdata(){
  this.usergrpservice.getAll().subscribe((data) => {
    console.log(data);
    this.givendata = data;
  });
}
getdata(){
  this.menuservice.getByCurrentUserMenuGroupId1().subscribe(resp => {
    this.menus = resp;
    console.log('menus: ', this.menus);
})
}
getall(){
  this.usergrpservice.getall().subscribe((data)=>{
    this.secmenuaccessdata=data
    console.log(data);
  })
}
idofselected(val){
  console.log(val);
  this.usergrpid=val;

}
idselected(val){
  console.log(val)
  this.menuselectid=val;
}
getbyuseriddata(){
  this.usergrpservice.getbyusergrpid(this.usergrpid).subscribe((data)=>{
    this.alldata=data;
    console.log(this.alldata);
    if(this.alldata.array?.length === 0){
      this.msg='No Data Availabel'
    }
    for(this.alldata; this.alldata>=100;this.alldata++){
      this.maindata=this.alldata.menuId === 0
      console.log(this.maindata)
    }

   // console.log(this.menudata)
  },
  (error) => {
    console.log('Error in adding data...',+error);
      if(error){
        this.error="No data Available"
      }
  });
}
modaladd(){
  this.modalAdd=true;
  this.getdata();
}
onSubmit(){
  this.modalAdd=false;
  this.entryForm.value.grpid=this.usergrpid;
  this.entryForm.value.gmenuid=this.menuselectid;
  console.log(this.entryForm.value);
  this.menuservice.create2(this.entryForm.value).subscribe((data)=>{
    console.log(data);
    if (data) {
      this.toastr.success('Added successfully');
          }
    this.ngOnInit();
  },
    (error) => {
      console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not added Data Getting Some Error');
        }
    });

}
modalEdit(row){
this.rowSelected=row;
console.log(this.rowSelected);
this.modaledit=true;
}
modalDelete(row){
  this.rowSelected=row;
  console.log(this.rowSelected)
this.modaldelete=true;
}
delete(id,usrgrp){
  this.modaldelete=false;
this.usergrpservice.delete(id,usrgrp).subscribe((data)=>{
  console.log(data);
  if (data) {
    this.toastr.success('Deleted successfully');
        }
      this.ngOnInit();
},(error) => {
  console.log('Error in adding data...',+error);
    if(error){
      this.toastr.error('Not Deleted Data Getting Some Error');
    }
});
}
modaldeletemainmenu(row){
this.rowSelected=row;
console.log(this.rowSelected)
this.modaldelete1=true;
}
delete1(id,usrgrp){
  this.modaldelete1=false;
this.usergrpservice.deletemain(id,usrgrp).subscribe((data)=>{
  console.log(data);
  if (data) {
    this.toastr.success('Deleted successfully');
        }
},(error) => {
  console.log('Error in adding data...',+error);
    if(error){
      this.toastr.error('Not Deleted Data Getting Some Error');
    }
});
}
onUpdate(id:any,usrgrp:any){
  this.modaledit=false;
  console.log(id,usrgrp);
  this.menuservice.update2(id,usrgrp,this.rowSelected).subscribe((data)=>{
    console.log(data);
    if (data) {
      this.toastr.success('Updated successfully');
          }
  }, (error) => {
    console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Updated Data Getting Some Error');
      }
  });
}
onChecked(value){
  if(value=="y")
  {
   this.selected="y"
   console.log(this.selected);  // make a call for checked
  }
  else
  {
      this.selected="n"// make a call for unchecked
  }
}
changedelete(val){
  console.log(val);
  val=this.colvalue=val;
 console.log(val);
}
data:{};
Sync(id:any,row){
  this.rowSelected = row;
  console.log(id);
if(this.rowSelected.subMenus!=0){
this.rowSelected.subMenus=[]
}console.log(this.rowSelected);
this.menuservice.sink(id,this.rowSelected).subscribe((data)=>{
console.log(data);
if (data) {
  this.toastr.success('SYNC successfully');
              }
},(error) => { console.log(error);
  if(error){
    this.toastr.error('Not SYNC Data Getting Some Error');
  } })
}
toggleCheckbox() {
 this.toggle = !this.toggle;
  //this.dataService.setDivToggler(this.toggler);
}
}
