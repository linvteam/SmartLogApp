import { Log, LogRow } from '../log.classes';
import { LogService } from '../services/log/log.service';
import { mockLog } from '../test_common/logMock';
import { EventSearch } from './event-search';

class mockLogServiceLog extends LogService{
  constructor(){
    super();
  }

  override getLog() : Log{
    return mockLog;
  }
}

describe('EventSearch', () => {
  it('should create an instance', () => {
    expect(new EventSearch("", [0], [0])).toBeTruthy();
  });

  it('should create an instance with queryString, units and subUnits', () => {
    expect(new EventSearch("ES044", [1, 14], [1, 14])).toBeTruthy();
  });

  it('should return one group', () => {
    let event : EventSearch = new EventSearch("ES044", [1, 14], [1, 14]);
    expect(event.getNumberOfGroups()).toEqual(1);
  });

  it('should set log service', () => {
    let event : EventSearch = new EventSearch("ES044", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    event.setLogService(service);
    expect(event['logService']).toEqual(service)
  });

  it('should return events from code', () => {
    let event : EventSearch = new EventSearch("ES044", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    let filteredEvents : LogRow[] = mockLog.Events.filter( (event) => {
      return event.Code=="ES044" && (event.Unit==1 || event.Unit==14) && (event.SubUnit==1 || event.SubUnit==14);
    });
    event.setLogService(service);
    expect(event.getGroup(1)).toEqual(filteredEvents);
  });

  it('should return events from description', () => {
    let event : EventSearch = new EventSearch("Inverter contactor/relay is closed", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    let filteredEvents : LogRow[] = mockLog.Events.filter( (event) => {
      return event.Description=="Inverter contactor/relay is closed" && (event.Unit==1 || event.Unit==14) && (event.SubUnit==1 || event.SubUnit==14);
    });
    event.setLogService(service);
    expect(event.getGroup(1)).toEqual(filteredEvents);
  });

  it('should return events from Unit', () => {
    let event : EventSearch = new EventSearch("1", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    let filteredEvents : LogRow[] = mockLog.Events.filter( (event) => {
      return event.Unit==1 && (event.SubUnit==1 || event.SubUnit==14);
    });
    event.setLogService(service);
    expect(event.getGroup(1)).toEqual(filteredEvents);
  });

  it('should return events from Value', () => {
    let event : EventSearch = new EventSearch("true", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    let filteredEvents : LogRow[] = mockLog.Events.filter( (event) => {
      return event.Value==true && (event.Unit==1 || event.Unit==14) && (event.SubUnit==1 || event.SubUnit==14);
    });
    event.setLogService(service);
    expect(event.getGroup(1)).toEqual(filteredEvents);
  });

});
