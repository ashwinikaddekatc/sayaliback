import { Component, OnInit } from '@angular/core';
import {MenumaintanceService} from '../../../../services/admin/menumaintance.service';
import { Rn_Main_Menu } from '../../../../models/builder/Rn_Main_Menu';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {
  loading = false;
  modalAdd= false;
  modaledit=false;
  modaldelete=false;
  selected: any[] = [];
  rowSelected :any= {};
  givendata;
  menus: Rn_Main_Menu[];
  sub;
  id;
  mainid;
  submitted=false;
  public entryForm: FormGroup;
  constructor(private menuservice:MenumaintanceService,
    private toastr:ToastrService,
    private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("project mainmenu with id = ", this.id);
    this.getById(this.id);
this.mainid=this.id
    this.entryForm = this._fb.group({
      // menuItemId:[null],
       menuId:[null],
       menuItemDesc:['',[Validators.required]] ,
       itemSeq:['',[Validators.required]] ,
       moduleName:['',[Validators.required]] ,
       status:['',[Validators.required]] ,
       main_menu_action_name:['',[Validators.required]]
       });

   // this.getdata();
  }
  getById(id:any){
    this.menuservice.getbyid(id).subscribe((data)=>{
      this.sub=data;
      console.log(this.sub)
    })
  }
  getdata(){
    this.menuservice.getByCurrentUserMenuGroupId1().subscribe(resp => {
      this.menus = resp;
       console.log('menus: ', this.menus);
  })
  }
  goToAdd() {
    this.modalAdd=true;
    }
    onSubmit(){
      this.submitted=true;
      if (this.entryForm.invalid) {
        return;
      }
      this.menuservice.create1(this.entryForm.value).subscribe((data)=>{
        console.log(data);
        if (data) {
          this.toastr.success('Added successfully');
              }
      },
      (error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not added Data Getting Some Error');
      }

      });
      this.modalAdd=false;
    }

        goToEdit(row) {
          this.rowSelected = row;
          console.log(row)
          this.modaledit=true;
          //this.router.navigate(["../edit/" + id], { relativeTo: this.route });
        }
        onDelete(row) {
          this.rowSelected = row;
           this.modaldelete=true;
        }

        delete(id)
        {
          this.modaldelete = false;
          console.log("in delete  "+id);
          this.menuservice.delete1(id).subscribe((data)=>{
            console.log(data);
            if (data) {
              this.toastr.success('Deleted successfully');
                  }
          },
          (error) => {
            console.log('Error in adding data...',+error);
            if(error){
              this.toastr.error('Not Deleted Data Getting Some Error');
            }
          });

        }
        onUpdate(id){
          this.modaledit=false;
    this.menuservice.update1(id,this.rowSelected).subscribe((data)=>{
      console.log(data);
      if (data) {
        this.toastr.success('Updated successfully');
            }
    },
    (error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not updated Data Getting Some Error');
      }
    });
        }
}
