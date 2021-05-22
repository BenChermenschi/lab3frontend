import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgroupDetailComponent } from './classgroup-detail.component';

describe('ClassgroupDetailComponent', () => {
  let component: ClassgroupDetailComponent;
  let fixture: ComponentFixture<ClassgroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassgroupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassgroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
