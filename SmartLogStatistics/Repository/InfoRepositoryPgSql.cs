using SmartLogStatistics.Model;
using System.Diagnostics;

namespace SmartLogStatistics.Repository {
    
    [Core.Injectables.Singleton(typeof(InfoRepository))]
    public class InfoRepositoryPgSql: InfoRepository {

        private readonly SmartLogContext context;

        /// <summary>
        ///
        /// </summary>
        /// <param name="db"> Il context che si connette al database</param>
        public InfoRepositoryPgSql(SmartLogContext db) {
            context = db;
        }

        /// <summary>
        /// Comunica col database per restituire la lista di tutti i codici con le loro descrizioni
        /// </summary>
        /// <returns>La lista di codici con le descrizioni</returns>
        public List<CodeWithDescriptionDto> GetCodesWithDescription() {

            
            List<CodeWithDescriptionDto> result = this.context.Event
                                                      .Select(l => new CodeWithDescriptionDto(l.code, l.description))
                                                      .ToList();

            // return new List<CodeWithDescriptionDto>(){new(e.code, e.description)};
            return result;
        }


        public DateTimeIntervalDto GetTimeInterval() {
            throw new NotImplementedException();
        }

        public List<string> GetFirmwareList() {
            throw new NotImplementedException();
        }
    }
}
