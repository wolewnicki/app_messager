using System;
using System.Linq;

namespace app_messager.Models
{
       public class Channel
    {
        public int id { get; set; }
        public string created_by { get; set; }
        public DateTime created_date { get; set; }
        public string description { get; set; }
    }
}