using Microsoft.EntityFrameworkCore;
using RuVdsTest.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RuVdsTest.Database.Contexts
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<VirtualServerModel> VirtualServers { get; set; }       
    }
}
