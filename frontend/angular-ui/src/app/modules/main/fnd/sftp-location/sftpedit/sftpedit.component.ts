import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SftplocationService } from 'src/app/services/fnd/sftplocation.service';


@Component({
  selector: 'app-sftpedit',
  templateUrl: './sftpedit.component.html',
  styleUrls: ['./sftpedit.component.scss']
})
export class SftpeditComponent implements OnInit {
id;
sftpdata;
  constructor( private _fb: FormBuilder,
    private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,
    private sftpService:SftplocationService) { }
    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"];
      console.log("update with id = ", this.id);
      this.getById(this.id);
    }
    getById(id){
      this.sftpService.getSftpDataById(id).subscribe((data)=>{
        console.log(data);
        this.sftpdata = data;
      });
    }
  
    onSubmit(){
      this.sftpService.updateSftpData(this.id, this.sftpdata).subscribe((data)=>{
        console.log(data);
        if(data){
          this.toastr.success("Update Successfully");
        }
        this.router.navigate(["../../all"], { relativeTo: this.route });
      },(error)=>{
        if(error.status == 200){
          console.log(error);
          this.toastr.success("Data Update Successfully");
          this.router.navigate(["../../all"], { relativeTo: this.route });
        }
        if(error.status == 404){
          console.log(error);
          this.toastr.error("error in Update data")
          this.router.navigate(["../../all"], { relativeTo: this.route });
        }
      });
    }

}
