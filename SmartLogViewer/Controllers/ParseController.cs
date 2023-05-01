using System.Net;
using Core;
using Microsoft.AspNetCore.Mvc;

namespace SmartLogViewer.Controllers
{
    /// <summary>
    /// Classe controller che gestisce le chiamate relative al parsing dei file di log
    /// </summary>
    [Route("api/parse")]
    [ApiController]
    public class ParseController: ControllerBase {
        /// <summary>
        /// Oggetto di tipo Parser dedicato al parsing dei file di log
        /// </summary>
        private readonly Parser _Parser;

        /// <summary>
        /// Crea una nuova istanza del controller
        /// </summary>
        /// <param name="parser">Parser per i file di log</param>
        public ParseController(Parser parser) {
            _Parser = parser;
        }

        /// <summary>
        /// Messaggio di errore del parsing
        /// </summary>
        /// <param name="Code">Codice di errore</param>
        /// <param name="Message">Messaggio che descrive l'errore</param>
        internal record ParseError(int Code, string Message);

        /// <summary>
        /// Ritorna un JSON che rappresenta il file di log in ingresso (dopo essere stato filtrato)
        /// </summary>
        /// <param name="file">File di cui deve essere eseguito il parsing</param>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta il file di log o un'eccezione dovuta al parsing del file</returns>
        /// <response code="201">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nella conversione</response>
        [HttpPost]
        [ProducesResponseType(typeof(Log), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ParseError), StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public IActionResult Upload(IFormFile file)
        {
            string filename = file.FileName;                                    // Nome del file
            TextReader reader = new StreamReader(file.OpenReadStream());        // Stream di lettura
            try
            {
                var log = _Parser.Parse(filename, reader);
                reader.Close();
                return StatusCode((int)HttpStatusCode.Created, log);
            }
            catch (ParsingException e)
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ParseError(e.Code, e.Message));
            }
        }

        
    }
}

