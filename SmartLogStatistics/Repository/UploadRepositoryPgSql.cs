using SmartLogStatistics.Model;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace SmartLogStatistics.Repository {
    /// <summary>
    /// Classe che definisce la comunicazione con il database PostgreSQL per l'upload del file
    /// </summary>
    [Core.Injectables.Singleton(typeof(UploadRepository))]
    public class UploadRepositoryPgSql: UploadRepository {

        private readonly SmartLogContext context;

        /// <summary>
        /// Crea una nuova istanza del repository di upload
        /// </summary>
        /// <param name="context">Istanza del database</param>
        public UploadRepositoryPgSql(SmartLogContext context) {
            this.context = context;
        }

        /// <summary>
        /// Esegue l'upload di un file di log nel database PostgreSQL
        /// </summary>
        /// <param name="log">Il log da caricare</param>
        /// <exception cref="DbUpdateException">Eccezione lanciata quando avviene un errore nel caricamento del file sul database</exception>
        /// <exception cref="FileConflictException">Eccezione lanciata quando si tenta di caricare un file sul database già presente</exception>
        public void Upload(Core.Log log) {

            using var transaction = context.Database.BeginTransaction();
            try {
                //Prima di tutto inseriamo il file
                LogFile logFile = new() {
                    filename = log.FileName,
                    PC_datetime = log.Header.PCDate.ToUniversalTime(),
                    UPS_datetime = log.Header.UPSDate.ToUniversalTime(),
                };

                var checkQuery = from file in context.File where file.filename == log.FileName select file;
                var logFiles = checkQuery.ToList();

                //Se il file è gia presente nel database allora lancia un eccezione
                if(logFiles.Any()) {
                    throw new FileConflictException();
                }

                context.File.Add(logFile);
                context.SaveChanges();

                int fileId = logFile.id;

                //Poi inseriamo i firmware presenti nell'header
                List<Firmware> firmwares = log.Header.INIFile.ConvertAll(i => {
                    return new Firmware() {
                        file_id = fileId,
                        unit = i.Unit,
                        subunit = i.SubUnit,
                        INI_file_name = i.FileName
                    };
                });

                context.Firmware.AddRange(firmwares);
                context.SaveChanges();

                // Prendo la lista di eventi già presenti nel db
                List<Event> dbEvents = context.Event.Select(x => x).ToList();

                List<Log> logs = new();

                List<Event> events = new();

                for(int i = 0; i < log.Events.Count; i++) {

                    // Preparo la riga di log
                    logs.Add(new() {
                        file_id = fileId,
                        log_line = i,
                        date = log.Events[i].Date,
                        time = log.Events[i].Time,
                        unit = log.Events[i].Unit,
                        subunit = log.Events[i].SubUnit,
                        code = log.Events[i].Code,
                        value = log.Events[i].Value,
                    });

                    // Inserisco un nuovo evento solo se non è già presente nel db
                    if(dbEvents.Find(x => x.code == log.Events[i].Code) == null && events.Find(x => x.code == log.Events[i].Code) == null ) {
                        events.Add(new() {
                            code = log.Events[i].Code,
                            description = log.Events[i].Description,
                            color = log.Events[i].Color
                        });
                    }
                }

                // Salvo gli eventi nel db
                context.Event.AddRange(events);

                // Salvo i log nel db
                context.Log.AddRange(logs);
                context.SaveChanges();

                //Faccio il commit della transazione nel database
                transaction.Commit();

            } catch(DbUpdateException) {
                //In caso di errore, si fa il rollback e di conseguenza non si salva nulla sul DB
                transaction.Rollback();
                throw new FailedConnectionException();
            } catch(Exception) {
                transaction.Rollback();
                throw;
            }
        }
    }
}
