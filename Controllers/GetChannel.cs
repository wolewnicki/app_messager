using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using app_messager.Services;


namespace app_messager.Controllers
{
    public class GetChannel : ControllerBase
    {
        private readonly MessagerDBContext _dBContext;

        public GetChannel(MessagerDBContext dBContext)
        {
            _dBContext = dBContext;
        }
        [HttpGet]
        [Route("v1/app-messager/GetChannel")]
        public IActionResult ChannelData()
        {
            var db = _dBContext;
            var channels = db.channel
            .Where(c => c.created_by == "nico")
            .ToList();

            return Ok(channels);
        }
    }
}