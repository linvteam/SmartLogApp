import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHeaderComponent } from './chart-header.component';
import { MdbAccordionComponent, MdbAccordionItemComponent } from 'mdb-angular-ui-kit/accordion';

describe('ChartHeaderComponent', () => {
  let component: ChartHeaderComponent;
  let fixture: ComponentFixture<ChartHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartHeaderComponent, MdbAccordionComponent, MdbAccordionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUV-23: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
