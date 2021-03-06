import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResponsesApi } from '../interfaces/responses-api';
import { Users } from '../interfaces/users';
import { StatesService } from './states.service';
import { Client, SoftClient } from '../interfaces/client';
import { Components } from '../interfaces/components';
import { Module } from '../interfaces/module';
import { NbAuthService } from '@nebular/auth';
import { Roles } from '../interfaces/roles';
import { Commercial } from '../interfaces/commercial';
import { OrderStatus } from '../interfaces/order-status';
import { PaymentStatus } from '../interfaces/payment-status';
import { Provider } from '../interfaces/provider';
import { QuotationStatus } from '../interfaces/quotation-status';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class BridgeService implements OnDestroy {

  constructor(private _http: HttpClient,
              private _statesService: StatesService,
              private _auth: NbAuthService,
              private _utilsService: UtilsService,
              private _router: Router) { }


  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  // ===================================================================================================================
  // Test API

  public testApi() {
    return this._http.get<any>(environment.apiUrlService);
  }

  // ===================================================================================================================
  // Provider

  public addProviders(data: any): Observable<ResponsesApi<Provider>> {
    return this._http.post<ResponsesApi<any>>(`${environment.apiUrlService}/provider/create`, {data});
  }

  // ===================================================================================================================
  // Rôles

  /**
   * Récupère tout les rôles
   * @return Observable
   */
  public getRoles(): Observable<ResponsesApi<Roles[]>> {
    return this._http.get<ResponsesApi<Roles[]>>(`${environment.apiUrlService}/role/all`);
  }

  /**
   * Récupère un rôle par id
   * @param id: identifiant
   * @return Observable
   */
  public getRolesById(id: number): Observable<ResponsesApi<Roles>> {
    return this._http.get<ResponsesApi<Roles>>(`${environment.apiUrlService}/role/${id}`);
  }


  // ===================================================================================================================
  // Users

  /**
   * Ajoute un utilisateur
   * @param user: information de l'utilisateur
   * @param type: role des users
   * @return Observable
   */
  public addUsers(user: Users, type: string): Observable<ResponsesApi<any>> {
    const routeRole = new Map()
      .set('Administrateur', 'administrator')
      .set('Client', 'client')
      .set('Commercial', 'commercial')
      .set('Stockiste', 'stockist');

    return this._http.post<ResponsesApi<any>>(`${environment.apiUrlService}/${routeRole.get(type)}/create`, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: 'motdepasse',
    });
  }


  /**
   * Ajoute un client
   * @param client: information du client
   * @return Observable
   */
  public addClient(client: SoftClient): Observable<ResponsesApi<any>> {
    return this._http.post<ResponsesApi<any>>(`${environment.apiUrlService}/client/create`, {
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      city: client.city,
      phoneNumber: client.phoneNumber,
      postalCode: client.postalCode,
      adressLine1: client.adressLine1,
      quotation: client.quotation,
      password: 'motdepasse',
    });
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
   * Récupère toute les informations de l'utilisateur
   * @param id: identification de l'utilisateur
   */
  public getUserInfo(id: number): Observable<ResponsesApi<Users>>  {
    return this._http.get<ResponsesApi<Users>>(`${environment.apiUrlService}/users/${id}`);
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
    // return new Observable<Client[]>((obs) => {
    //   obs.next(clientsMock);
    //   obs.complete();
    // });
    return this._http.get<Client[]>(environment.apiUrlService + '/client/all');
  }

  public setClient(cli: Client): Observable<Client> {
    return;
  }

  // ===================================================================================================================
  // Composant

  /**
   * récupère tout les composants
   * @return Observable
   */
  public getComposant(): Observable<ResponsesApi<Components[]>> {
    return this._http.get<ResponsesApi<Components[]>>(environment.apiUrlService + '/component/all',
      { withCredentials: true });
  }

  /**
   * récupère tout un composants par id
   * @param id: identifiant
   * @return Observable
   */
  public getComposantById(id: number): Observable<ResponsesApi<Components>> {
    return this._http.get<ResponsesApi<Components>>(environment.apiUrlService + `/component/${id}`);
  }

  /**
   * Modifie un composant
   * @param id: identifiant
   * @return Observable
   */
  public setComposant(id: number): Observable<ResponsesApi<Components>> {
    return;
    // return this._http.get<any>(environment.apiUrlService + 'component/${id}', { withCredentials: true });
  }

  /**
   * Ajoute un composant
   * @param compo: composant
   * @return Observable
   */
  public addComposant(compo: Components): Observable<ResponsesApi<Components>> {
    return this._http.post<ResponsesApi<Components>>(environment.apiUrlService + 'component/create',
      { withCredentials: true });
  }

  // ===================================================================================================================
  // Modele

  public getModule(): Observable<Module[]> {
    return new Observable<Module[]>((obs) => {
      obs.next([]);
      obs.complete();
    });
    // return this._http.get<any>(environment.apiUrlService + 'modeles', { withCredentials: true });
  }

  public setModule(): Observable<any> {
    return;
  }

  /**
   * Ajoute un module
   * @param mod: module
   * @return Observable
   */
  public addModule(mod: Module): Observable<ResponsesApi<Module>> {
    return this._http.get<ResponsesApi<Module>>(environment.apiUrlService + 'module/create');
  }

  // ===================================================================================================================
  // OrderStatus

  /**
   * Récupère la liste des statuts de commande
   * @return Observable
   */
  public getOrderStatus(): Observable<ResponsesApi<OrderStatus[]>> {
    return this._http.get<ResponsesApi<OrderStatus[]>>(environment.apiUrlService + 'orderStatus/all');
  }

  /**
   * Récupère la liste des statuts de commande par id
   * @param id identifiant
   * @return Observable
   */
  public getOrderStatusById(id: number): Observable<ResponsesApi<OrderStatus>> {
    return this._http.get<ResponsesApi<OrderStatus>>(environment.apiUrlService + `orderStatus/${id}`);
  }

  // ===================================================================================================================
  // paymentStatus

  /**
   * Récupère la liste des statuts de paiement
   * @return Observable
   */
  public getPaymentStatus(): Observable<ResponsesApi<PaymentStatus[]>> {
    return this._http.get<ResponsesApi<PaymentStatus[]>>(environment.apiUrlService + 'paymentType/all');
  }

  /**
   * Récupère la liste des statuts de paiement par id
   * @param id identifiant
   * @return Observable
   */
  public getPaymentStatusById(id: number): Observable<ResponsesApi<PaymentStatus>> {
    return this._http.get<ResponsesApi<PaymentStatus>>(environment.apiUrlService + `paymentType/${id}`);
  }

  // ===================================================================================================================
  // quotationStatus

  /**
   * Récupère la liste des statuts des factures
   * @return Observable
   */
  public getQuotationStatus(): Observable<ResponsesApi<QuotationStatus[]>> {
    return this._http.get<ResponsesApi<QuotationStatus[]>>(environment.apiUrlService + 'quotationStatus/all');
  }

  /**
   * Récupère la liste des statuts des factures par id
   * @param id identifiant
   * @return Observable
   */
  public getQuotationById(id: number): Observable<ResponsesApi<QuotationStatus>> {
    return this._http.get<ResponsesApi<QuotationStatus>>(environment.apiUrlService + `quotationStatus/${id}`);
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
      this.getRoles(),
      this._auth.getToken(),
    ]).pipe(takeUntil(this.destroyed))
      .subscribe(([clients, composants, modules, users, roles, token]) => {
        // Ajout les clients
        if (clients && clients.length > 0) {
          this._statesService.clients = this._utilsService.clientToSoft(clients);
        }
        // Ajout les composants
        if (composants && composants.data && composants.data['components']) {
          this._statesService.composents = composants.data['components'];
        }

        // Ajout les modules
        if (modules && modules.length > 0) {
          this._statesService.modules.next(modules);
        }

        // Check le token
        if (users && users.data && users.data['users'].length > 0) {
          this._statesService.users = users.data['users'];
        }

        // Ajoute les rôles
        if (roles && roles.data && roles.data['roles']) {
          this._statesService.roles = roles.data['roles'];
        }

        console.log('*initData', clients, composants, modules, users, roles);
    }, (err) => {
        this._utilsService.showToast(err.statusText, 'danger');
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
