import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDetailsComponent } from './additional-details.component';

describe('AdditionalDetailsComponent', () => {
  let component: AdditionalDetailsComponent;
  let fixture: ComponentFixture<AdditionalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalDetailsComponent]
    });
    fixture = TestBed.createComponent(AdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
