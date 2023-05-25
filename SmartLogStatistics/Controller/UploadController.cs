using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging.Licenses;
using SmartLogStatistics.Repository;
using System.Net;

namespace SmartLogStatistics.Controller
{
    [Route("api/upload")]
    [ApiController]
    public class UploadController : ControllerBase {

        /// <summary>
        /// Oggetto di tipo Parser dedicato al parsing dei file di log
        /// </summary>
        private readonly Parser LogParser;
        private UploadRepository Repository;

        /// <summary>
        /// Crea una nuova istanza del controller
        /// </summary>
        /// <param name="parser">Parser per i file di log</param>
        public UploadController(Parser parser,UploadRepository repository)
        {
            LogParser = parser;
            Repository = repository;
        }

        /// <summary>
        /// Ritorna un JSON che rappresenta il file di log in ingresso (dopo essere stato filtrato)
        /// </summary>
        /// <param name="file">File di cui deve essere eseguito il parsing</param>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta il file di log o un'eccezione dovuta al parsing del file</returns>
        /// <response code="201">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nella conversione</response>
        /// <response code="409">Se c'è già il file caricato nel database</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpPost]
        [ProducesResponseType(typeof(Log), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult Upload(IFormFile file)
        {
            string filename = file.FileName;                                    // Nome del file
            TextReader reader = new StreamReader(file.OpenReadStream());        // Stream di lettura
            try
            {
                var log = LogParser.Parse(filename, reader);
                reader.Close();

                Repository.Upload(log);

                return StatusCode((int)HttpStatusCode.Created, log);
            }
            catch (ParsingException e)
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ErrorObject(e.Code, e.Message));
            }
            /* catch (Exception e)       //TODO cambiare l'exception CONFLICT
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ErrorObject(e.Code, e.Message));
            }
            catch (Exception e)       //TODO cambiare l'exception ERRORE DATABASE
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ErrorObject(e.Code, e.Message));
            }*/
        }
    }
}




