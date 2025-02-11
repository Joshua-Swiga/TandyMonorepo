import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstactUsComponent } from './constact-us.component';

describe('ConstactUsComponent', () => {
  let component: ConstactUsComponent;
  let fixture: ComponentFixture<ConstactUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstactUsComponent]
    });
    fixture = TestBed.createComponent(ConstactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
