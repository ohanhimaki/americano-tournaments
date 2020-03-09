using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace americano_tournaments.api.Controllers {
    [ApiController]
    [Route ("[controller]")]
    public class DebugController : ControllerBase {

        [HttpGet]
        public string[] Get () {
            return Startup.AllowedOrigins;
        }
    }
}