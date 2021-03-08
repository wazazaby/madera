import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SoftClient } from '../interfaces/client';
import { Module } from '../interfaces/module';
import { Components } from '../interfaces/components';
import { Roles } from '../interfaces/roles';
import { Users } from '../interfaces/users';
import { QuotationStatus } from '../interfaces/quotation-status';

@Injectable({
  providedIn: 'root',
})
export class StatesService {

  /** Clients */
  private _clients: BehaviorSubject<SoftClient[]> = new BehaviorSubject<SoftClient[]>([]);
  /** Users */
  private _users: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);
  /** Composants */
  private _composents: BehaviorSubject<Components[]> = new BehaviorSubject<Components[]>([]);
  /** Modules */
  private _modules: BehaviorSubject<Module[]> = new BehaviorSubject<Module[]>([]);
  /** Roles users */
  private _roles: BehaviorSubject<Roles[]> = new BehaviorSubject<Roles[]>([]);
  /** Token utilisateur */
  private _token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  /** Quotation Status */
  private _quotationStatus: Map<number, QuotationStatus> = new Map();

  constructor() {}

  // ===================================================================================================================

  public get token(): string {
    return this._token.getValue();
  }

  public set token(value: string) {
    this._token.next(value);
  }

  public tokenAsObservable(): Observable<string> {
    return this._token.asObservable();
  }

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

  public get clients(): SoftClient[] {
    return this._clients.getValue();
  }

  public set clients(value: SoftClient[]) {
    this._clients.next(value);
  }

  public clientsAsObservable(): Observable<SoftClient[]> {
    return this._clients.asObservable();
  }

  // ===================================================================================================================

  public get composents(): Components[] {
    return this._composents.getValue();
  }

  public set composents(value: Components[]) {
    this._composents.next(value);
  }

  public composentsAsObservable(): Observable<Components[]> {
    return this._composents.asObservable();
  }

  // ===================================================================================================================

  public get modules(): Module[] {
    return this._modules.getValue();
  }

  public set modules(value: Module[]) {
    this._modules.next(value);
  }

  public modulesAsObservable(): Observable<Module[]> {
    return this._modules.asObservable();
  }

  // ===================================================================================================================

  get quotationStatus(): Map<number, QuotationStatus> {
    return this._quotationStatus;
  }

  set quotationStatus(value: Map<number, QuotationStatus>) {
    this._quotationStatus = value;
  }

  // ===================================================================================================================

  /**
   * Supprime toute les datas stocker
   */
  public cleanUp() {
    this._roles.next([]);
    this._users.next(null);
    this._clients.next([]);
    this._composents.next([]);
    this._modules.next([]);
  }

  // ===================================================================================================================

}
