import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

// Services
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
    private _settingsService: SettingsService
  ) { }

  ngOnInit() {
    // Settings
    this.showRegister = this._settingsService.getSettings().allowRegistration;

    // Authentication check
    this._authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick() {
    if (confirm('Are you sure?')) {
      this._authService.logout()
      this._flashMessage.show('You are now logged out!', {
        cssClass: 'alert-success', timeout: 4000
      })
      this._router.navigate(['/login']);
    }
  }

}
