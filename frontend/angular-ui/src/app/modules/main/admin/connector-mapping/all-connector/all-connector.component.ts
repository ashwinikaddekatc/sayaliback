import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectorMappingService } from 'src/app/services/admin/connector-mapping.service';
import * as moment from 'moment';
import { ExcelService } from 'src/app/services/excel.service';
import {ClrDatagridSortOrder} from '@clr/angular';

@Component({
  selector: 'app-all-connector',
  templateUrl: './all-connector.component.html',
  styleUrls: ['./all-connector.component.scss']
})
export class AllConnectorComponent implements OnInit {

  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  data;
  error;
  selected: any[] = [];
  descSort;
  constructor(
    private connectorService: ConnectorMappingService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private excel: ExcelService,
  ) { }

  ngOnInit(): void {
    this.connectorService.getAll().subscribe((data)=>{
      console.log("connector table ",data);
      this.data = data;
      if(this.data.length==0){
        this.error="No data Available plz add if Required";
        console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    });
    this.descSort = ClrDatagridSortOrder.DESC;
  }

  addConnector()
  {
      this.router.navigate(["../add"],{relativeTo:this.route});
  }
  goToEdit(id: number)
  {
    this.router.navigate(["../edit/" + id], {relativeTo: this.route });
  }
  onExport()
  {
    this.excel.exportAsExcelFile(this.data, 'user_',
    moment().format('YYYYMMDD_HHmmss'))
  }
  onDelete(row) {
    this.rowSelected = row;
    console.log("open modal for delete",this.rowSelected);
     this.modaldelete=true;
  }
  delete(id){
      this.modaldelete = false;
      console.log("in delete  "+id);
      this.connectorService.delete(id).subscribe((data) => {
          console.log(data);
          this.ngOnInit();
          if (data) {
            this.toastr.success('Deleted successfully');
                }
        },(error) => {
          console.log('Error in deleting  data...',+error);
          if(error){
            this.toastr.error('Not Deleted Data Getting Some Error');
          }
        } );
    }
}
