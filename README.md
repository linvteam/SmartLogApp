# SmartLog

[![codecov](https://codecov.io/gh/linvteam/SmartLogApp/branch/master/graph/badge.svg?token=LLSSUS59CX)](https://codecov.io/gh/linvteam/SmartLogApp)
[![Build and Test](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml/badge.svg)](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml)


Repository del sorgente di SmartLog

Build:
```bash
dotnet restore
dotnet build
```

Run tests:
```bash
dotnet test /p:ExcludeByFile="**/Program.cs" --coverage:"XPlat Test Coverage"
```

Get test report:
```bash
reportgenerator -reports:CoreTests\TestResults\*\coverage.cobertura.xml -targetdir:TestReport
```
