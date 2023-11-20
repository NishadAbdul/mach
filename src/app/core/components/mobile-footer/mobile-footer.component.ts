import { Component } from '@angular/core';
import { BaseConfigService } from '../../../baseConfig.service';
@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss']
})
export class MobileFooterComponent {
  constructor(private configService: BaseConfigService) {
   
  }
}
