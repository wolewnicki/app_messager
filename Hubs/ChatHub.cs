using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using app_messager.Services;
using app_messager.Models;

namespace app_messager.Hubs
{
    public class ChatHub: Hub
    {

        private readonly MessagerDBContext _dbContext;

        public ChatHub(MessagerDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SendMessage(string user, string message)
        {
            var sentMessage = Clients.All.SendAsync("RecieveMessage", user, message);
            var newMessage = new Message() { sender = user, body = message};
            _dbContext.Add(newMessage);
            var awaitSave = _dbContext.SaveChangesAsync();

            await Task.WhenAll(awaitSave, sentMessage);

        }
    }
}