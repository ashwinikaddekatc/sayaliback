import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectorMappingService } from 'src/app/services/admin/connector-mapping.service';

@Component({
  selector: 'app-edit-connector',
  templateUrl: './edit-connector.component.html',
  styleUrls: ['./edit-connector.component.scss']
})
export class EditConnectorComponent implements OnInit {

  id;
  getdata:any={};
  postdata = [];
  getApiData = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private connectorService: ConnectorMappingService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);

  }
  name;
  getById(id: number) {
    this.connectorService.getById(id).subscribe((data)=>{
      console.log("Data By id ",data);
      this.getdata = data;
      this.name = this.getdata.name;
      console.log(this.name);
      this.postdata = JSON.parse(this.getdata.connector_json);
      console.log(this.postdata);
    },
    (error)=>{
      console.log(error);
    });
  }

  onUpdate()
  {
      console.log("Update method");
      console.log(this.id,this.getdata);
      this.getdata.connector_json = JSON.stringify(this.postdata);
      console.log(this.getdata);
      this.connectorService.update(this.id,this.getdata).subscribe((data)=>{
        console.log("Updated data ",data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
        if (data) {
          this.toastr.success('Updated successfully');
        }
      },(error)=>{
        if(error){
          this.toastr.error('Data Not Updated Getting Some Error');
        }
      });
  }
}
