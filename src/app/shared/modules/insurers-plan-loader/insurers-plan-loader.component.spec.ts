import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurersPlanLoaderComponent } from './insurers-plan-loader.component';

describe('InsurersPlanLoaderComponent', () => {
  let component: InsurersPlanLoaderComponent;
  let fixture: ComponentFixture<InsurersPlanLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurersPlanLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurersPlanLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
