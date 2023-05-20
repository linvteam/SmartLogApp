# SmartLog
## Back-end
[![Build and Test](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml/badge.svg)](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml)
### Core Library
[![Line Coverage Core Status](./.github/badges/core/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage Core Status](./.github/badges/core/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)

### SmartLogViewer
[![Line Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)

### SmartLogStatistics
[![Line Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)

## Front-end

### SmartLogViewer

### SmartLogStatistics

Repository del sorgente di SmartLog

Build:
```bash
dotnet restore
dotnet build
```

Run tests & get test report:
```bash
dotnet test -p:ExcludeByFile="**/Program.cs" --no-build --verbosity normal -p:CollectCoverage=true -p:CoverletOutput=TestResults/ -p:CoverletOutputFormat=opencover
```
