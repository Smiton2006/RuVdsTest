using Microsoft.AspNetCore.Mvc;
using RuVdsTest.Facades;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RuVdsTest.Controllers
{
    /// <summary>
    /// Контроллер для работы с виртуальными серверами
    /// </summary>
    [ApiController]
    [Route("/api/v1/virtualServer")]
    public class VirtualServerController : ControllerBase
    {
        private readonly VirtualServersFacade _facade;

        public VirtualServerController(VirtualServersFacade facade)
        {
            _facade = facade;
        }

        /// <summary>
        /// Получить все виртуальные сервера
        /// </summary>        
        [HttpGet]
        public async Task<IActionResult> GetAllVirtualServerAsync() 
        {
            var res = await _facade.GetAllVirtualServerAsync();
            if (res.Success)
                return new OkObjectResult(res.Value);
            return BadRequest();
        }

        /// <summary>
        /// Добавить виртуальный сервер
        /// </summary>  
        [HttpPost]
        public async Task<IActionResult> AddVirtualServerAsycn()
        {
            var res = await _facade.AddVirtualServerAsync();
            if (res.Success)
                return new OkObjectResult(res.Value);
            return BadRequest();
        }

        /// <summary>
        /// Удалить виртуальные сервера
        /// </summary>
        /// <param name="ids">Список идентификаторов серверов</param> 
        [HttpDelete]
        public async Task<IActionResult> DeleteVirtualServerAsync([FromBody] List<int> ids)
        {
            var res = await _facade.DeleteVirtualServerAsync(ids);
            if (res.Success)
                return new OkObjectResult(res.Value);
            return BadRequest();
        }
    }
}
