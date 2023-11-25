import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { PreferencesService } from './services/preferences.service';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  preferenceName: string = '';
  preferenceGroupList: any = []

  constructor(private prefernceServices: PreferencesService) {
    
  }

  ngOnInit() {
    this.getAllPrefrences();
  }

  getAllPrefrences() {
    this.prefernceServices.getPreferences().subscribe((data: any) => {
      this.preferenceGroupList = data;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.preferenceGroupList, event.previousIndex, event.currentIndex);
  }
}
