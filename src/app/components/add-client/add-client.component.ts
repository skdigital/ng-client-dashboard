import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

//Services
import { ClientService } from "../../services/client.service";
import { SettingsService } from "../../services/settings.service";

// Models
import { Client } from "../../models/client";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private _flashMessage: FlashMessagesService,
    private _clientService: ClientService,
    private _router: Router,
    private _settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this._settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    console.log(value, valid)
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      // Show error
      this._flashMessage.show('Please fill out the form with required fields', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add client
      this._clientService.newClient(value);
      // Show message
      this._flashMessage.show('New client added succesfully', {
        cssClass: 'alert-success', timeout: 4000
      });
      // redirect to dash
      this._router.navigate(['/'])
    }
  }

}
