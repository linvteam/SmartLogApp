import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCodeHeaderComponent } from './time-code-header.component';

describe('TimeCodeHeaderComponent', () => {
  let component: TimeCodeHeaderComponent;
  let fixture: ComponentFixture<TimeCodeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeCodeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeCodeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
