using Microsoft.EntityFrameworkCore;
using Pgvector.EntityFrameworkCore;
using SCIP.Api.Entities;

namespace SCIP.Api.Data
{
    public class ScipDbContext : DbContext
    {
        public ScipDbContext(DbContextOptions<ScipDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Incident> Incidents => Set<Incident>();
        public DbSet<IncidentComment> IncidentComments => Set<IncidentComment>();
        public DbSet<DocumentItem> Documents => Set<DocumentItem>();
        public DbSet<VectorEmbedding> DocumentEmbeddings => Set<VectorEmbedding>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Enable pgvector extension
            modelBuilder.HasPostgresExtension("vector");

            // User Entity Configurations
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
                entity.Property(e => e.PasswordHash).IsRequired();
            });

            // Incident Entity Configurations
            modelBuilder.Entity<Incident>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Severity).HasConversion<string>();
                entity.Property(e => e.Status).HasConversion<string>();
            });

            // Vector Embedding Entity Configurations
            modelBuilder.Entity<VectorEmbedding>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Embedding).HasColumnType("vector(1536)");
            });
        }
    }
}
