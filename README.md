# SmartLog
## Back-end
[![Build and Test](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml/badge.svg)](https://github.com/linvteam/SmartLogApp/actions/workflows/dotnet.yml)
### Core Library
[![Line Coverage Core Status](./.github/badges/core/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage Core Status](./.github/badges/core/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)

### SmartLogViewer
[![Line Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/backend/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/backend/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)

### SmartLogStatistics
[![Line Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/backend/coverage-badge-line.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)
[![Branch Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/backend/coverage-badge-branch.svg)](https://github.com/danpetitt/open-cover-badge-generator-action/)

## Front-end

### SmartLogViewer
[![General Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/frontend/coverage.svg)](./.github/badges/smartlogviewer/frontend/coverage.svg)
[![Branch Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/frontend/coverage-branches.svg)](./.github/badges/smartlogviewer/frontend/coverage-branches.svg)
[![Functions Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/frontend/coverage-functions.svg)](./.github/badges/smartlogviewer/frontend/coverage-functions.svg)
[![Lines Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/frontend/coverage-lines.svg)](./.github/badges/smartlogviewer/frontend/coverage-lines.svg)
[![Statements Coverage SmartLogViewer Status](./.github/badges/smartlogviewer/frontend/coverage-statements.svg)](./.github/badges/smartlogviewer/frontend/coverage-statements.svg)

### SmartLogStatistics
[![General Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/frontend/coverage.svg)](./.github/badges/smartlogstatistics/frontend/coverage.svg)
[![Branch Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/frontend/coverage-branches.svg)](./.github/badges/smartlogstatistics/frontend/coverage-branches.svg)
[![Functions Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/frontend/coverage-functions.svg)](./.github/badges/smartlogstatistics/frontend/coverage-functions.svg)
[![Lines Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/frontend/coverage-lines.svg)](./.github/badges/smartlogstatistics/frontend/coverage-lines.svg)
[![Statements Coverage SmartLogStatistics Status](./.github/badges/smartlogstatistics/frontend/coverage-statements.svg)](./.github/badges/smartlogstatistics/frontend/coverage-statements.svg)

## Comandi

### Build
```bash
dotnet restore
dotnet build
```

### Run tests & get test report

Core library:

```bash
dotnet test CoreTests --no-build --verbosity normal -p:CollectCoverage=true -p:CoverletOutput=TestResults/ -p:CoverletOutputFormat=opencover -p:Exclude="[]Core.Injectables" -p:ExcludeByFile="**/Program.cs"
```

SmartLogViewer:

```bash
dotnet test SmartLogViewerTests --no-build --verbosity normal -p:CollectCoverage=true -p:CoverletOutput=TestResults/ -p:CoverletOutputFormat=opencover -p:Exclude="[*]Core*" -p:ExcludeByFile="**/Program.cs"
```

SmartLogViewer Frontend:
```bash
cd SmartLogViewer\Frontend
npm install
npm test
```

SmartLogStatistics:

```bash
dotnet test SmartLogStatisticsTests --no-build --verbosity normal -p:CollectCoverage=true -p:CoverletOutput=TestResults/ -p:CoverletOutputFormat=opencover -p:Exclude="[*]Core*%2c[*]SmartLogStatistics.Migrations*" -p:ExcludeByFile="**/Program.cs"
```

SmartLogStatistics Frontend:
```bash
cd SmartLogStatistics\Frontend
npm install
npm test
```

### Publish:

SmartLogViewer:

```bash
dotnet publish SmartLogViewer -c Release --self-contained=true --use-current-runtime -p:PublishSingleFile=true -p:PublishTrimmed=true
```

SmartLogStatistics:

```bash
dotnet publish SmartLogStatistics -c Release --self-contained=true --use-current-runtime -p:PublishSingleFile=true -p:PublishTrimmed=true
```
