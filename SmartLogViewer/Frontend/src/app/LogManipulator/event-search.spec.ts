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

  // TUV-45: Verifica che la classe venga istanziata correttamente con valori di default
  it('should create an instance', () => {
    expect(new EventSearch("", [0], [0])).toBeTruthy();
  });

  // TUV-46: Verifica che la classe venga istanziata correttamente con valori diversi da quelli di default
  it('should create an instance with queryString, units and subUnits', () => {
    expect(new EventSearch("ES044", [1, 14], [1, 14])).toBeTruthy();
  });

  // TUV-47: Verifica che la classe ritorni correttamente un unico gruppo di eventi
  it('should return one group', () => {
    let event : EventSearch = new EventSearch("ES044", [1, 14], [1, 14]);
    expect(event.getNumberOfGroups()).toEqual(1);
  });

  // TUV-48: Verifica che venga impostato correttamente il log service
  it('should set log service', () => {
    let event : EventSearch = new EventSearch("ES044", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    event.setLogService(service);
    expect(event['logService']).toEqual(service)
  });

  // TUV-49: Verifica che vengano ritornati tutti gli eventi aventi codice, Unit e SubUnit specificati
  it('should return events from code', () => {
    let event : EventSearch = new EventSearch("ES044", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    let filteredEvents : LogRow[] = mockLog.Events.filter( (event) => {
      return event.Code=="ES044" && (event.Unit==1 || event.Unit==14) && (event.SubUnit==1 || event.SubUnit==14);
    });
    event.setLogService(service);
    expect(event.getGroup(1)).toEqual(filteredEvents);
  });

  // TUV-50: Verifica che vengano ritornati tutti gli eventi aventi la descrizione specificata
  it('should return events from description', () => {
    let event : EventSearch = new EventSearch("Inverter contactor/relay is closed", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    let filteredEvents : LogRow[] = mockLog.Events.filter( (event) => {
      return event.Description=="Inverter contactor/relay is closed" && (event.Unit==1 || event.Unit==14) && (event.SubUnit==1 || event.SubUnit==14);
    });
    event.setLogService(service);
    expect(event.getGroup(1)).toEqual(filteredEvents);
  });

  // TUV-51: Verifica che vengano ritornati tutti gli eventi aventi Unit uguale a quella specificata
  it('should return events from Unit', () => {
    let event : EventSearch = new EventSearch("1", [1, 14], [1, 14]);
    let service : mockLogServiceLog = new mockLogServiceLog();
    let filteredEvents : LogRow[] = mockLog.Events.filter( (event) => {
      return event.Unit==1 && (event.SubUnit==1 || event.SubUnit==14);
    });
    event.setLogService(service);
    expect(event.getGroup(1)).toEqual(filteredEvents);
  });

  // TUV-52: Verifica che vengano ritornati tutti gli eventi aventi valore uguale a quello specificato
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
