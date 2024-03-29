﻿using Core;
using Microsoft.AspNetCore.Mvc;
using SmartLogStatistics.Repository;
using System.Net;
using SmartLogStatistics.Exceptions;

namespace SmartLogStatistics.Controller {
    /// <summary>
    /// Controller per la gestione delle chuamate post di 
    /// </summary>
    [Route("api")]
    [ApiController]
    public class UploadController : ControllerBase {

        /// <summary>
        /// Oggetto di tipo Parser dedicato al parsing dei file di log
        /// </summary>
        private readonly Parser LogParser;

        /// <summary>
        /// Repository che gestisce l'inserimento dei dati nel db
        /// </summary>
        private readonly UploadRepository Repository;

        /// <summary>
        /// Crea una nuova istanza del controller
        /// </summary>
        /// <param name="parser">Parser per i file di log</param>
        /// <param name="repository">Repository che gestisce l'inserimento dei dati nel database</param>
        public UploadController(Parser parser,UploadRepository repository)
        {
            LogParser = parser;
            Repository = repository;
        }

        /// <summary>
        /// Ritorna un JSON che rappresenta il file di log in ingresso (dopo essere stato filtrato)
        /// </summary>
        /// <param name="file">File di cui deve essere eseguito il parsing</param>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta il file di log o un'eccezione dovuta al parsing del file,
        ///             al fallito inserimento su database o alla connessione al database</returns>
        /// <response code="201">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nella conversione</response>
        /// <response code="409">Se c'è già il file caricato nel database</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpPost]
        [Route("upload")]
        [ProducesResponseType(StatusCodes.Status201Created)]
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

                return StatusCode((int)HttpStatusCode.Created);
            }
            catch (ParsingException e)
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ErrorObject(e.Code, e.Message));
            }
            catch (FileConflictException e)
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.Conflict, new ErrorObject(e.Code, e.Message));
            }
            catch (FailedConnectionException e)
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorObject(e.Code, e.Message));
            }
        }
    }
}




