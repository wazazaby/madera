import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService } from '@nebular/auth';
import { BridgeService } from '../../../services/bridge.service';
import { StatesService } from '../../../services/states.service';

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  redirectDelay: number = 1000;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private _bridgeService: BridgeService,
              private _stateService: StatesService) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe') || false;
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {

      this.submitted = false;

      if (result.isSuccess()) {
        this._stateService.token = result.getToken().getValue();
        this.messages = result.getMessages();
        // Initialise les datas de l'application
        this._bridgeService.initData();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  /**
   * Retourne la configuration du login
   * @param key: stratégie du login
   */
  public getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  testApi() {
    this._bridgeService.getUsers().subscribe(res => {
      console.log('test API === ', res);
    });
  }
}
