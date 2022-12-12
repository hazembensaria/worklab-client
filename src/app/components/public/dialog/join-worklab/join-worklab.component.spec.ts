import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinWorklabComponent } from './join-worklab.component';

describe('JoinWorklabComponent', () => {
  let component: JoinWorklabComponent;
  let fixture: ComponentFixture<JoinWorklabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinWorklabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinWorklabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
