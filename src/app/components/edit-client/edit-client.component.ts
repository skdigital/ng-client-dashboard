import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
// Services
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";
// Models
import { Client } from "../../models/client";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  constructor(
    private _flashMessage: FlashMessagesService,
    private _clientService: ClientService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'];

    this._clientService.getClient(this.id).subscribe(res => {
      this.client = res;
      console.log(this.client);
    });
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this._flashMessage.show('The form is not completed correctly, please check required fields again.', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      value.id = this.id;
      this._clientService.updateClient(value);
      this._flashMessage.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this._router.navigate([`/client/${value.id}`])
    }
  }

}
