import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventGroupingComponent } from './event-grouping.component';
import { BrowserModule } from '@angular/platform-browser';

describe('EventGroupingComponent', () => {
  let component: EventGroupingComponent;
  let fixture: ComponentFixture<EventGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
      declarations: [ EventGroupingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
