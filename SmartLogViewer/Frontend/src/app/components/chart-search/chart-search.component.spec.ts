import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSearchComponent } from './chart-search.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { EventSearchComponent } from '../event-search/event-search.component';

describe('ChartSearchComponent', () => {
  let component: ChartSearchComponent;
  let fixture: ComponentFixture<ChartSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MdbAccordionModule
      ],
      declarations: [ 
        ChartSearchComponent,
        EventSearchComponent
      ]
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
