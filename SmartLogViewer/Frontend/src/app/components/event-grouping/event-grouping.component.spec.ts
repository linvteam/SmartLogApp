import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventGroupingComponent } from './event-grouping.component';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log/log.service';
import { mockLog } from 'src/app/test_common/logMock';
import { EventGrouping } from 'src/app/LogManipulator/event-grouping';

class mockLogServiceLog extends LogService{
  constructor(){
    super();
    super.Log = mockLog;
  }

  override getLog() : Log{
    return mockLog;
  }
}

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
    providers: [
      { provide: LogService, useClass: mockLogServiceLog }
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

  it('should reset value', () => {
    component.submitForm();
    expect(component.formGroup.value.valore).toEqual('0');
    expect(component.formGroup.value.unita).toEqual('1');
  });

  it('should set EventSearch as LogManipulator', (done: DoneFn) => {
    component.formGroup.setValue({
      valore: '2',
      unita: '2'
    });
    component['logManipulationService']['manipulator'].subscribe(value => {
      expect(value).toBeInstanceOf(EventGrouping);
      done();
    });    
    component.submitForm();

  });
});
