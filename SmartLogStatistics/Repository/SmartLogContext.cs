using System.Collections.Generic;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using SmartLogStatistics.Model;

namespace SmartLogStatistics.Repository
{
    /// <summary>
    /// Classe Context che rappresenta il database e consente l'interazione tra il codice e il DB
    /// </summary>
    public class SmartLogContext : DbContext
    {

        /// <summary>
        /// Crea una nuova istanza del context
        /// </summary>
        /// <param name="options">Opzioni usate dal context</param>
        public SmartLogContext(DbContextOptions<SmartLogContext> options) : base(options) {}

        /// <summary>
        /// Crea una nuova istanza del context (costruttore usato per i test)
        /// </summary>
        public SmartLogContext(): base() { }
        
        /// <summary>
        /// Oggetto di tipo DbSet che rappresenta la tabella Log nel DB, dotato di getter e setter
        /// </summary>
        public virtual DbSet<Log> Log { get; set; }
        /// <summary>
        /// Oggetto di tipo DbSet che rappresenta la tabella File nel DB, dotato di getter e setter
        /// </summary>
        public virtual DbSet<LogFile> File { get; set; }
        /// <summary>
        /// Oggetto di tipo DbSet che rappresenta la tabella Firmware nel DB, dotato di getter e setter
        /// </summary>
        public virtual DbSet<Firmware> Firmware { get; set; }
        /// <summary>
        /// Oggetto di tipo DbSet che rappresenta la tabella Event nel DB, dotato di getter e setter
        /// </summary>
        public virtual DbSet<Event> Event { get; set; }

        /// <summary>
        /// Crea le tabelle del DB, configurandone le chiavi interne e esterne
        /// </summary>
        /// <param name="modelBuilder">Oggetto per configurare le entita del DB e le loro relazioni</param>
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