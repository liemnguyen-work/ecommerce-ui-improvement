using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using _31241023460_NguyenThanhLiem.Models;

namespace _31241023460_NguyenThanhLiem.Data;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext(options)
{
    public DbSet<Movie> Movies { get; set; }

    public DbSet<Genre> Genres { get; set; }

    public DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; }

    public DbSet<HoaDon> HoaDons { get; set; }

    public DbSet<ShippingDetail> ShippingDetails { get; set; }
}