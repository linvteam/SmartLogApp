import { EventGrouping } from './event-grouping';

describe('EventGrouping', () => {

  // TUV-44: Verifica che la classe venga istanziata correttamente
  it('should create an instance', () => {
    expect(new EventGrouping(1)).toBeTruthy();
  });
});
