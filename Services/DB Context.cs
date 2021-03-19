using System;
using Microsoft.EntityFrameworkCore;
using app_messager.Models;

namespace app_messager.Services{
    public class MessagerDBContext : DbContext 
    {
        public DbSet<Channel> channel { get; set; }
        public DbSet<Message> message { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Message>()
            .HasNoKey();

            base.OnModelCreating(modelBuilder);
        }

        public MessagerDBContext(DbContextOptions<MessagerDBContext> options)
            : base(options)
        {        
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=postgres;Port=5432;Database=app-messager;User ID=joemama;Password=password123");

    }
}