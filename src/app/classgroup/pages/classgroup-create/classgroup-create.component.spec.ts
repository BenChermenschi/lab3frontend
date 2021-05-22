import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgroupCreateComponent } from './classgroup-create.component';

describe('ClassgroupCreateComponent', () => {
  let component: ClassgroupCreateComponent;
  let fixture: ComponentFixture<ClassgroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassgroupCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassgroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
