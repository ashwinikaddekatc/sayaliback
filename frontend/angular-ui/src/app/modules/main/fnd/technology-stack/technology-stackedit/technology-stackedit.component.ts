import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bcf_TechnologyStack } from 'src/app/models/builder/Bcf_TechnologyStack';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';

@Component({
  selector: 'app-technology-stackedit',
  templateUrl: './technology-stackedit.component.html',
  styleUrls: ['./technology-stackedit.component.scss']
})
export class TechnologyStackeditComponent implements OnInit {
  id: number;
  tdata:any={};
  constructor(private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute, private technologyStackService: TechnologyStackService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.technologyStackService.getById(id).subscribe((data) => {
        this.tdata = data;
        console.log(this.tdata)

      },
      (err) => {
        console.log(err);
      }
    );
  }
  public zipFile: File = null;
  onSelectFile(event) {
    //let flag = 0;
    //const mimeType = event.target.files[0].type;
    //if(mimeType.match(/zip\/*/) === null ) {
    //this.message = 'Only Image Type Is Supported';
    //flag = flag + 1;
    //return;
    //}
    const size = event.target.files[0].size;
    console.log("zip file size",size);

    //if(size > 5000000) {
    //flag = flag + 1;
    //this.message = 'Plese Select image file under 2 MB';
    //return;
    //}
    //console.log('flag value = ', flag);
    //if(flag === 0) {
    this.zipFile = <File>event.target.files[0];
    console.log("zip file name",this.zipFile);
    // read file into byte stream
    //const reader = new FileReader();
    //reader.readAsDataURL(this.zipFile);
    //reader.onload = (_event) => {
    //this.image = reader.result;
    //console.log(reader.result);
    //}
    //this.zipUpload();
  }
  onSubmit(){
this.technologyStackService.update(this.id,this.tdata).subscribe((data)=>{
  console.log(data);
  if(data){
    this.toastr.success("Updated Successfully");
  }
  this.router.navigate(["../../all"], { relativeTo: this.route });
},
(err) => {
  console.log(err);
  if(err){
    this.toastr.error("Not Updated Successfully");
  }
})
  }
}
