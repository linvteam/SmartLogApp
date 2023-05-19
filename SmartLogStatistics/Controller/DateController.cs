using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartLogStatistics.Model;
using SmartLogStatistics.Repository;
using System;
using System.Net;

namespace SmartLogStatistics.Controller
{
    [Route("api/data")]
    [ApiController]
    public class DataController : ControllerBase
    {
        /// <summary>
        /// Oggetto di tipo UploadRepository
        /// </summary>
        private DataRepository Repository;

        /// <summary>
        /// Crea una nuova istanza del controller
        /// </summary>
        public DataController(DataRepository repository)
        {
            Repository = repository;
        }

        /// <summary>
        /// Messaggio di errore del GET DataController, record utilizzato per una corretta serializzazione di ApiError
        /// </summary>
        /// <param name="Code">Codice di errore</param>
        /// <param name="Message">Messaggio che descrive l'errore</param>
        internal record ApiError(int Code, string Message);

        /// <summary>
        /// Ritorna un JSON che rappresenta gli eventi nell’intervallo temporale dato, raggruppati per i campi specificati
        /// </summary>
        /// <param name="file">File di cui deve essere eseguito il parsing</param>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta il file di log o un'eccezione dovuta al parsing del file</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpPost]
        [Route("frequency/{startDateTime}/{endDateTime}?d={dataBool}&f={firmwareBool}&u={unitBool}&s={subunitBool}")]
        [ProducesResponseType(typeof(FrequencyDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult Frequency(DateTime startDateTime, DateTime endDateTime, bool dataBoold, bool firmwareBool, bool unitBool, bool subunitBool)
        {
            try
            {

                FrequencyDto data = Repository.Frequency(startDateTime, endDateTime, dataBoold, firmwareBool, unitBool, subunitBool);

                return StatusCode((int)HttpStatusCode.OK, data);
            }
            catch (Exception e)         //
            {                           // DA ELIMINARE UNA VOLTA AGGIUNTI GLI ERRORI
                return null;            //
            }
            /*catch (Exception e)     //TODO cambiare l'exception ERRORE DATA
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }
            catch (Exception e)       //TODO cambiare l'exception ERRORE DATABASE
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }*/
        }

        /// <summary>
        /// Ritorna un JSON che rappresenta i DateTime compresi nell’intervallo temporale dato in cui si `e verificato l’evento specificato tramite il code
        /// </summary>
        /// <param name="file">File di cui deve essere eseguito il parsing</param>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta il file di log o un'eccezione dovuta al parsing del file</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpPost]
        [Route("cumulative//{start-DateTime}/{end-DateTime}/{code}")]
        [ProducesResponseType(typeof(CumulativeDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult Cumulative(DateTime startDateTime, DateTime endDateTime, string code)
        {
            try
            {

                CumulativeDto data = Repository.Cumulative(startDateTime, endDateTime, code);

                return StatusCode((int)HttpStatusCode.OK, data);
            }
            catch (Exception e)         //
            {                           // DA ELIMINARE UNA VOLTA AGGIUNTI GLI ERRORI
                return null;            //
            }
            /*catch (Exception e)     //TODO cambiare l'exception ERRORE DATA
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }
            catch (Exception e)       //TODO cambiare l'exception ERRORE DATABASE
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }*/
        }

        /// <summary>
        /// Ritorna un JSON che rappresenta gli eventi eventi e il numero di occorrenze, compresi nell’intervallo temporale dato
        /// </summary>
        /// <param name="file">File di cui deve essere eseguito il parsing</param>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta il file di log o un'eccezione dovuta al parsing del file</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpPost]
        [Route("totalbycode/{start-DateTime}/{end-DateTime}")]
        [ProducesResponseType(typeof(TotalByCodeDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult TotalByCode(DateTime startDateTime, DateTime endDateTime)
        {
            try
            {

                TotalByCodeDto data = Repository.TotalByCode(startDateTime, endDateTime);

                return StatusCode((int)HttpStatusCode.OK, data);
            }
            catch (Exception e)         //
            {                           // DA ELIMINARE UNA VOLTA AGGIUNTI GLI ERRORI
                return null;            //
            }
            /*catch (Exception e)     //TODO cambiare l'exception ERRORE DATA
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }
            catch (Exception e)       //TODO cambiare l'exception ERRORE DATABASE
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }*/
        }


        /// <summary>
        /// Ritorna un JSON che rappresenta il numero di occorrenze, raggruppati per versione firmware, compresi nell’intervallo temporale dato in cui si `e verificato l’evento specificato tramite il cod
        /// </summary>
        /// <param name="file">File di cui deve essere eseguito il parsing</param>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta il file di log o un'eccezione dovuta al parsing del file</returns>
        /// <response code="200">Ritorna il file convertito</response>
        /// <response code="400">Se c'è stato un errore nelle date</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpPost]
        [Route("totalbyfirmware/{start-DateTime}/{end-DateTime}/{code}")]
        [ProducesResponseType(typeof(TotalByFirmwareDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiError), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult TotalByFirmware(DateTime startDateTime, DateTime endDateTime, string code)
        {
            try
            {

                TotalByFirmwareDto data = Repository.TotalByFirmware(startDateTime, endDateTime, code);

                return StatusCode((int)HttpStatusCode.OK, data);
            }
            catch (Exception e)         //
            {                           // DA ELIMINARE UNA VOLTA AGGIUNTI GLI ERRORI
                return null;            //
            }
            /*catch (Exception e)     //TODO cambiare l'exception ERRORE DATA
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }
            catch (Exception e)       //TODO cambiare l'exception ERRORE DATABASE
            {
                reader.Close();
                return StatusCode((int)HttpStatusCode.BadRequest, new ApiError(e.Code, e.Message));
            }*/
        }
    }
}
