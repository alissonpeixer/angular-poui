import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

interface LoginPage {
  login: string;
  password: string;
  rememberUser: boolean;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loginSubmi(row: LoginPage) {
    this.authService.login(row.login, row.password).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated();
  }
}
