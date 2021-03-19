using System;
using System.ComponentModel.DataAnnotations;

namespace app_messager.Models 
{
    public class Message 
    {
        public int id;
        public string body;
        public string sender;
        public DateTime time_sent;
        public int channel_id;
    }
}