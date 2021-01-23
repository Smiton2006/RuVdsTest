using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RuVdsTest.Database.Contexts;
using RuVdsTest.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RuVdsTest.Controllers
{
    [ApiController]
    [Route("/api/v1/virtualServer")]
    public class VirtualServerController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VirtualServerController(ApplicationContext context)
        {
            _context = context;   
        }

        /// <summary>
        /// Получить все виртуальные сервера
        /// </summary>        
        [HttpGet]
        public IQueryable<VirtualServerModel> GetAllVirtualServerAsync() {
            return _context.VirtualServers;
        }

        //[HttpPost]
        //public async Task<VirtualServerModel> AddVirtualServerAsync()
        //{
        //    var virtualServer = new VirtualServerModel();
        //    _context.VirtualServers.Add(virtualServer);
        //    await _context.SaveChangesAsync();
        //    return virtualServer;
        //}
    }
}
