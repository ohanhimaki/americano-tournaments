using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using americano_tournaments.core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using americano_tournaments.api;

namespace americano_tournaments.api.Controllers
{


    [ApiController]
    [Route("Tournament")]
    public class TournamentContoller : Controller
    {
        private readonly TournamentClient _client;

        public TournamentContoller()
        {
            _client = new TournamentClient(Startup.DbConnectionString);
        }

        [HttpGet("[action]")]
        public IEnumerable<string> GetTest()
        {
            try
            {
                var result = _client.GetTest();
                return result;

            }
            catch (System.Exception ex)
            {
                throw ex;
            }

        }
    }
}