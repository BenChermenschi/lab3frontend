import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgroupListItemComponent } from './classgroup-list-item.component';

describe('ClassgroupListItemComponent', () => {
  let component: ClassgroupListItemComponent;
  let fixture: ComponentFixture<ClassgroupListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassgroupListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassgroupListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
