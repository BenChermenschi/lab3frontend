import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgroupEditComponent } from './classgroup-edit.component';

describe('ClassgroupEditComponent', () => {
  let component: ClassgroupEditComponent;
  let fixture: ComponentFixture<ClassgroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassgroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassgroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
