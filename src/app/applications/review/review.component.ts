import { Component } from '@angular/core';
import { ReviewService } from './services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  activeLink = 'Personal Details';
  isEdit: boolean = false;
  appDetails: any;
  constructor(private reviewService: ReviewService) {
    this.getApplciationDetails()
  }


  getApplciationDetails() {
    this.reviewService.getApplicationDetails().subscribe(response => {
      this.appDetails = response;
    })
  }
}
