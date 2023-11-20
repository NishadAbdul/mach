import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() stepIndex = 0;
  constructor(public router: Router) {
    
  }

  ngOnInit(): void {  
    
  }

  

}
