import { Component, OnInit} from '@angular/core';
import { BaseConfigService } from '../../../baseConfig.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private configService: BaseConfigService) {
   
  }

  ngOnInit(): void {
  }

}
