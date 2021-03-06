import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { UtilsService } from '../../../services/utils.service';
import { Module } from '../../../interfaces/module';
import { Subject } from 'rxjs';
import { ResponsesApi } from '../../../interfaces/responses-api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-modulebyid',
  templateUrl: './modulebyid.component.html',
  styleUrls: ['./modulebyid.component.scss'],
})
export class ModulebyidComponent implements OnInit, OnDestroy {

  public id: number = 0;

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService) {
    // Récup l'id de la route
    this.route.params.subscribe((res) => {
      if (res) {
        this.id = res.id;

        if (this.id > 0) {
          this._bridgeService.getModuleById(this.id)
            .pipe(takeUntil(this.destroyed))
            .subscribe((module: ResponsesApi<Module>) => {
            console.log(module);
          });
        }

      } else {
        this.router.navigateByUrl('pages/modules').then();
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
