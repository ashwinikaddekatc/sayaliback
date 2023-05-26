import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrIfActive } from '@clr/angular';

@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.scss']
})
export class AllprojectComponent implements OnInit {
tabname;

tools=[
  {
    tabname:"My Projects"
  },
  {
    tabname:"shareme"
  },
  {
    tabname:"Template"
  },
  {
    tabname:"myfev"
  }
];
value:boolean=false

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tabname = params['tab'];
      console.log(params);
      console.log(this.tabname);

    });
    // if (this.tabname == document.getElementsByClassName==this.tabname){
    //   this.value =true;


    // }

  }
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();

 }

isActive() {
        if (!this.value) {
            this.value = true;
            return true;
        } else {
            return false;
         }
    }
}
