import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSearchComponent } from './chart-search.component';

describe('ChartSearchComponent', () => {
  let component: ChartSearchComponent;
  let fixture: ComponentFixture<ChartSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
