import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  preferenceName: string = '';
  preferenceGroupList: any = [{
    name: 'Prefrence 1'
  }, {
    name: 'Prefrence 2'
  },{
    name: 'Prefrence 3'
  },{
    name: 'Prefrence 4'
  }]

  constructor() {
    
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.preferenceGroupList, event.previousIndex, event.currentIndex);
  }
}
