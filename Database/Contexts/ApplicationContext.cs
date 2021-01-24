using Microsoft.EntityFrameworkCore;
using RuVdsTest.Database.Models;

namespace RuVdsTest.Database.Contexts
{
    /// <summary>
    /// Контекст приложения для работы с БД
    /// </summary>
    public class ApplicationContext : DbContext
    {
        /// <summary>
        /// .ctor
        /// </summary>
        /// <param name="options">Настройки контекста</param>
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        /// <summary>
        /// Виртуальные сервера
        /// </summary>
        public DbSet<VirtualServerModel> VirtualServers { get; set; }       
    }
}
