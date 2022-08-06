import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataFromServer: any = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.authService.getData().subscribe(response => {
      if (response.status === 200) {
        this.dataFromServer = response['data']['rows'];
      }
    }, error => {
      this.authService.logout();
    });
  }

  logout(){
    this.authService.logout();
  }

}
