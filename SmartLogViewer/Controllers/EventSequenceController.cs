using Microsoft.AspNetCore.Mvc;
using System.Net;
using SmartLogViewer.Model;

namespace SmartLogViewer.Controllers {
    /// <summary>
    /// Controller per la gestione delle sequenze note
    /// </summary>
    [ApiController]
    [Route("api/sequences")]
    public class EventSequenceController: Controller {

        private readonly Model.SequencesManagerBase SequencesManager;

        /// <summary>
        /// Crea una nuova istanza del gestore delle sequenze note
        /// </summary>
        /// <param name="sequencesManager">Gestore del file delle sequenze note</param>
        public EventSequenceController(Model.SequencesManagerBase sequencesManager) {
            this.SequencesManager = sequencesManager;
        }

        /// <summary>
        /// Ottiene la lista dei nomi delle sequenze a disposizione
        /// </summary>
        /// <returns>Lista di stringhe con i nomi delle sequenze note</returns>
        /// <response code="200">Ritorna la lista di nomi</response>
        /// <response code="500">Se c'è stato un errore nella lettura del file delle sequenze</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public IActionResult GetSequenceNames() {
            if(SequencesManager.ParsingError)
                return StatusCode((int)HttpStatusCode.InternalServerError);
                
            return Ok(SequencesManager.SequenceNames());
        }

        /// <summary>
        /// Ottiene i dettagli di una sequenza nota
        /// </summary>
        /// <param name="sequenceName">Nome della sequenza nota</param>
        /// <returns>I dettagli di una sequenza, 404 se la sequenza non esiste</returns>
        /// <response code="200">Ritorna i dettagli della sequenza con il nome fornito</response>
        /// <response code="404">Se il nome dato non è presente tra le sequenze disponibili</response>
        /// <response code="500">Se c'è stato un errore durante la lettura del file delle sequenze</response>
        [HttpGet]
        [Route("{sequenceName}")]
        [ProducesResponseType(typeof(Sequence), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public IActionResult GetSequenceParameters(string sequenceName) {
            if(SequencesManager.ParsingError)
                return StatusCode((int)HttpStatusCode.InternalServerError);

            Model.Sequence? sequence = SequencesManager.Sequence(sequenceName);
            if(sequence != null) {
                return Ok(sequence);
            } else {
                return NotFound(sequenceName);
            }
        }
    }
}
