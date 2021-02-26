import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResponsesApi } from '../interfaces/responses-api';
import { Users } from '../interfaces/users';
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
  // Users

  /**
   * Ajoute un utilisateur
   * @param user: information de l'utilisateur
   * @return Observable
   */
  public addUsers(user: Users): Observable<ResponsesApi<any>> {
    return this._http.post<ResponsesApi<any>>(`${environment.apiUrlService}/users/add`, {user});
  }

  /**
   * Affiche la liste des utilisateurs
   */
  public getUsers(): Observable<ResponsesApi<Users[]>> {
    return this._http.post<ResponsesApi<Users[]>>(`${environment.apiUrlService}/users`, {});
  }

  /**
   * Modifie l'utilisateur
   * @param id: identifiant de l'utilisateur
   * @param users: utilisateur modifier
   * @return Observable
   */
  public setUsers(id: number, users: Users): Observable<ResponsesApi<any>> {
    return this._http.put<ResponsesApi<any>>(`${environment.apiUrlService}/users/${id}`, {users});
  }

  /**
   * Envoie une demande pour reset le mot de passe de l'utilisateur
   * @param id: identifiant de l'utilisateur
   * @return Observable
   */
  public resetPassword(id: number): Observable<ResponsesApi<any>> {
    return this._http.get<ResponsesApi<any>>(`${environment.apiUrlService}/users/${id}/reset-password`, {});
  }

  /**
   * Supprime l'utilisateur
   * @param id: identifiant de l'utilisateur
   * @return Observable
   */
  public deleteUsers(id: number): Observable<ResponsesApi<any>> {
    return this._http.delete<ResponsesApi<any>>(`${environment.apiUrlService}/users?id=${id}`);
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

  /**
   * Initialise toute les datas après la connection
   */
  public initData() {
    return forkJoin([
      this.getClients(),
      this.getComposant(),
      this.getModule(),
      this.getUsers(),
    ]).pipe(takeUntil(this.destroyed))
      .subscribe(([clients, composants, modules, users]) => {
        // Ajout les clients
        if (clients && clients.length > 0) {
          this._statesService.clients = clients;
        }
        // Ajout les composants
        if (composants && composants.length > 0) {
          this._statesService.composents = composants;
        }

        // Ajout les modules
        if (modules && modules.length > 0) {
          this._statesService.modules.next(modules);
        }

        // Check le token
        if (users && users.data && users.data['users'].length > 0) {
          this._statesService.users = users.data['users'];
        }

        // TODO ATTENDRE APPEL WS DES ROLES
        // Ajoute les rôles
        this._statesService.roles = [
          {id: 58, label: 'Administrateur', code: 'ADMIN', createdAt: '2021-02-25 10:43:14.688'},
          {id: 59, label: 'Commercial', code: 'COMMERCIAL', createdAt: '2021-02-25 10:43:14.692'},
          {id: 60, label: 'Stockiste', code: 'STOCKIST', createdAt: '2021-02-25 10:43:14.696'},
          {id: 61, label: 'Client', code: 'CLIENT', createdAt: '2021-02-25 10:43:14.700'},
        ];
        // console.log('*initData', clients, composants, modules, users);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
