using Microsoft.AspNetCore.Mvc;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Model;
using System.Net;

[Route("api/statistics")]
[ApiController]
public class StatisticsController : ControllerBase
{
        /// <summary>
        /// Oggetto di tipo StatisticsRepository dedicato all'acquisizione di statistiche sui file di log analizzati
        /// </summary>
        private StatisticsRepository Repository;

        /// <summary>
        /// Crea una nuova istanza del controller
        /// </summary>
        /// <param name="repository">Oggetto dedicato all'acquisizione di statistiche sui i file di log analizzati</param>
        public StatisticsController(StatisticsRepository repository)
        {
            Repository = repository;
        }

        /// <summary>
        /// Messaggio di errore dell'API
        /// </summary>
        /// <param name="Code">Codice di errore</param>
        /// <param name="Message">Messaggio che descrive l'errore</param>
        internal record ApiError(int Code, string Message);

        /// <summary>
        /// Ritorna le statistiche sui file analizzati
        /// </summary>
        /// <param name="start">Lower-bound temporale da cui prendere i file da analizzare</param>
        /// <param name="end">Upper-bound temporale da cui prendere i file da analizzare</param>
        /// <returns>Esito della chiamata GET, può essere un file JSON che rappresenta le statistiche sui file analizzati o un'eccezione dovuta ad una richiesta errata / ad un errore lato server</returns>
        /// <response code="200">Vengono ritornate le statistiche del database</response>
        /// <response code="400">Se le date non sono compatibili fra loro</response>
        /// <response code="400">Se le date hanno un formato non corretto</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("{startDateTime}/{endDateTime}")]
        [ProducesResponseType(typeof(StatisticsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult Statistics(DateTime start, DateTime end)
        {
            if(start == null || end == null) {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    new ApiError(4, "Le date presentano un formato non corretto"));
            } else if (start > end) {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    new ApiError(3, "Le date non sono tra loro compatibili"));
            } else {
                try
                {
                    StatisticsDto statistics = Repository.Statistics(start, end);
                    return Ok(statistics);
                }
                catch (Exception e)
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError,
                        new ApiError(5, "Se è verificato un errore alla connessione"));
                }
            }
        }
}




