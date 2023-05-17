import { Component, OnInit } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-myfav',
  templateUrl: './myfav.component.html',
  styleUrls: ['./myfav.component.scss']
})
export class MyfavComponent implements OnInit {
  isLoading: boolean = false;
  data;
  user_id;
  constructor(private userInfoService:UserInfoService,
    private projectSetupService: ProjectSetupService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.user_id = this.userInfoService.getUserId();
    console.log('user id: ' + this.user_id);
    this.getallfavproject(this.user_id);
  }
  getallfavproject(id:any){
    this.isLoading = true;
    this.projectSetupService.getallrecentarchived(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.data = data;

    });
  }
  goToModule(id: number,name:any) {
    this.router.navigate(["../modulecard"], { relativeTo: this.route, queryParams: { p_id: id } });
  }
  goToedit(id: number) {
    this.router.navigate(["../project/edit/" + id], { relativeTo: this.route });
  }
}
