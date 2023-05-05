using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Model;

namespace SmartLogStatistics.Repository
{
    public class SmartLogContext : DbContext
    {
        public SmartLogContext(DbContextOptions<SmartLogContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=Statistics;Username=user;Password=password");
        }
        public DbSet<Log> Log { get; set; }
        public DbSet<LogFile> File { get; set; }
        public DbSet<Firmware> Firmware { get; set; }
        public DbSet<Event> Event { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Log>().ToTable("Log");
            modelBuilder.Entity<LogFile>().ToTable("File");
            modelBuilder.Entity<Firmware>().ToTable("Firmware");
            modelBuilder.Entity<Event>().ToTable("Event");

            modelBuilder.Entity<Log>()
                .HasKey(c => new { c.file_id, c.log_line });
            modelBuilder.Entity<LogFile>()
                .HasKey(c => c.id);
            modelBuilder.Entity<Firmware>()
                .HasKey(c => new { c.file_id, c.unit, c.subunit });
            modelBuilder.Entity<Event>()
                .HasKey(c => c.code);
            
            modelBuilder.Entity<Firmware>()
                .HasOne(p => p.LogFile)
                .WithMany(b => b.Firmwares)
                .HasForeignKey(p => p.file_id)
                .HasPrincipalKey(b => b.id);
            modelBuilder.Entity<Log>()
                .HasOne(p => p.LogFile)
                .WithMany(b => b.Logs)
                .HasForeignKey(p => p.file_id)
                .HasPrincipalKey(b => b.id);
            modelBuilder.Entity<Event>()
                .HasMany(p => p.Logs)
                .WithOne(b => b.Event)
                .HasForeignKey(p => p.code)
                .HasPrincipalKey(b => b.code);
        }
    }

}