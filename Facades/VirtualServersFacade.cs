using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RuVdsTest.Database.Contexts;
using RuVdsTest.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RuVdsTest.Facades
{
    /// <summary>
    /// Фасад для работы с виртуальными серверами
    /// </summary>
    public class VirtualServersFacade
    {
        private readonly ApplicationContext _context;
        private readonly ILogger<VirtualServersFacade> _logger;

        public VirtualServersFacade(ApplicationContext context, ILogger<VirtualServersFacade> logger)
        {
            _context = context;
            _logger = logger;            
        }
        
        /// <summary>
        /// Получить все виртуальные сервера
        /// </summary>        
        public async Task<Result<List<VirtualServerModel>>> GetAllVirtualServerAsync()
        {
            try
            {
                return Result.Ok(await _context.VirtualServers.ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return Result.Fail<List<VirtualServerModel>>("Произошла ошибка во время получения данных");
            }
        }

        /// <summary>
        /// Добавить виртуальный сервер
        /// </summary>        
        public async Task<Result<VirtualServerModel>> AddVirtualServerAsync()
        {
            var virtualServer = new VirtualServerModel();
            _context.VirtualServers.Add(virtualServer);
            try
            {
                await _context.SaveChangesAsync();
                return Result.Ok(virtualServer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return Result.Fail<VirtualServerModel>("Произошла ошибка во время сохранения данных");
            }
        }

        /// <summary>
        /// Удалить виртуальные сервера
        /// </summary>
        /// <param name="ids">Список идентификаторов серверов</param>        
        public async Task<Result<List<VirtualServerModel>>> DeleteVirtualServerAsync(List<int> ids)
        {
            var virtualServers = new List<VirtualServerModel>();
            try
            {
                virtualServers = await _context.VirtualServers
                    .Where(x => ids.Contains(x.VirtualServerId) && x.RemoveDateTime == null)
                    .ToListAsync();
                virtualServers.ForEach(x => x.RemoveDateTime = DateTime.UtcNow);
                await _context.SaveChangesAsync();
                return Result.Ok(virtualServers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return Result.Fail<List<VirtualServerModel>>("Произошла ошибка во время работы с данными");
            }
        }
    }
}
