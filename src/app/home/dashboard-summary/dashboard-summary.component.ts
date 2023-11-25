import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss'
})
export class DashboardSummaryComponent {
  public dashboarditems: any = [
    { text: 'Profile Created', count: '23', icon: 'person_add'},
    { text: 'In Progress', count: '12', icon: 'person_check'},
    { text: 'For Admission Fee', count: '3', icon: 'payments'},
    { text: 'Submitted', count: '45', icon: 'thumb_up'},
    { text: 'Rejected', count: '2', icon: 'thumb_up'},
    { text: '', count: '', icon: ''},
    { text: '', count: '', icon: ''},
    { text: '', count: '', icon: ''},
    { text: '', count: '', icon: ''},
    { text: '', count: '', icon: ''},

  ]
}
