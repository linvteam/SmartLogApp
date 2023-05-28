using Microsoft.AspNetCore.Mvc;
using SmartLogStatistics.Repository;
using SmartLogStatistics.Model;
using System.Net;

namespace SmartLogStatistics.Controller
{

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
        /// Ritorna le statistiche sui file analizzati
        /// </summary>
        /// <param name="startDateTime">Lower-bound temporale da cui prendere i file da analizzare</param>
        /// <param name="endDateTime">Upper-bound temporale da cui prendere i file da analizzare</param>
        /// <returns>Esito della chiamata GET, può essere un file JSON che rappresenta le statistiche sui file analizzati o un'eccezione dovuta ad una richiesta errata / ad un errore lato server</returns>
        /// <response code="200">Vengono ritornate le statistiche del database</response>
        /// <response code="400">Se le date non sono compatibili fra loro</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("{startDateTime}/{endDateTime}")]
        [ProducesResponseType(typeof(StatisticsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult Statistics(DateTime startDateTime, DateTime endDateTime)
        {
            if (startDateTime > endDateTime)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    new ErrorObject(3, "Le date non sono tra loro compatibili"));
            }

            try
            {
                StatisticsDto statistics = Repository.Statistics(startDateTime, endDateTime);
                return Ok(statistics);
            }
            catch (Exceptions.EmptyOrFailedQuery e)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    new ErrorObject(e.Code, e.Message));
            }
            catch (Exceptions.FailedConnection e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    new ErrorObject(e.Code, e.Message));
            }
        }
    }

}


