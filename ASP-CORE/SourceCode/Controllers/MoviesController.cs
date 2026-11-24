using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using _31241023460_NguyenThanhLiem.Data;
using _31241023460_NguyenThanhLiem.Models;
using _31241023460_NguyenThanhLiem.Extension;
using System.Text;

namespace _31241023460_NguyenThanhLiem.Controllers
{
    public class MoviesController : Controller
    {
private readonly ApplicationDbContext _context;
private readonly IWebHostEnvironment _env;
private readonly IConfiguration _config;

public MoviesController(
    ApplicationDbContext context,
    IWebHostEnvironment env,
    IConfiguration config)
{
    _context = context;
    _env = env;
    _config = config;
}

private async Task<string> SaveImageAsync(IFormFile file)
{
    if (file == null || file.Length == 0)
    {
        return null;
    }

    var ext = Path.GetExtension(file.FileName).ToLowerInvariant();

    if (!new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" }
        .Contains(ext))
    {
        return null;
    }

    var folder = Path.Combine(_env.WebRootPath, "images");
    Directory.CreateDirectory(folder);

    var fileName = Guid.NewGuid().ToString("N") + ext;

    using var stream = System.IO.File.Create(
        Path.Combine(folder, fileName));

    await file.CopyToAsync(stream);

    return "/images/" + fileName;
}

        // GET: Movies
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Movies.Include(m => m.GenreObj);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Movies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movies
                .Include(m => m.GenreObj)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // GET: Movies/Create
        public IActionResult Create()
        {
            ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name");
            return View();
        }

        // POST: Movies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Movie movie)
        {
            if (ModelState.IsValid)
            {
                movie.PicturePath =
                    await SaveImageAsync(movie.PictureUpload)
                    ?? "/images/no-image.jpg";

                _context.Add(movie);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            ViewData["GenreID"] = new SelectList(
                _context.Genres, "ID", "Name", movie.GenreID);

            return View(movie);
        }

        // GET: Movies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            ViewData["GenreID"] = new SelectList(_context.Genres, "ID", "Name", movie.GenreID);
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Edit(int id, Movie movie)
{
    if (id != movie.ID)
    {
        return NotFound();
    }

    if (ModelState.IsValid)
    {
        try
        {
            var newPath = await SaveImageAsync(movie.PictureUpload);

            if (newPath != null)
            {
                movie.PicturePath = newPath;
            }
            else if (string.IsNullOrEmpty(movie.PicturePath))
            {
                movie.PicturePath = "/images/no-image.jpg";
            }

            _context.Update(movie);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MovieExists(movie.ID))
            {
                return NotFound();
            }

            throw;
        }

        return RedirectToAction(nameof(Index));
    }

    ViewData["GenreID"] = new SelectList(
        _context.Genres, "ID", "Name", movie.GenreID);

    return View(movie);
}

