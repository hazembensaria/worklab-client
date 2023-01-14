import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemCommentsComponent } from './problem-comments.component';

describe('ProblemCommentsComponent', () => {
  let component: ProblemCommentsComponent;
  let fixture: ComponentFixture<ProblemCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
