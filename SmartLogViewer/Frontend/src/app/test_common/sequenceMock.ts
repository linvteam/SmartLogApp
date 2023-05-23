import { Sequence } from "../sequence.classes";

let fakeSequence = {
    name: "InputMainsNotOK",
    startEventsAvailableSubUnits: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    startEvents: [
      {
        "code": "EA09_R2",
        "status": true
      }
    ],
    endEventsAvailableSubUnits: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    endEvents: [
      {
        "code": "A019",
        "status": true
      }
    ],
    maxDuration: 5000
  };

  export let mockSequence : Sequence = new Sequence(fakeSequence as unknown as Sequence);