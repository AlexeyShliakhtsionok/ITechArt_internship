using Microsoft.EntityFrameworkCore;
using Data_Access_Layer.Entities;
using Microsoft.Extensions.Configuration;

namespace Data_Access_Layer
{
    public class SalonDBContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           var builder = new ConfigurationBuilder();
           builder.SetBasePath(Directory.GetCurrentDirectory());
           builder.AddJsonFile("appsettings.json");
           var config = builder.Build();
           string connectionString = config.GetConnectionString("DefaultConnection");
           optionsBuilder.UseSqlServer(connectionString);
           optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Feedback>().Property(f => f.IsVerify).HasDefaultValue(false);
            modelBuilder.Entity<Feedback>().Property(f => f.CreatedOn).HasDefaultValue(DateTime.Now);
            modelBuilder.Entity<Order>().Property( c => c.IsCompleted).HasDefaultValue(false);
            modelBuilder.Entity<MediaFile>().Property(p => p.IsProfilePhoto).HasDefaultValue(false);
            modelBuilder.Entity<MediaFile>().Property(p => p.IsEmployeePhoto).HasDefaultValue(false);
            modelBuilder.Entity<MediaFile>().Property(p => p.IsPromoPhoto).HasDefaultValue(false);
            modelBuilder.Entity<Order>().Property(c => c.CreatedByClient).HasDefaultValue(false);
            modelBuilder.Entity<Order>().Property(p => p.ProcessedByAdmimistrator).HasDefaultValue(false);
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Procedure> Procedures { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<MaterialManufacturer> MaterialManufacturers { get; set; }
        public DbSet<MediaFile> MediaFiles { get; set; }
        public DbSet<ProcedureType> ProcedureTypes { get; set; }
    }
}
