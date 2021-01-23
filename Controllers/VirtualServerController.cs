using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<VirtualServerController> _logger;

        public VirtualServerController(ApplicationContext context, ILogger<VirtualServerController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Получить все виртуальные сервера
        /// </summary>        
        [HttpGet]
        public async Task<IActionResult> GetAllVirtualServerAsync() 
        {
            try
            {
                return new OkObjectResult(await _context.VirtualServers.ToListAsync());
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return BadRequest();
            }            
        }

        [HttpPost]
        public async Task<IActionResult> AddVirtualServerAsycn()
        {
            var virtualServer = new VirtualServerModel();
            _context.VirtualServers.Add(virtualServer);            
            try
            {
                await _context.SaveChangesAsync();
                return new OkObjectResult(virtualServer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return BadRequest();
            }            
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteVirtualServerAsync([FromBody] List<int> ids)
        {
            var virtualServers = new List<VirtualServerModel>();
            try
            {
                virtualServers = await _context.VirtualServers
                    .Where(x => ids.Contains(x.VirtualServerId))
                    .ToListAsync();
                virtualServers.ForEach(x => x.RemoveDateTime = DateTime.UtcNow);
                await _context.SaveChangesAsync();
                return new OkObjectResult(virtualServers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return BadRequest();
            }
        }
    }
}
