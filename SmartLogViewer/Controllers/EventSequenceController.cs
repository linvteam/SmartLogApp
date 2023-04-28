using Microsoft.AspNetCore.Mvc;
using System.Net;


namespace SmartLogViewer.Controllers {
    [Route("/api/sequence")]
    [ApiController]
    public class EventSequenceController: Controller {

        private readonly Model.SequencesManager sequencesManager;

        public EventSequenceController(Model.SequencesManager sequencesManager) {
            this.sequencesManager = sequencesManager;
        }

        [HttpGet]
        [Route("/names")]
        public IActionResult GetSequenceNames() {
            if(sequencesManager.ParsingError)
                return BadRequest(HttpStatusCode.InternalServerError);

            return Ok(sequencesManager.SequenceNames());
        }

        [HttpGet]
        [Route("/parameters")]
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
