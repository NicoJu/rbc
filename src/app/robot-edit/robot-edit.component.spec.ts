import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotEditComponent } from './robot-edit.component';

describe('RobotEditComponent', () => {
  let component: RobotEditComponent;
  let fixture: ComponentFixture<RobotEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
