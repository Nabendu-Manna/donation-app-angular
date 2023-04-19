import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationMapComponent } from './donation-map.component';

describe('DonationMapComponent', () => {
  let component: DonationMapComponent;
  let fixture: ComponentFixture<DonationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
