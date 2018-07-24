import { Injectable } from '@angular/core';
import { Settings } from "../models/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }

  constructor() { }

  getSettings(): Settings {
    return this.settings;
  }
}
