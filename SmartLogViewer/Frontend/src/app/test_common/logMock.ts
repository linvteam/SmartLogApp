import { Log } from "../log.classes";

let fakeLog = 
{
  "header": {
    "pcDate": "2022-10-20T08:08:17",
    "upsDate": "2022-10-20T06:37:18",
    "iniFile": [
      {
        "fileName": "MAPK_Unit_v1_7_8.ini",
        "unit": 0,
        "subUnit": 0
      },
      {
        "fileName": "MAPK_Unit_v1_7_8.ini",
        "unit": 1,
        "subUnit": 0
      },
      {
        "fileName": "MAPK_Module_RD_IV_v1_7_8.ini",
        "unit": 1,
        "subUnit": 1
      },
      {
        "fileName": "MAPK_ByPass_v1_7_8.ini",
        "unit": 1,
        "subUnit": 14
      }
    ]
  },
  "events": [
    {
      "date": "2022/08/02",
      "time": "13:26:25.458",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:25.457",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:25.449",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:25.446",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:24.857",
      "unit": 1,
      "subUnit": 14,
      "code": "ES026",
      "description": "Bypass Static Switch ON",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:24.857",
      "unit": 1,
      "subUnit": 14,
      "code": "ES047",
      "description": "Inverter contactor/relay is closed",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:24.820",
      "unit": 1,
      "subUnit": 1,
      "code": "S053",
      "description": "Inverter switch ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:18.828",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:18.858",
      "unit": 1,
      "subUnit": 14,
      "code": "ES044",
      "description": "Inverter Power Bridge is ON",
      "value": true,
      "color": "0xFFE0FFFF"
    }
  ],
  "fileName": "prova.csv"
}

export let mockLog : Log = new Log(fakeLog as unknown as Log);


let fakeLog2 = 
{
  "header": {
    "pcDate": "2022-10-20T08:08:17",
    "upsDate": "2022-10-20T06:37:18",
    "iniFile": [
      {
        "fileName": "MAPK_Unit_v1_7_8.ini",
        "unit": 0,
        "subUnit": 0
      },
      {
        "fileName": "MAPK_Unit_v1_7_8.ini",
        "unit": 1,
        "subUnit": 0
      },
      {
        "fileName": "MAPK_Module_RD_IV_v1_7_8.ini",
        "unit": 1,
        "subUnit": 1
      },
      {
        "fileName": "MAPK_ByPass_v1_7_8.ini",
        "unit": 1,
        "subUnit": 14
      }
    ]
  },
  "events": [
    {
      "date": "2022/08/02",
      "time": "13:26:25.458",
      "unit": 1,
      "subUnit": 0,
      "code": "S002",
      "description": "Load supplied by automatic Bypass",
      "value": false,
      "color": "0xFFE0FFFF"
    },
    {
      "date": "2022/08/02",
      "time": "13:26:25.457",
      "unit": 1,
      "subUnit": 0,
      "code": "S000",
      "description": "Load protected by inverter",
      "value": true,
      "color": "0xFFE0FFFF"
    }
  ],
  "fileName": "prova.csv"
}

export let mockLog2 : Log = new Log(fakeLog2 as unknown as Log);