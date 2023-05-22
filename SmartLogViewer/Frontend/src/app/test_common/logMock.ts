import { Log } from "../log.classes";

let fakeLog = {
    header: {
      "pcDate": "2022-02-25T14:23:21",
      "upsDate": "2022-02-25T14:23:20",
      "iniFile": [
        {
          "fileName": "MAPK_Unit_v2_02_00.ini",
          "unit": 0,
          "subUnit": 0
        },
        {
          "fileName": "MAPK_Unit_v2_02_00.ini",
          "unit": 1,
          "subUnit": 0
        },
        {
          "fileName": "MAPK_Module_RD_IV_v2_02_00.ini",
          "unit": 1,
          "subUnit": 1
        },
        {
          "fileName": "MAPK_Module_RD_IV_v2_02_00.ini",
          "unit": 1,
          "subUnit": 2
        },
        {
          "fileName": "MAPK_Module_RD_IV_v2_02_00.ini",
          "unit": 1,
          "subUnit": 3
        },
        {
          "fileName": "MAPK_ByPass_v2_02_00.ini",
          "unit": 1,
          "subUnit": 14
        }
      ]
    },
    events: [
      {
        "date": "2022/02/25",
        "time": "14:23:00.375",
        "unit": 1,
        "subUnit": 0,
        "code": "S009",
        "description": "In Service mode",
        "value": false,
        "color": "0xFFE0FFFF"
      },
      {
        "date": "2022/02/25",
        "time": "14:23:04.557",
        "unit": 1,
        "subUnit": 0,
        "code": "S009",
        "description": "In Service mode",
        "value": true,
        "color": "0xFFE0FFFF"
      },
      {
        "date": "2022/02/25",
        "time": "14:22:45.258",
        "unit": 1,
        "subUnit": 0,
        "code": "S009",
        "description": "In Service mode",
        "value": false,
        "color": "0xFFE0FFFF"
      },
      {
        "date": "2022/02/25",
        "time": "14:22:22.259",
        "unit": 1,
        "subUnit": 0,
        "code": "CCX04",
        "description": "Reset History Log",
        "value": true,
        "color": "0xFFD3D3D3"
      }
    ],
    "fileName": "P257645001_SYS_U0S0_071122_0935_Log.csv"
  };

  export let mockLog : Log = new Log(fakeLog as unknown as Log);