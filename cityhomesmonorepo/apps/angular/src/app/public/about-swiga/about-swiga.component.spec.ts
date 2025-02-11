import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSwigaComponent } from './about-swiga.component';

describe('AboutSwigaComponent', () => {
  let component: AboutSwigaComponent;
  let fixture: ComponentFixture<AboutSwigaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutSwigaComponent]
    });
    fixture = TestBed.createComponent(AboutSwigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
