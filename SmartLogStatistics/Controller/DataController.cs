using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace SmartLogStatistics.Controller
{
    /// <summary>
    /// Controller per ottenre dei dati estratti dai file di log
    /// </summary>
    [Route("api/data")]
    [ApiController]
    public class DataController : ControllerBase
    {
        /// <summary>
        /// Oggetto di tipo UploadRepository
        /// </summary>
        private readonly DataRepository Repository;

        /// <summary>
        /// Crea una nuova istanza del controller
        /// </summary>
        /// <param name="repository">Repository per la gestione delle query</param>
        public DataController(DataRepository repository)
        {
            Repository = repository;
        }

        /// <summary>
        /// Ritorna un JSON che rappresenta gli eventi nell’intervallo temporale dato, raggruppati per i campi specificati
        /// </summary>
        /// <param name="startDateTime">Data di inizio per prelavare i dati</param>
        /// <param name="endDateTime">Data di fine per prelavre id dati</param>
        /// <param name="d">Indica se i dati devono essere raggruppati per data</param>
        /// <param name="f">Indica se i dati devono essere raggruppati per firmware</param>
        /// <param name="u">Indica se i dati devono essere raggruppati per unit</param>
        /// <param name="s">Indica se i dati devono essere raggruppati per subunit</param>
        /// <returns>Esito della chiamata GET, può essere un JSON che rappresenta gli eventi raggruppati o un'eccezione dovuta ad errori nella query o con il database</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("frequency/{startDateTime}/{endDateTime}")]
        [ProducesResponseType(typeof(FrequencyDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult Frequency([FromRoute] DateTime startDateTime, [FromRoute]DateTime endDateTime, [FromQuery, DefaultValue(false)] bool d, [FromQuery, DefaultValue(false)] bool f, [FromQuery, DefaultValue(false)] bool u, [FromQuery, DefaultValue(false)] bool s)
        {
            if (startDateTime > endDateTime)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, "I parametri non sono corretti");
            }
            else
            {
                try
                {
                    FrequencyDto data = Repository.Frequency(startDateTime, endDateTime, d, f, u, s);

                    return StatusCode((int)HttpStatusCode.OK, data);
                }
                catch (Exception)
                {                           
                    return StatusCode((int)HttpStatusCode.InternalServerError, 
                        new ErrorObject(5, "Si è verificato un errore durante la connessione"));
                }
            }
        }

        /// <summary>
        /// Ritorna un JSON che rappresenta i DateTime compresi nell’intervallo temporale dato in cui si `e verificato l’evento specificato tramite il code
        /// </summary>
        /// <param name="startDateTime">Indica la data di inizio degli eventi da prelevare</param>
        /// <param name="endDateTime">Indica la data di fine degli eventi da prelevare</param>
        /// <param name="code">Indica il code degli eventi da prelevare</param>
        /// <returns>Esito della chiamata GET, può essere un JSON che rappresenta l'andamento cumulativo di un code o un'eccezione dovuta ad errori nella query o con il database</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("cumulative/{startDateTime}/{endDateTime}/{code}")]
        [ProducesResponseType(typeof(CumulativeDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult Cumulative([FromRoute]DateTime startDateTime, [FromRoute] DateTime endDateTime, [FromRoute]string code)
        {
            if (startDateTime > endDateTime)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, "I parametri non sono corretti");
            }
            else
            {
                try
                {
                    CumulativeDto data = Repository.Cumulative(startDateTime, endDateTime, code);

                    return StatusCode((int)HttpStatusCode.OK, data);
                }
                catch (Exception)         
                {                           
                    return StatusCode((int)HttpStatusCode.InternalServerError,
                        new ErrorObject(5, "Si è verificato un errore durante la connessione"));
                }
            }
        }

        /// <summary>
        /// Ritorna un JSON che rappresenta gli eventi eventi e il numero di occorrenze, compresi nell’intervallo temporale dato
        /// </summary>
        /// <param name="startDateTime">Indica la data di inizio degli eventi da prelevare</param>
        /// <param name="endDateTime">Indica la data di fine degli eventi da prelevare</param>
        /// <returns>Esito della chiamata GET, può essere un JSON che rappresenta il numero di occorrenze di un certo code o un'eccezione dovuta ad errori nella query o con il database</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("totalbycode/{startDateTime}/{endDateTime}")]
        [ProducesResponseType(typeof(TotalByCodeDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult TotalByCode([FromRoute] DateTime startDateTime, [FromRoute]DateTime endDateTime)
        {
            if (startDateTime > endDateTime)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, "I parametri non sono corretti");
            }
            else
            {
                try
                {
                    TotalByCodeDto data = Repository.TotalByCode(startDateTime, endDateTime);

                    return StatusCode((int)HttpStatusCode.OK, data);
                }
                catch (Exception)
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError,
                        new ErrorObject(5, "Si è verificato un errore durante la connessione"));
                }
            }
        }


        /// <summary>
        /// Ritorna un JSON che rappresenta il numero di occorrenze, raggruppati per versione firmware, compresi nell’intervallo temporale dato in cui si è verificato l’evento specificato tramite il code
        /// </summary>
        /// <param name="startDateTime">Indica la data di inizio degli eventi da prelevare</param>
        /// <param name="endDateTime">Indica la data di fine degli eventi da prelevare</param>
        /// <param name="code">Indica il code degli eventi da prelevare</param>
        /// <returns>Esito della chiamata GET, può essere un JSON che rappresenta gli eventi di un certo code raggruppati per versioni del firmware o un'eccezione dovuta ad errori nella query o con il database</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("totalbyfirmware/{startDateTime}/{endDateTime}/{code}")]
        [ProducesResponseType(typeof(TotalByFirmwareDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult TotalByFirmware([FromRoute] DateTime startDateTime, [FromRoute]DateTime endDateTime, [FromRoute]string code)
        {
            if (startDateTime > endDateTime)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, "I parametri non sono corretti");
            }
            else
            {
                try
                {
                    TotalByFirmwareDto data = Repository.TotalByFirmware(startDateTime, endDateTime, code);

                    return StatusCode((int)HttpStatusCode.OK, data);
                }
                catch (Exception)
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError,
                        new ErrorObject(5, "Si è verificato un errore durante la connessione"));
                }
            }
        }
    }
}
