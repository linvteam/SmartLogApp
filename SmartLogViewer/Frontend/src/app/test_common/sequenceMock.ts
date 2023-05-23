import { Sequence } from "../sequence.classes";

let fakeSequence = {
  "name": "EcoModeOFF",
  "startEventsAvailableSubUnits": [
    14
  ],
  "startEvents": [
    {
      "code": "ES044",
      "status": true
    }
  ],
  "endEventsAvailableSubUnits": [
    0
  ],
  "endEvents": [
    {
      "code": "S000",
      "status": true
    },
    {
      "code": "S002",
      "status": false
    }
  ],
  "maxDuration": 15000
};

  export let mockSequence : Sequence = new Sequence(fakeSequence as unknown as Sequence);