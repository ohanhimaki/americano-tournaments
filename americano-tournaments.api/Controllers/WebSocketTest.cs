
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Microsoft.AspNetCore.SignalR;

namespace americano_tournaments.api.Hubs
{
    [ApiController]
    [Route("[controller]")]
    public class WebSocketTestHub : Hub
    {

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage wohoo", user, message);
        }
    }
}
