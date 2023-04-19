using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace Core {
    /// <summary>
    /// Classe wrapper per la libreria CsvHelper che si occupa di leggere e filtrare i dati contenuti del log
    /// </summary>
    public class DataParser {

        /// <summary>
        /// Legge il contenuto del file CSV e ritorna tutte le righe contenti i dati con campo Type/UM pari a BIN
        /// </summary>
        /// <param name="reader">Lo stream di lettura</param>
        /// <returns>Lista di tutti gli elementi che compongono il file di log</returns>
        /// <exception cref="ParsingException">Se la libreria non fosse in grado di leggere una riga</exception>
        public List<LogRow> Parse(TextReader reader) {
            List<LogRow> logContent = new();

            var configuration = new CsvConfiguration(CultureInfo.InvariantCulture) {
                Delimiter = ";",
                // È necessario impostare il trim perchè è tutto circondato da spazi, altrimenti considera anche quelli come informazione valida
                TrimOptions = TrimOptions.Trim, // Trim sui dati
                PrepareHeaderForMatch = args => args.Header.Trim(), // Trim sull'header
            };

            using(var csv = new CsvReader(reader, configuration)) {
                try {
                    csv.Read();
                    csv.ReadHeader();
                } catch {
                    throw new ParsingException("Impossibile analizzare il file CSV, header non presente", ParsingException.ErrorCode.FormatoErrato);
                }
                while(csv.Read()) {
                    RawLogRow? row;
                    try {
                        row = csv.GetRecord<RawLogRow>();
                    } catch {
                        throw new ParsingException("Impossibile analizzare il contenuto del file CSV", ParsingException.ErrorCode.FormatoErrato);
                    }
                    if(row == null)
                        throw new ParsingException("Impossibile leggere il file CSV", ParsingException.ErrorCode.FormatoErrato);

                    LogRow? converted_row = Filter(row);
                    if(converted_row != null) {
                        logContent.Add(converted_row);
                    }
                }

            }

            return logContent;
        }

        /// <summary>
        /// Filtra una riga del log tenendo e convertendo solo quelle nel quale il campo Type/UM è pari a BIN
        /// </summary>
        /// <param name="row">Riga non elaborata del log</param>
        /// <returns>Riga convertita del file di log</returns>
        /// <exception cref="ParsingException">Lanciata nel caso una riga non si può convertire</exception>
        private LogRow? Filter(RawLogRow row) {
            if(row.Type != "BIN")
                return null;

            // Converto il valore di value
            bool value = row.Value == "ON";

            // Converto la data
            Regex dateRegex = new Regex(@"(\d\d)/(\d\d)/(\d\d\d\d)");
            Match match = dateRegex.Match(row.Date);
            if(!match.Success) {
                throw new ParsingException("Impossibile convertire i dati", ParsingException.ErrorCode.DatoErrato);
            }
            DateOnly data = new DateOnly(
                int.Parse(match.Groups[3].Value),
                int.Parse(match.Groups[2].Value),
                int.Parse(match.Groups[1].Value));

            // Converto l'ora
            Regex timeRegex = new Regex(@"(\d\d):(\d\d):(\d\d)\.(\d\d\d)");
            match = timeRegex.Match(row.Time);
            if(!match.Success) {
                throw new ParsingException("Impossibile eseguire l'analisi dei dati", ParsingException.ErrorCode.DatoErrato);
            }

            TimeOnly time = new TimeOnly(
                int.Parse(match.Groups[1].Value),
                int.Parse(match.Groups[2].Value),
                int.Parse(match.Groups[3].Value),
                int.Parse(match.Groups[4].Value));

            return new LogRow(data, time, row.Unit, row.SubUnit, row.Code, row.Description, value, row.Color);
        }
    }
}
