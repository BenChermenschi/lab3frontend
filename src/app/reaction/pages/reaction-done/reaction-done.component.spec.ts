import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionDoneComponent } from './reaction-done.component';

describe('ReactionDoneComponent', () => {
  let component: ReactionDoneComponent;
  let fixture: ComponentFixture<ReactionDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
