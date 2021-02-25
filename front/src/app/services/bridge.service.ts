import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StatesService } from './states.service';
import { Client } from '../interfaces/client';
import { Component } from '../interfaces/component';
import { Module } from '../interfaces/module';
import { clientsMock } from '../mocks/clients.mock';

@Injectable({
  providedIn: 'root',
})
export class BridgeService implements OnDestroy {

  constructor(private _http: HttpClient,
              private _statesService: StatesService,
              private _router: Router) { }


  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  // ===================================================================================================================
  // Test API

  public testApi() {
    return this._http.get<any>(environment.apiUrlService);
  }

  // ===================================================================================================================
  // Client

  public getClients(): Observable<Client[]> {
    return new Observable<Client[]>((obs) => {
      obs.next(clientsMock);
      obs.complete();
    });
    // return this._http.get<any>(environment.apiUrlService + 'clients', { withCredentials: true });
  }

  public setClient(cli: Client): Observable<Client> {
    return;
  }

  public addClient(cli: Client): Observable<Client[]> {
    return new Observable<Client[]>((obs) => {
      this._statesService.clients.push(cli);
      obs.next(this._statesService.clients);
      obs.complete();
    });
  }

  // ===================================================================================================================
  // Composant

  public getComposant(): Observable<Component[]> {
    return new Observable<Component[]>((obs) => {
      obs.next([]);
      obs.complete();
    });
    // return this._http.get<any>(environment.apiUrlService + 'composants', { withCredentials: true });
  }

  public setComposant(): Observable<any> {
    return;
  }

  public addComposant(): Observable<any> {
    return;
  }

  // ===================================================================================================================
  // Modele

  public getModule(): Observable<Module[]> {
    return new Observable<Module[]>((obs) => {
      obs.next([]);
      obs.complete();
    });    // return this._http.get<any>(environment.apiUrlService + 'modeles', { withCredentials: true });
  }

  public setModule(): Observable<any> {
    return;
  }

  public addModule(): Observable<any> {
    return;
  }

  // ===================================================================================================================
  // All Data

  public initData() {
    return forkJoin([
      this.getClients(),
      this.getComposant(),
      this.getModule(),
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([clients, composants, modules]) => {
        if (clients && clients.length > 0) {
          this._statesService.clients = clients;
        }

        if (composants && composants.length > 0) {
          this._statesService.composents = composants;
        }

        if (modules && modules.length > 0) {
          this._statesService.modules.next(modules);
        }
        console.log('*initData', clients, composants, modules);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
