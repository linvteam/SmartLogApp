using Microsoft.AspNetCore.Mvc;
using System.Net;


namespace SmartLogViewer.Controllers {
    [ApiController]
    public class EventSequenceController: Controller {

        private readonly Model.SequencesManager sequencesManager;

        public EventSequenceController(Model.SequencesManager sequencesManager) {
            this.sequencesManager = sequencesManager;
        }

        [HttpGet]
        [Route("/api/sequences/")]
        public IActionResult GetSequenceNames() {
            if(sequencesManager.ParsingError)
                return BadRequest(HttpStatusCode.InternalServerError);

            return Ok(sequencesManager.SequenceNames());
        }

        [HttpGet]
        [Route("/api/sequences/{sequenceName}")]
        public IActionResult GetSequenceParameters(string sequenceName) {
            if(sequencesManager.ParsingError)
                return BadRequest(HttpStatusCode.InternalServerError);

            Model.Sequence? sequence = sequencesManager.Sequence(sequenceName);
            if(sequence != null) {
                return Ok(sequence);
            } else {
                return BadRequest(sequenceName);
            }
        }
    }
}
