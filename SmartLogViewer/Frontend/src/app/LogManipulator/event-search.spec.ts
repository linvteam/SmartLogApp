import { EventSearch } from './event-search';

describe('EventSearch', () => {
  it('should create an instance', () => {
    expect(new EventSearch("", [0], [0])).toBeTruthy();
  });
});
