import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StatesService } from './states.service';

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
  // Client

  public getClient(): Observable<any> {
    return this._http.get<any>(environment.apiUrlService + '/clients', { withCredentials: true });
  }

  public setClient(): Observable<any> {
    return;
  }

  public addClient(): Observable<any> {
    return;
  }

  // ===================================================================================================================
  // Composant

  public getComposant(): Observable<any> {
    return this.http.get<any>(environment.apiUrlService + '/composants', { withCredentials: true });
  }

  public setComposant(): Observable<any> {
    return;
  }

  public addComposant(): Observable<any> {
    return;
  }

  // ===================================================================================================================
  // Modele

  public getModele(): Observable<any> {
    return this._http.get<any>(environment.apiUrlService + '/modeles', { withCredentials: true });
  }

  public setModele(): Observable<any> {
    return;
  }

  public addModele(): Observable<any> {
    return;
  }

  // ===================================================================================================================
  // All Data

  public initData() {
    return forkJoin([
      this.getClient(),
      this.getComposant(),
      this.getModele(),
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([clients, composants, modeles]) => {
        console.log('*initData', clients, composants, modeles);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
