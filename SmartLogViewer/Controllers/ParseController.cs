using Core;
using Microsoft.AspNetCore.Mvc;

namespace SmartLogViewer.Controllers
{
    [Route("api/parse")]
    [ApiController]
    public class ParseController : ControllerBase
    {
        private readonly Parser _parser;

        public ParseController(Parser parser) => _parser = parser;

        [HttpPost]
        public IActionResult Upload(IFormFile file)
        {
            string filename = file.FileName;
            TextReader reader = new StreamReader(file.OpenReadStream());
            var log = _parser.Parse(filename, reader);
            reader.Close();
            return Ok(log);
        }
    }
}

