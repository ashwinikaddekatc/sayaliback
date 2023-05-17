import { Component, OnInit } from '@angular/core';
import { ModulesetupService } from '../../../../services/builder/modulesetup.service';
import {LoginService} from '../../../../services/api/login.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-allrepo',
  templateUrl: './allrepo.component.html',
  styleUrls: ['./allrepo.component.scss']
})
export class AllrepoComponent implements OnInit {
  isLoading: boolean = false;
  repo;
  user_id;
  constructor(private moduleSetupService: ModulesetupService,
    private loginservice: LoginService,
    private userInfoService:UserInfoService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.user_id = this.userInfoService.getUserId();
    console.log('user id: ' + this.user_id);
    this.getallrepo(this.user_id);
  }
  getallrepo(id: number) {
    this.isLoading = true;
    this.moduleSetupService.getByallrepouserId(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.repo = data;

    });
  }
  goToAction(id: number) {
    this.router.navigate(["../actions"], { relativeTo: this.route, queryParams: { m_id: id } });
  }

  goToedit(id: number) {
    this.router.navigate(["../project/modules/edit/" + id], { relativeTo: this.route });
  }
}
