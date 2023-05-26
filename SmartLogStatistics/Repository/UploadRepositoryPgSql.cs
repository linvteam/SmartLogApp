using SmartLogStatistics.Model;
using SmartLogStatistics.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace SmartLogStatistics.Repository {
    /// <summary>
    /// Classe che definisce la comunicazione con il database PostgreSQL per l'upload del file
    /// </summary>
    [Core.Injectables.Singleton(typeof(UploadRepository))]
    public class UploadRepositoryPgSql : UploadRepository {

        private readonly SmartLogContext context;

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
            try
            {
                //Prima di tutto inseriamo il file
                LogFile logFile = new()
                {
                    filename = log.FileName,
                    PC_datetime = log.Header.PCDate.ToUniversalTime(),
                    UPS_datetime = log.Header.UPSDate.ToUniversalTime(),
                };

                var checkQuery = from file in context.File where file.filename == log.FileName select file;
                var logFiles = checkQuery.ToList();

                //Se il file è gia presente nel database allora lancia un eccezione
                if (logFiles.Any())
                {
                    throw new FileConflictException();
                }

                context.File.Add(logFile);
                context.SaveChanges();

                int fileId = logFile.id;

                //Poi inseriamo i firmware presenti nell'header
                log.Header.INIFile.ForEach(i =>
                {
                    Firmware firmware = new()
                    {
                        file_id = fileId,
                        unit = i.Unit,
                        subunit = i.SubUnit,
                        INI_file_name = i.FileName
                    };

                    context.Firmware.Add(firmware);
                    context.SaveChanges();
                });

                List<string> newEvents = new();
                //Poi salvo le righe di log
                for (int i = 0; i < log.Events.Count; i++)
                {

                    Log logLine = new()
                    {
                        file_id = fileId,
                        log_line = i,
                        date = log.Events[i].Date,
                        time = log.Events[i].Time,
                        unit = log.Events[i].Unit,
                        subunit = log.Events[i].SubUnit,
                        code = log.Events[i].Code,
                        value = log.Events[i].Value,
                    };

                    //Nel caso in cui l'evento trovato nella riga non sia ancora presente nel DB lo aggiungo agli eventi
                    if (context.Event.Find(log.Events[i].Code) is null && !newEvents.Contains(log.Events[i].Code))
                    {
                        Event e = new()
                        {
                            code = log.Events[i].Code,
                            description = log.Events[i].Description,
                            color = log.Events[i].Color
                        };

                        newEvents.Add(log.Events[i].Code);
                        context.Event.Add(e);
                    }

                    context.Log.Add(logLine);
                    context.SaveChanges();
                }

                //Faccio il commit della transazione nel database
                transaction.Commit();

            }
            catch (DbUpdateException)
            {
                //In caso di errore, si fa il rollback e di conseguenza non si salva nulla sul DB
                transaction.Rollback();
                throw new FailedConnection();
            }catch (Exception ex) { 
                transaction.Rollback();
                throw ex;
            }
        }
    }
}
