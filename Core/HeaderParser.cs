using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Threading.Tasks.Dataflow;

namespace Core {
    /// <summary>
    /// Classe che si occupa di leggere l'header di un file di log
    /// </summary>
    public class HeaderParser {

        /// <summary>
        /// Prova a leggere la riga del PCDateTime
        /// </summary>
        /// <param name="riga">La riga su cui provare a leggere le informazioni</param>
        /// <returns>DateTime del pc</returns>
        private DateTime PCDateParse(string riga) {
            string pattern = @"PC DateTime: (\d\d).(\d\d).(\d\d\d\d) (\d\d):(\d\d):(\d\d)";

            Regex regex = new(pattern);

            var matches = regex.Match(riga);
            if(matches.Captures.Count == 0) {
                throw new ParsingException("Impossibile leggere la riga PC DateTime");
            }

            var groups = matches.Groups;

            try {
                return new DateTime(
                    int.Parse(groups[3].Value),  // Anno
                    int.Parse(groups[2].Value),  // Mese
                    int.Parse(groups[1].Value),  // Giorno
                    int.Parse(groups[4].Value),  // Ora
                    int.Parse(groups[5].Value),  // Minuti
                    int.Parse(groups[6].Value)); // Secondi
            } catch(Exception) {
                throw new ParsingException("PCDateTime non valida");
            }
        }

        /// <summary>
        /// Prova a leggere la riga del UPSDateTime
        /// </summary>
        /// <param name="riga">Riga dati da cui provare a leggere i dati</param>
        /// <returns>DateTime dell'ups</returns>
        private DateTime UPSDateParse(string riga) {
            string pattern = @"UPS DateTime: (\d\d).(\d\d).(\d\d\d\d) (\d\d):(\d\d):(\d\d)";

            Regex regex = new(pattern);

            var matches = regex.Match(riga);
            if(matches.Captures.Count == 0) {
                throw new ParsingException("Impossibile parsare la riga UPS DateTime");
            }

            var groups = matches.Groups;

            try {
                return new DateTime(
                    int.Parse(groups[3].Value),  // Anno
                    int.Parse(groups[2].Value),  // Mese
                    int.Parse(groups[1].Value),  // Giorno
                    int.Parse(groups[4].Value),  // Ora
                    int.Parse(groups[5].Value),  // Minuti
                    int.Parse(groups[6].Value)); // Secondi
            } catch(Exception) {
                throw new ParsingException("UPSDateTime non valida");
            }

        }

        /// <summary>
        /// Prova a leggere una riga degli INI File 
        /// </summary>
        /// <param name="riga">La riga da leggere</param>
        /// <returns>Tupla con IniFileName, Unit e SubUnit</returns>
        private Tuple<string, int, int> INIFileParse(string riga) {
            string pattern = @"INI File name :  ([\w_]+_v\d+_\d+_\d+.ini); Unit=(\d+) - SubUnit=(\d+)";
            Regex regex = new(pattern);

            var matches = regex.Match(riga);
            if(matches.Captures.Count == 0) { throw new ParsingException("Impossibile parsare una riga di INI File"); }

            var groups = matches.Groups;

            // Questi int.Parse non possono lanciare una eccezione per nessun motivo in quanto è la regex che decide il formato.
            return new Tuple<string, int, int>(
                groups[1].Value,
                int.Parse(groups[2].Value),
                int.Parse(groups[3].Value));

        }

        /// <summary>
        /// Prova a leggere l'header di un file di log
        /// </summary>
        /// <param name="reader">Stream di lettura del file</param>
        /// <returns>L'header del file di log</returns>
        public Header Parse(TextReader reader) {

            string? riga = reader.ReadLine();
            if(riga == null)
                throw new ParsingException("Il file non contiene un header valido");
            DateTime pc = PCDateParse(riga);

            riga = reader.ReadLine();
            if(riga == null)
                throw new ParsingException("Il file non contiene un header valido");
            DateTime ups = UPSDateParse(riga);

            if(reader.Peek() != 'I')
                throw new ParsingException("Il file non contiene un header valido");

            List<Tuple<string, int, int>> inifiles = new();
            // Leggo la prima riga
            riga = reader.ReadLine();
            inifiles.Add(INIFileParse(riga));

            while(reader.Peek() == 'I') {
                riga = reader.ReadLine();
                inifiles.Add(INIFileParse(riga));
            }

            return new Header(pc, ups, inifiles);
        }
    }
}
