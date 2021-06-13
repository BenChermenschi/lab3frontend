import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenMeeChartComponent } from './ben-mee-chart.component';

describe('BenMeeChartComponent', () => {
  let component: BenMeeChartComponent;
  let fixture: ComponentFixture<BenMeeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenMeeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenMeeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
