import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { AppState } from '../../app.service';
import { RouteDataService } from '../../core/services/routedata.service';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  public animateSideBar: boolean = false;
  public stepIndex: number = 0;
  public expanded: boolean = false;
  @Input() ApplicationProgress: number = 0;
  constructor(
    public router: Router,
    private routeDataService: RouteDataService,
    private activatedRoute: ActivatedRoute,
    private appState: AppState) {
      if(this.appState.applicationIdentifier) {
        this.appState.deleteSharedObj('applicationIdentifier');
      }
      const currentStep = this.appState.getSharedObj('resumeStep');
      if (this.router.url !== '/home/new-user/guidlines' && currentStep > 0 && this.stepIndex === 0) {
        this.stepIndex = currentStep;
      }
      
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route: any) => route.outlet === 'primary'),
      mergeMap((route: any) => route.data)
    ).subscribe((event: any) => {
      this.stepIndex = event['ApplicationProgress'];
      this.appState.setSharedObj('resumeStep', this.stepIndex);
    });
  }


}