        // GET: Movies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movies
                .Include(m => m.GenreObj)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> AddToCart(int id)
{
    var movie = await _context.Movies.FindAsync(id);

    if (movie == null)
    {
        return RedirectToAction(nameof(Index));
    }

    var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon")
        ?? new HoaDon();

    var chiTiet = hoaDon.ChiTietHoaDons
        .FirstOrDefault(x => x.MaMovie == id);

    if (chiTiet == null)
    {
        hoaDon.ChiTietHoaDons.Add(new ChiTietHoaDon
        {
            MaMovie = movie.ID,
            MovieObj = movie,
            SoLuong = 1
        });
    }
    else
    {
        chiTiet.SoLuong = Math.Min(chiTiet.SoLuong + 1, 99);
    }

    hoaDon.TongTien = hoaDon.ChiTietHoaDons
        .Sum(x => x.SoLuong * x.MovieObj.Price);

    HttpContext.Session.Set<HoaDon>("HoaDon", hoaDon);

    return RedirectToAction(nameof(Cart));
}
public IActionResult Cart()
{
    var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon")
        ?? new HoaDon();

    return View("AddToCart", hoaDon);
}

[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult UpdateCartQuantity(int maMovie, int soLuong)
{
    if (soLuong < 1 || soLuong > 99)
    {
        TempData["CartError"] = "Số lượng phải từ 1 đến 99.";
        return RedirectToAction(nameof(Cart));
    }

    var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon")
        ?? new HoaDon();

    var chiTiet = hoaDon.ChiTietHoaDons
        .FirstOrDefault(x => x.MaMovie == maMovie);

    if (chiTiet != null)
    {
        chiTiet.SoLuong = soLuong;

        hoaDon.TongTien = hoaDon.ChiTietHoaDons
            .Sum(x => x.SoLuong * x.MovieObj.Price);

        HttpContext.Session.Set<HoaDon>("HoaDon", hoaDon);
    }

    return RedirectToAction(nameof(Cart));
}

[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult RemoveFromCart(int maMovie)
{
    var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon")
        ?? new HoaDon();

    var chiTiet = hoaDon.ChiTietHoaDons
        .FirstOrDefault(x => x.MaMovie == maMovie);

    if (chiTiet != null)
    {
        hoaDon.ChiTietHoaDons.Remove(chiTiet);
    }

    hoaDon.TongTien = hoaDon.ChiTietHoaDons
        .Sum(x => x.SoLuong * x.MovieObj.Price);

    HttpContext.Session.Set<HoaDon>("HoaDon", hoaDon);

    return RedirectToAction(nameof(Cart));
}
[HttpGet]
public IActionResult Checkout()
{
    return View(new ShippingDetail());
}

[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Checkout(ShippingDetail detail)
{
    var hoaDon = HttpContext.Session.Get<HoaDon>("HoaDon")
        ?? new HoaDon();

    if (hoaDon.ChiTietHoaDons.Count == 0)
    {
        ModelState.AddModelError("", "Giỏ hàng đang trống.");
    }

    if (!ModelState.IsValid)
    {
        return View(detail);
    }

    hoaDon.TongTien = hoaDon.ChiTietHoaDons
        .Sum(x => x.SoLuong * x.MovieObj.Price);

    var order = new HoaDon
    {
        NgayLap = DateTime.Now,
        TongTien = hoaDon.TongTien
    };

    foreach (var ct in hoaDon.ChiTietHoaDons)
    {
        order.ChiTietHoaDons.Add(new ChiTietHoaDon
        {
            MaMovie = ct.MaMovie,
            SoLuong = ct.SoLuong
        });
    }

    // Form hiện chưa có ô chọn ngày giao.
    detail.ReleaseDate = DateTime.Today;

    _context.HoaDons.Add(order);
    _context.ShippingDetails.Add(detail);
    await _context.SaveChangesAsync();

    Func<string, string> enc = System.Net.WebUtility.HtmlEncode;

    var body = new StringBuilder()
        .AppendLine("<h2>Xác nhận đơn hàng</h2>")
        .AppendLine($"<p>Mã đơn: {order.MaHoaDon}</p>")
        .AppendLine("<ul>");

    foreach (var ct in hoaDon.ChiTietHoaDons)
    {
        var subtotal = ct.SoLuong * ct.MovieObj.Price;

        body.AppendLine(
            $"<li>{ct.SoLuong} x {enc(ct.MovieObj.Title)}" +
            $" — Thành tiền: {subtotal:N0} đ</li>");
    }

    body.AppendLine("</ul>")
        .AppendLine($"<p><b>Tổng tiền: {hoaDon.TongTien:N0} đ</b></p>")
        .AppendLine("<p>Thông tin nhận hàng:</p>")
        .AppendLine($"<p>{enc(detail.Name)}<br>")
        .AppendLine($"{enc(detail.Address)}<br>")
        .AppendLine($"{enc(detail.Mobile)}</p>");

    var gmail = _config["Email:Address"];
    var appPassword = _config["Email:AppPassword"];

    var emailSent = await EmailServiceNew.SendMailGoogleSmtp(
        gmail,
        detail.Email,
        "Xác nhận đơn hàng",
        body.ToString(),
        gmail,
        appPassword);

    HttpContext.Session.Remove("HoaDon");

    ViewBag.OrderId = order.MaHoaDon;
    ViewBag.EmailSent = emailSent;

    return View("CheckoutCompleted");
}
        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.ID == id);
        }
    }
}
