import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { ClientService } from "../../services/client.service";

import { Client } from "../../models/client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this._activatedRoute.snapshot.params['id'];
    // Get client
    this._clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client)
    });
  }

}
