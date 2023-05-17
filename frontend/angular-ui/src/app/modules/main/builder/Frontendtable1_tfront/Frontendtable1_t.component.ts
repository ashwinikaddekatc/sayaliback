import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/alert.service';
import { Frontendtable1_tservice} from './Frontendtable1_t.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-Frontendtable1_t',
  templateUrl: './Frontendtable1_t.component.html',
  styleUrls: ['./Frontendtable1_t.component.scss']
})

export class Frontendtable1_tComponent implements OnInit {
  rowSelected :any= {};
  modaldelete=false;
  modalEdit=false;
  modalAdd= false;
  public entryForm: FormGroup;
  loading = false;
  product;
  modalOpenedforNewLine = false;
  newLine:any;
  // entity_name:EntityBuild[];
 selected: any[] = []; constructor(private router: Router,
  private route: ActivatedRoute,
    private mainService:Frontendtable1_tservice,
    private alertService: AlertService,
    private toastr: ToastrService,
    private _fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.getData();
    this.entryForm = this._fb.group({
      table_name:[null],
      // data_type:[null],
      // name:[null],
      entity_name: this._fb.array([this.initLinesForm()]),

    });
  }
  initLinesForm()
  {
    return this._fb.group({
      data_type:[null],
      name:[null],
      //attachmentId: [null],

    })
  }
  getData() {
    this.mainService.getAll().subscribe((data) => {
      console.log(data);
      this.product = data;
     
    });
  }
  onEdit(row) {
    this.rowSelected = row;
    this.modalEdit = true;
  }
   onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.mainService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
  if (data) {				      this.toastr.success('Deleted successfully');      }
    });
  }
    onUpdate(id) {
      this.modalEdit = false;
         //console.log("in update");
      console.log("id  "+id);
      console.log( this.rowSelected );
      //console.log("out update");
      this.mainService.update(id,this.rowSelected).subscribe(
        (data) => {
          console.log(data);
        },
      );
      if (id) {
        this.toastr.success('Updated successfully');
              }
  }
  goToAdd(row) {
this.modalAdd = true;
  }
onSubmit() {
  console.log(this.entryForm.value);
  if (this.entryForm.invalid) {
    return;
  }
  this.onCreate();
}
onCreate() {
     this.modalAdd=false;
  this.mainService.createProject(this.entryForm.value).subscribe(
    (data) => {
      console.log(data);
      this.ngOnInit();
      if (this.entryForm.value) {
        this.toastr.success('Added successfully');
      }
    },(error)=>{
      console.log(error);
    },
  );
}

goToForm(name){
  this.router.navigate(['/cns-portal/', name]);
}

get controls(){
  return (this.entryForm.get("entity_name") as FormArray).controls;
}
onAddLines() {
  (<FormArray>this.entryForm.get("entity_name")).push(this.initLinesForm());
}
onRemoveLines(index: number) {
  (<FormArray>this.entryForm.get("entity_name")).removeAt(index);
}
}