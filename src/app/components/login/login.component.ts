import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private _authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this._router.navigate(['/']);
      };
    });
  }

  onSubmit() {
    console.log(this.email, this.password)
    this._authService.login(this.email, this.password)
      .then(res => {
        this._flashMessage.show('Login succesful', {
          cssClass: 'alert-success', timeout: 4000
        });
        this._router.navigate(['/']);
      })
      .catch(err => {
        this._flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 6000
        });
      });
  }

}
