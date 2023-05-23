import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventGroupingComponent } from './event-grouping.component';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log/log.service';
import { mockLog } from 'src/app/test_common/logMock';

class mockLogServiceLog extends LogService{
  constructor(){
    super();
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

  it('should set EventGrouping as LogManipulator', () => {
    let dynamicType : String = "";
    component.formGroup.setValue({
      valore: '2',
      unita: '2'
    });
    component['logManipulationService']['logService'] = new mockLogServiceLog();
    component.submitForm();

    setTimeout( () => {
      component['logManipulationService']['manipulator'].subscribe({
        next: (value) => { dynamicType = typeof value; } 
      });
      expect(dynamicType).toEqual("EventGrouping");
    }, 2000 );
  });
});
