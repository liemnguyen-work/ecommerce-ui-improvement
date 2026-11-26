using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using SoThuChi.Models;

namespace SoThuChi.Data;

public class FinanceDbContext(DbContextOptions<FinanceDbContext> options) : DbContext(options)
{
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<FinanceEntry> Entries => Set<FinanceEntry>();
    protected override void OnModelCreating(ModelBuilder model)
    {
        model.Entity<Category>(entity =>
        {
            entity.Property(x => x.Name).HasMaxLength(80).IsRequired();
            entity.HasIndex(x => new { x.Name, x.Kind }).IsUnique();
        });
        model.Entity<FinanceEntry>(entity =>
        {
            entity.Property(x => x.Title).HasMaxLength(120).IsRequired();
            entity.Property(x => x.Notes).HasMaxLength(500);
            entity.Property(x => x.Revision).IsConcurrencyToken();
            entity.HasOne(x => x.Category).WithMany(x => x.Entries)
                .HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.Restrict);
            entity.HasIndex(x => new { x.Date, x.Status });
            entity.ToTable("Entries", t =>
            {
                t.HasCheckConstraint("CK_Entries_Amount", "Amount > 0 AND Amount <= 999999999999");
                t.HasCheckConstraint("CK_Entries_Status", "Status IN (0, 1)");
            });
        });
    }
}

public class FinanceDbContextFactory : IDesignTimeDbContextFactory<FinanceDbContext>
{
    public FinanceDbContext CreateDbContext(string[] args) => new(
        new DbContextOptionsBuilder<FinanceDbContext>().UseSqlite("Data Source=App_Data/finance.db").Options);
}
