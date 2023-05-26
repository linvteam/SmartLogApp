import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeChartComponent } from './cumulative-chart.component';

describe('CumulativeChartComponent', () => {
  let component: CumulativeChartComponent;
  let fixture: ComponentFixture<CumulativeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulativeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumulativeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
