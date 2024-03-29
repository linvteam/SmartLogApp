﻿using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging.Licenses;
using SmartLogStatistics.Repository;
using System.Net;
using Microsoft.CodeAnalysis.CodeActions;
using SmartLogStatistics.Exceptions;
using SmartLogStatistics.Model;
using Log = Core.Log;

namespace SmartLogStatistics.Controller
{
    /// <summary>
    /// Controller per ottenere delle informazioni generiche necessarie al frontend
    /// </summary>
    [Route("api/info")]
    [ApiController]
    public class InfoController : ControllerBase{

        /// <summary>
        /// Oggetto di tipo InfoRepository dedicato a ottenere le informazioni dal database
        /// </summary>
        private readonly InfoRepository Repository;

        /// <summary>
        /// Crea una nuova istanza del controller
        /// </summary>
        /// <param name="repository">Repository che comunica con il database</param>
        public InfoController(InfoRepository repository)
        {
            Repository = repository;
        }


        /// <summary>
        /// Ritorna un JSON che rappresenta la lista di codici degli eventi con le relative descrizioni
        /// </summary>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta la lista di code con le relative descrizioni o un'eccezione dovuta all'impossibilità di connettersi al database</returns>
        /// <response code="200">Ritorna una lista di codici degli eventi con le relative descrizioni</response>
        /// <response code="404">Se la query fallisce o ritorna vuota</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("codedescription")]
        [ProducesResponseType(typeof(List<CodeWithDescriptionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult GetCodeWithDescription() {
            try {
                List<CodeWithDescriptionDto> response = Repository.GetCodesWithDescription();
                return StatusCode((int)HttpStatusCode.OK, response);
            }
            catch(EmptyOrFailedQueryException e) {
                return StatusCode((int)HttpStatusCode.NotFound, new ErrorObject(e.Code, e.Message));
            }
            catch (FailedConnectionException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorObject(e.Code, e.Message));
            }

        }
        
        /// <summary>
        /// Ritorna un JSON che rappresenta il DateTime minimo e massimo all'interno dell'intero database
        /// </summary>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta l'intervallo di tempo
        /// o un'eccezione dovuta all'impossibilità di connettersi al database</returns>
        /// <response code="200">Ritorna il minimo e il massimo DateTime nel database</response>
        /// <response code="404">Se la query fallisce o ritorna vuota</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("timeinterval")]
        [ProducesResponseType(typeof(DateTimeIntervalDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult GetTimeInterval() {
            try {
                DateTimeIntervalDto response = this.Repository.GetTimeInterval();
                return StatusCode((int)HttpStatusCode.OK, response);
            }
            catch(EmptyOrFailedQueryException e) {
                return StatusCode((int)HttpStatusCode.NotFound, new ErrorObject(e.Code, e.Message));
            }
            catch (FailedConnectionException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorObject(e.Code, e.Message));
            }
        }
        
        /// <summary>
        /// Ritorna un JSON che rappresenta la lista di tutti i firmware nel database
        /// </summary>
        /// <returns>Esito della chiamata POST, può essere un file JSON che rappresenta la lista di firmware o un'eccezione dovuta all'impossibilità di connettersi al database</returns>
        /// <response code="200">Ritorna la lista di firmware</response>
        /// <response code="404">Se la query fallisce o ritorna vuota</response>
        /// <response code="500">Se non riesce a connettersi al database</response>
        [HttpGet]
        [Route("firmwarelist")]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorObject), StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult GetFirmwareList() {
            try {
                List<string> response = this.Repository.GetFirmwareList();
                return StatusCode((int)HttpStatusCode.OK, response);
            }
            catch(EmptyOrFailedQueryException e) {
                return StatusCode((int)HttpStatusCode.NotFound, new ErrorObject(e.Code, e.Message));
            }
            catch (FailedConnectionException e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorObject(e.Code, e.Message));
            }
        }
    }
}