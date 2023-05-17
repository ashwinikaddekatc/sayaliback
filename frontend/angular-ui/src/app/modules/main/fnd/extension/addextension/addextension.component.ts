import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtensionService } from 'src/app/services/fnd/extension.service';
@Component({
  selector: 'app-addextension',
  templateUrl: './addextension.component.html',
  styleUrls: ['./addextension.component.scss']
})
export class AddextensionComponent implements OnInit {
  public extFieldForm: FormGroup;
  submitted = false;
  basic:boolean = true;

  isActive: boolean = true;

  formCode: string;
   // GET FORM_CODE FROM SESSION
   public key:string="formCode";
   public storage:Storage = sessionStorage;

  types:string[] = ['header', 'line'];
  lookup_values: string[] = []; // come from server
  lookups: string[] =[
    'extn1', 'extn2', 'extn3', 'extn4', 'extn5',
    'extn6', 'extn7', 'extn8', 'extn9', 'extn10',
    'extn11', 'extn12', 'extn13', 'extn14', 'extn15'
    ];
  datatype_values: string[] = []; // come from server
  datatypes: string[] = ['textfield', 'longtext', 'date', 'checkbox', 'radiobutton', 'autocomplete'];
  constructor( private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private extensionService: ExtensionService,) { }

  ngOnInit(): void {
    this.formCode = this.storage.getItem(this.key);
    console.log('form_code in ext : ', this.formCode);

    this.extFieldForm = this._fb.group({
      type: [null, [Validators.required]], // HO
      field_name: [null, [Validators.required]], // label name
      mapping: [null, [Validators.required]], // ext1
      data_type: [null, [Validators.required]], // txt, datw
      form_code: [this.formCode], // should come from session
      isActive: [this.isActive]
    });
  }
  getLookupValues() {
    this.extensionService.getLookupValues().subscribe(data => {
      console.log('Lookup: ',data);
      this.lookup_values = data;
    });
  }

  getDataTypeValues() {
    this.extensionService.getDataTypeValues().subscribe(data => {
      console.log('data_type: ', data);
      this.datatype_values = data;
    });
  }

  onSubmit() {
    console.log(this.extFieldForm.value);
    this.basic = !this.basic;
    this.submitted = true;
    if (this.extFieldForm.invalid) {
      return;
    }
    this.onCreate();
    //this.router.navigate(["../all"], { relativeTo: this.route });
  }

  onCreate() {
    this.extensionService.create(this.extFieldForm.value).subscribe(
      (data) => {
        console.log('data save successfully', data);
        this.router.navigate(["../all"], { relativeTo: this.route });
        //this.router.navigate(['all'], { relativeTo: this.route.parent });
      },
      (error) => {
        console.log(error);
        this.router.navigate(['../add'], { relativeTo: this.route.parent });
      }
    );
  }

  close() {
    this.basic = !this.basic;
    this.router.navigate(["../all"], { relativeTo: this.route });
  }

}
