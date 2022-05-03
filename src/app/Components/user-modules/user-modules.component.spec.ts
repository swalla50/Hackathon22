import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModulesComponent } from './user-modules.component';

describe('UserModulesComponent', () => {
  let component: UserModulesComponent;
  let fixture: ComponentFixture<UserModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
