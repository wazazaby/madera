import { Injectable } from '@angular/core';
import { decodeJwtPayload, NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../interfaces/client';
import { Module } from '../interfaces/module';
import { Component } from '../interfaces/component';
import { Roles } from '../interfaces/roles';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class StatesService {

  /** Clients */
  private _clients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  /** Users */
  private _users: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);
  /** Composants */
  private _composents: BehaviorSubject<Component[]> = new BehaviorSubject<Component[]>([]);
  /** Modules */
  private _modules: BehaviorSubject<Module[]> = new BehaviorSubject<Module[]>([]);
  /** Roles users */
  private _roles: BehaviorSubject<Roles[]> = new BehaviorSubject<Roles[]>([]);

  constructor() {}

  // ===================================================================================================================

  public get roles(): Roles[] {
    return this._roles.getValue();
  }

  public set roles(value: Roles[]) {
    this._roles.next(value);
  }

  public rolesAsObservable(): Observable<Roles[]> {
    return this._roles.asObservable();
  }

  // ===================================================================================================================

  public get users(): Users[] {
    return this._users.getValue();
  }

  public set users(value: Users[]) {
    this._users.next(value);
  }

  public usersAsObservable(): Observable<Users[]> {
    return this._users.asObservable();
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

}
