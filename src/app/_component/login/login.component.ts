import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.logout();
  }
  login() {
    this.authService.loginForm(this.model).subscribe(response => {
      if (response.status === 200) {
        this.authService.setUser(response);
      }
    }, error => {
      console.error(error);
    });
  }

}
