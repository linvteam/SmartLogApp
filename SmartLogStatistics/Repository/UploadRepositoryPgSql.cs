
using SmartLogStatistics.Model;

namespace SmartLogStatistics.Repository {
    public class UploadRepositoryPgSql : UploadRepository {

        private readonly SmartLogContext context;

        public UploadRepositoryPgSql(SmartLogContext context) {
            this.context = context;
        }
        public void Upload(Core.Log log) {

            //Prima di tutto inseriamo il file
            LogFile logFile = new()
            {
                filename = log.FileName,
                PC_datetime = log.Header.PCDate,
                UPS_datetime = log.Header.UPSDate
            };

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
            });

            //Poi salvo le righe di log
            for (int i = 0; i < log.Events.Count; i++) {

                Log logLine = new()
                {
                    file_id = fileId,
                    log_line = i,
                    date = log.Events[i].Date,
                    time = log.Events[i].Time,
                    code = log.Events[i].Code,
                    value = log.Events[i].Value,
                };

                //Nel caso in cui l'evento trovato non sia ancora presente nel DB
                if (context.Event.Find(log.Events[i].Code) is null) {
                    Event e = new() 
                    {   
                        code = log.Events[i].Code,
                        description = log.Events[i].Description,
                        color = log.Events[i].Color
                    };

                    context.Event.Add(e);
                }

                context.Log.Add(logLine);
            }

            //Alla fine salvo nel database
            context.SaveChanges();


        }
    }
}
