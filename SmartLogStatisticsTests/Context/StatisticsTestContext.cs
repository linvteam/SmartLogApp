using StoreApp.Tests;
using System.Data.Entity;

namespace SmartLogStatisticsTests.Context {
    internal class StatisticsTestContext: DbContext {

        public TestDb<SmartLogStatistics.Model.Event> Events { get; set; }
        public TestDb<SmartLogStatistics.Model.Log> Log { get; set; }
        public TestDb<SmartLogStatistics.Model.Firmware> Firmware { get; set; }
        public TestDb<SmartLogStatistics.Model.LogFile> LogFile { get; set; }
        

        public StatisticsTestContext() {
            Events = new();
            Log = new();
            Firmware = new();
            LogFile = new();
        }
    }
}
