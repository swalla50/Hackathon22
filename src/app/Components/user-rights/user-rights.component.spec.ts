import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightsComponent } from './user-rights.component';

describe('UserRightsComponent', () => {
  let component: UserRightsComponent;
  let fixture: ComponentFixture<UserRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
