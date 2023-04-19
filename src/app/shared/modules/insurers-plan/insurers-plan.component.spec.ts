import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurersPlanComponent } from './insurers-plan.component';

describe('InsurersPlanComponent', () => {
  let component: InsurersPlanComponent;
  let fixture: ComponentFixture<InsurersPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurersPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurersPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
