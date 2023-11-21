import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCertificateComponent } from './my-certificate.component';

describe('MyCertificateComponent', () => {
  let component: MyCertificateComponent;
  let fixture: ComponentFixture<MyCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCertificateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
