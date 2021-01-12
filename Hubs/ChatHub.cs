using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace app_messager.Hubs
{
    public class ChatHub: Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("RecieveMessage", user, message);
        }
    }
}