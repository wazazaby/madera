import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../interfaces/client';
import { Module } from '../interfaces/module';
import { Component } from '../interfaces/component';

@Injectable({
  providedIn: 'root',
})
export class StatesService implements NbRoleProvider {

  /** Utilisateur */
  private _user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  /** Clients */
  private _clients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  /** Composants */
  private _composents: BehaviorSubject<Component[]> = new BehaviorSubject<Component[]>([]);
  /** Modules */
  private _modules: BehaviorSubject<Module[]> = new BehaviorSubject<Module[]>([]);
  /** Si aucune données n'est charger */
  private _ifNodata: boolean = true;

  constructor(private authService: NbAuthService) {}

  /**
   * Attribut le rôle à l'application
   * @return Observable<string> => rôle
   */
  public getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(map((token: NbAuthJWTToken) => {
        // console.log('*token', token);
        // return token.isValid() ? token.getPayload()['role'] : 'admin';
        // TODO à supprimer
        return 'admin';
      }));
  }

  // ===================================================================================================================

  public get clients(): Client[] {
    return this._clients.getValue();
  }

  public set clients(value: Client[]) {
    this._clients.next(value);
  }

  public clientsAsObservable(): Observable<Client[]> {
    return this._clients.asObservable();
  }

  // ===================================================================================================================

  public get composents(): Component[] {
    return this._composents.getValue();
  }

  public set composents(value: Component[]) {
    this._composents.next(value);
  }

  public composentsAsObservable(): Observable<Component[]> {
    return this._composents.asObservable();
  }

  // ===================================================================================================================

  public get modules(): BehaviorSubject<Module[]> {
    return this._modules;
  }

  public set modules(value: BehaviorSubject<Module[]>) {
    this._modules = value;
  }

  public modulesAsObservable(): Observable<Module[]> {
    return this._modules.asObservable();
  }

  // ===================================================================================================================

  public ifNodata(): boolean {
    return (this.clients.length === 0);
  }

  // ===================================================================================================================

}
