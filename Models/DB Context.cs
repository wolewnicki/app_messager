using System;
using Microsoft.EntityFrameworkCore;
using app_messager.Models;

namespace app_messager.Services{
    public class MessagerDBContext : DbContext 
    {
        public MessagerDBContext(DbContextOptions<MessagerDBContext> options)
            : base(options)
        {        
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=postgres:5432;Database=app-messager;Username=joemama;password=password123");

        public DbSet<Channel> Channel { get; set; }
    }
}