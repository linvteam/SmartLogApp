import { TestBed } from '@angular/core/testing';
import { mockSequence } from '../test_common/sequenceMock';
import {mockLog, mockLog2} from '../test_common/logMock'
import { SequenceSearch } from './sequence-search';
import { LogService } from '../services/log/log.service';
import {Sequence} from "../sequence.classes";
import { Log, LogRow } from '../log.classes';
import { sequence } from '@angular/animations';

class mockLogServiceGroupableLog extends LogService{
  constructor(){
    super();
  }

  override getLog() : Log{
    return mockLog;
  }
}

class mockLogServiceNonGroupableLog extends LogService{
  constructor(){
    super();
  }

  override getLog() : Log{
    return mockLog2;
  }
}

describe('SequenceSearch', () => {
  let sequenceSearch: SequenceSearch = new SequenceSearch(mockSequence);

  it('should create an instance', () => {
    let mockLogServiceNonGroupable= new mockLogServiceNonGroupableLog();
    sequenceSearch.setLogService(mockLogServiceNonGroupable);
    expect(sequenceSearch).toBeTruthy();
  });

  it('should return length one', () => {
    let mockLogServiceNonGroupable= new mockLogServiceNonGroupableLog();
    sequenceSearch.setLogService(mockLogServiceNonGroupable);
    let numberOfGroups: number = sequenceSearch.getNumberOfGroups();
    expect(numberOfGroups).toEqual(1);
  });

  it('should return empty group', () => {
    let mockLogServiceNonGroupable= new mockLogServiceNonGroupableLog();
    sequenceSearch.setLogService(mockLogServiceNonGroupable);
    let rows : LogRow[] = sequenceSearch.getGroup(1);
    expect(rows).toHaveSize(0);
  });

  it('should have two groups', () => {
    let mockLogServiceGroupable = new mockLogServiceGroupableLog()
    sequenceSearch.setLogService(mockLogServiceGroupable);
    let numberOfGroups: number = sequenceSearch.getNumberOfGroups();
    expect(numberOfGroups).toEqual(2);
  })


});