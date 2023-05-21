using SmartLogStatistics.Model;
using System.Diagnostics;

namespace SmartLogStatistics.Repository {
    public class InfoRepositoryPgSql: InfoRepository {

        private readonly SmartLogContext context;

        public InfoRepositoryPgSql(SmartLogContext db) {
            context = db;
        }

        /// <summary>
        /// Comunica col database per restituire la lista di tutti i codici con le loro descrizioni
        /// </summary>
        /// <returns>La lista di codici con le descrizioni</returns>
        public List<CodeWithDescriptionDto> GetCodesWithDescription() {

            try {
                return new List<CodeWithDescriptionDto>(){new("Prova", "DescrizioneProva")};
                

            } catch(Exception e) {
                Debug.WriteLine($"ECCEZIONE {e.Message}");
                return new List<CodeWithDescriptionDto>(){new("", "")};
            }
        }

        public DateTimeIntervalDto GetTimeInterval() {
            throw new NotImplementedException();
        }

        public List<string> GetFirmwareList() {
            throw new NotImplementedException();
        }
    }
}
