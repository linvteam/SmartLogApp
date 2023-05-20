# SmartLog

[![Build and Test](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml/badge.svg)](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml)
[![Line Coverage Core Status](./.github/badges/core/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage Core Status](./.github/badges/core/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Line Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Line Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)

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
