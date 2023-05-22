using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using SmartLogStatistics.Model;
using System.Diagnostics;
using Core;
using SmartLogStatistics.Exceptions;

namespace SmartLogStatistics.Repository {

    [Core.Injectables.Singleton(typeof(InfoRepository))]
    public class InfoRepositoryPgSql : InfoRepository {

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
            try{
                List<CodeWithDescriptionDto> result = this.context.Event
                                                          .OrderBy(e=>e.code)
                                                          .Select(e => new CodeWithDescriptionDto(e.code, e.description))
                                                          .ToList();
                
                if(!(result.Any())) throw new EmptyOrFailedQuery();
                
                return result;
            }
            catch(EmptyOrFailedQuery e){
                throw;
            }
            catch {
                throw new FailedConnection();
            }
        }


        public DateTimeIntervalDto GetTimeInterval() {
            try {
                IQueryable<DateTime> timestamps = this.context.Log
                                                      .OrderBy(l => l.date.ToDateTime(l.time))
                                                      .Select(l => l.date.ToDateTime(l.time));

                if(!(timestamps.Any())) throw new EmptyOrFailedQuery();
                
                return new DateTimeIntervalDto(timestamps.First(), timestamps.Last());
            }
            catch(EmptyOrFailedQuery e){
                throw;
            }
            catch {
                throw new FailedConnection();
            }

        }

        public List<string> GetFirmwareList() {
            try{
                List<string> result = new(this.context.Firmware
                                            .GroupBy(f => f.INI_file_name)
                                            .OrderBy(f=>f.Key)
                                            .Select(f => f.Key)
                                            .ToList());
                if(!(result.Any())) throw new EmptyOrFailedQuery();
                return result;
            }
            catch(EmptyOrFailedQuery e) {
                throw;
            }
            catch {
                throw new FailedConnection();
            }
        }
    }
}
