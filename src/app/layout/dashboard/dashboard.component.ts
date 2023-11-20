import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { AppState } from 'src/app/app.service';
import { RouteDataService } from 'src/app/core/services/routedata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public animateSideBar: boolean = false;
  public stepIndex: number = 0;
  public expanded: boolean = false;
  @Input() ApplicationProgress: number = 0;
  constructor(private routeDataService: RouteDataService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private appState: AppState) {
      let currentStep = 0;
      if (this.appState?.getSharedObj('resumeStep') !== 'undefined') {
        currentStep = this.appState?.getSharedObj('resumeStep')
      }
    
      if (currentStep > 0 && this.stepIndex === 0) {
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
