import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgroupListComponent } from './classgroup-list.component';

describe('ClassgroupListComponent', () => {
  let component: ClassgroupListComponent;
  let fixture: ComponentFixture<ClassgroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassgroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
