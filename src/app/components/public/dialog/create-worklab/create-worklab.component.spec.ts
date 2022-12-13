import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorklabComponent } from './create-worklab.component';

describe('CreateWorklabComponent', () => {
  let component: CreateWorklabComponent;
  let fixture: ComponentFixture<CreateWorklabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorklabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorklabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
