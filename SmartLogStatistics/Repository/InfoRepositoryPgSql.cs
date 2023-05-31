using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using SmartLogStatistics.Model;
using System.Diagnostics;
using Core;
using SmartLogStatistics.Exceptions;

namespace SmartLogStatistics.Repository {

    /// <summary>
    /// Classe che gestisce il fetch dal database delle informazioni aggiuntive sui dati del database
    /// </summary>
    [Core.Injectables.Singleton(typeof(InfoRepository))]
    public class InfoRepositoryPgSql : InfoRepository {

        private readonly SmartLogContext context;

        /// <summary>
        /// Costruisce un nuovo oggetto di tipo InfoRepositoryPgSql
        /// </summary>
        /// <param name="db"> Il context che si connette al database</param>
        public InfoRepositoryPgSql(SmartLogContext db) {
            context = db;
        }

        /// <summary>
        /// Comunica col database per restituire la lista di tutti i codici con le loro descrizioni
        /// ordinata per code in ordine alfabetico
        /// </summary>
        /// <returns>La lista di codici con le descrizioni</returns>
        public List<CodeWithDescriptionDto> GetCodesWithDescription() {
            try{
                List<CodeWithDescriptionDto> result = this.context.Event
                                                          .OrderBy(e=>e.code)
                                                          .Select(e => new CodeWithDescriptionDto(e.code, e.description))
                                                          .ToList();
                
                //Viene lanciata questa eccezione quando la query non produce risultati
                //questo tendenzialmente può accadere solo quando il db è vuoto
                if(!(result.Any())) throw new EmptyOrFailedQueryException();
                
                return result;
            }
            catch(EmptyOrFailedQueryException e){
                throw;
            }
            catch {
                throw new FailedConnectionException();
            }
        }


        /// <summary>
        /// Metodo che connettendosi con il database ottiene il minimo e il massimo delle date degli eventi all'interno del database
        /// </summary>
        /// <returns>Oggeddo di tipo DateTImeIntervalDto con la data minima e la data massima</returns>
        /// <exception cref="EmptyOrFailedQueryException"></exception>
        /// <exception cref="FailedConnectionException"></exception>
        public DateTimeIntervalDto GetTimeInterval() {
            try {
                //Mi prendo tutte le date ordinate così da poter prendere la prima e l'ultima dalla lista
                IQueryable<DateTime> timestamps = this.context.Log
                                                      .OrderBy(l => l.date.ToDateTime(l.time))
                                                      .Select(l => l.date.ToDateTime(l.time));

                //Viene lanciata questa eccezione quando la query non produce risultati
                //questo tendenzialmente può accadere solo quando il db è vuoto
                if(!(timestamps.Any())) throw new EmptyOrFailedQueryException();
                
                return new DateTimeIntervalDto(timestamps.First(), timestamps.Last());
            }
            catch(EmptyOrFailedQueryException e){
                throw;
            }
            catch {
                throw new FailedConnectionException();
            }

        }

        /// <summary>
        /// Metodo che connettendosi con il database ottiene una lista di tutti i firmware senza ripetizioni
        /// ordinata in ordine alfabetico
        /// </summary>
        /// <returns>La lista di firmware ordinata in ordine alfabetico</returns>
        /// <exception cref="EmptyOrFailedQueryException"></exception>
        /// <exception cref="FailedConnectionException"></exception>
        public List<string> GetFirmwareList() {
            try{
                List<string> result = new(this.context.Firmware
                                            .GroupBy(f => f.INI_file_name)
                                            .OrderBy(f=>f.Key)
                                            .Select(f => f.Key)
                                            .ToList());
                
                //Viene lanciata questa eccezione quando la query non produce risultati
                //questo tendenzialmente può accadere solo quando il db è vuoto
                if(!(result.Any())) throw new EmptyOrFailedQueryException();
                return result;
            }
            catch(EmptyOrFailedQueryException e) {
                throw;
            }
            catch {
                throw new FailedConnectionException();
            }
        }
    }
}
