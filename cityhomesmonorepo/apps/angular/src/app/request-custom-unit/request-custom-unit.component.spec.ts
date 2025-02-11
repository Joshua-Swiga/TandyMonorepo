import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCustomUnitComponent } from './request-custom-unit.component';

describe('RequestCustomUnitComponent', () => {
  let component: RequestCustomUnitComponent;
  let fixture: ComponentFixture<RequestCustomUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCustomUnitComponent]
    });
    fixture = TestBed.createComponent(RequestCustomUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
