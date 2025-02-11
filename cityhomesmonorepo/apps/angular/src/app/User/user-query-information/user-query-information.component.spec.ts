import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQueryInformationComponent } from './user-query-information.component';

describe('UserQueryInformationComponent', () => {
  let component: UserQueryInformationComponent;
  let fixture: ComponentFixture<UserQueryInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserQueryInformationComponent]
    });
    fixture = TestBed.createComponent(UserQueryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
