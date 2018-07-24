import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// Models
import { Client } from "../models/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // Multiple client retrieval properties
  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  // Singular client retreival properties
  clientDocument: AngularFirestoreDocument<Client>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients',
      ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    // Get client with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(res => res.map(r => {
        const data = r.payload.doc.data() as Client;
        data.id = r.payload.doc.id;
        return data;
      }))
    );
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDocument = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDocument.snapshotChanges().pipe(map(res => {
      if (res.payload.exists === false) {
        return null;
      } else {
        const data = res.payload.data() as Client;
        data.id = res.payload.id;
        return data;
      }
    }))
    return this.client;
  }

  updateClient(client: Client) {
    this.clientDocument = this.afs.doc(`clients/${client.id}`);
    this.clientDocument.update(client);
  }

  deleteClient(client: Client) {
    this.clientDocument = this.afs.doc(`clients/${client.id}`);
    this.clientDocument.delete();
  }
}

