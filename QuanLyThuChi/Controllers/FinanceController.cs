using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoThuChi.Data;
using SoThuChi.Models;

namespace SoThuChi.Controllers;

[ApiController, Route("api")]
public class FinanceController(FinanceDbContext db) : ControllerBase
{
    [HttpGet("categories")]
    public async Task<IActionResult> Categories() => Ok(await db.Categories.AsNoTracking()
        .OrderBy(x=>x.Kind).ThenBy(x=>x.Id).Select(x=>new {x.Id,x.Name,x.Kind,x.Color,x.Icon}).ToListAsync());

    [HttpGet("entries")]
    public async Task<IActionResult> Entries(string? month=null, string? kind=null, string? status=null,
        int? categoryId=null, string? search=null)
    {
        if (!TryMonth(month,out var start)) return BadRequest(new {message="Tháng phải có dạng yyyy-MM."});
        var query=db.Entries.AsNoTracking().Include(x=>x.Category).Where(x=>x.Date>=start && x.Date<start.AddMonths(1));
        if (!string.IsNullOrEmpty(kind))
        {
            if (!Enum.TryParse<TransactionKind>(kind,true,out var value) || !Enum.IsDefined(value)) return BadRequest(new {message="Loại giao dịch không hợp lệ."});
            query=query.Where(x=>x.Category.Kind==value);
        }
        if (!string.IsNullOrEmpty(status))
        {
            if (!Enum.TryParse<TransactionStatus>(status,true,out var value) || !Enum.IsDefined(value)) return BadRequest(new {message="Trạng thái không hợp lệ."});
            query=query.Where(x=>x.Status==value);
        }
        if (categoryId.HasValue) query=query.Where(x=>x.CategoryId==categoryId);
        var rows=await query.OrderByDescending(x=>x.Date).ThenByDescending(x=>x.Id).ToListAsync();
        // OrdinalIgnoreCase supports Vietnamese text consistently with SQLite.
        if (!string.IsNullOrWhiteSpace(search)) rows=rows.Where(x=>x.Title.Contains(search.Trim(),StringComparison.OrdinalIgnoreCase)
            || x.Notes.Contains(search.Trim(),StringComparison.OrdinalIgnoreCase)).ToList();
        return Ok(rows.Select(View));
    }

    [HttpGet("statistics")]
    public async Task<IActionResult> Statistics(string? month=null)
    {
        if (!TryMonth(month,out var start)) return BadRequest(new {message="Tháng phải có dạng yyyy-MM."});
        var entries=await db.Entries.AsNoTracking().Include(x=>x.Category)
            .Where(x=>x.Date>=start.AddMonths(-5) && x.Date<start.AddMonths(1)).ToListAsync();
        var current=entries.Where(x=>x.Date>=start).ToList();
        long Total(IEnumerable<FinanceEntry> rows,TransactionKind kind,TransactionStatus status=TransactionStatus.Completed)
            =>rows.Where(x=>x.Category.Kind==kind && x.Status==status).Sum(x=>x.Amount);
        var income=Total(current,TransactionKind.Income);
        var expense=Total(current,TransactionKind.Expense);
        var monthly=Enumerable.Range(0,6).Select(i=>
        {
            var m=start.AddMonths(i-5);
            var rows=entries.Where(x=>x.Date>=m && x.Date<m.AddMonths(1));
            return new {month=m.ToString("yyyy-MM"),income=Total(rows,TransactionKind.Income),expense=Total(rows,TransactionKind.Expense)};
        });
        var groups=current.Where(x=>x.Status==TransactionStatus.Completed && x.Category.Kind==TransactionKind.Expense)
            .GroupBy(x=>x.CategoryId).Select(g=>new {categoryId=g.Key,name=g.First().Category.Name,
                color=g.First().Category.Color,amount=g.Sum(x=>x.Amount)}).OrderByDescending(x=>x.amount);
        return Ok(new {income,expense,balance=income-expense,count=current.Count,
            pendingCount=current.Count(x=>x.Status==TransactionStatus.Pending),
            pendingIncome=Total(current,TransactionKind.Income,TransactionStatus.Pending),
            pendingExpense=Total(current,TransactionKind.Expense,TransactionStatus.Pending),monthly,byCategory=groups});
    }

    [HttpPost("entries")]
    public async Task<IActionResult> Create(EntryInput input)
    {
        var error=await ValidateInput(input);
        if (error!=null) return BadRequest(new {message=error});
        var entry=new FinanceEntry(); Apply(entry,input);
        db.Entries.Add(entry); await db.SaveChangesAsync();
        await db.Entry(entry).Reference(x=>x.Category).LoadAsync();
        return Created($"/api/entries/{entry.Id}",View(entry));
    }

    [HttpPut("entries/{id:int}")]
    public async Task<IActionResult> Update(int id,EntryInput input)
    {
        var entry=await db.Entries.Include(x=>x.Category).SingleOrDefaultAsync(x=>x.Id==id);
        if (entry==null) return NotFound(new {message="Giao dịch không còn tồn tại."});
        if (entry.Revision!=input.Revision) return Conflict(Stale());
        var error=await ValidateInput(input); if (error!=null) return BadRequest(new {message=error});
        Apply(entry,input); entry.Revision++;
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) { return Conflict(Stale()); }
        await db.Entry(entry).Reference(x=>x.Category).LoadAsync();
        return Ok(View(entry));
    }

    [HttpPatch("entries/{id:int}/status")]
    public async Task<IActionResult> Status(int id,StatusInput input)
    {
        var entry=await db.Entries.Include(x=>x.Category).SingleOrDefaultAsync(x=>x.Id==id);
        if (entry==null) return NotFound(new {message="Giao dịch không còn tồn tại."});
        if (entry.Revision!=input.Revision) return Conflict(Stale());
        entry.Status=input.Status!.Value; entry.Revision++;
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) { return Conflict(Stale()); }
        return Ok(View(entry));
    }

    [HttpDelete("entries/{id:int}")]
    public async Task<IActionResult> Delete(int id,[FromQuery] int revision)
    {
        var entry=await db.Entries.SingleOrDefaultAsync(x=>x.Id==id);
        if (entry==null) return NotFound(new {message="Giao dịch không còn tồn tại."});
        if (entry.Revision!=revision) return Conflict(Stale());
        db.Remove(entry);
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) { return Conflict(Stale()); }
        return NoContent();
    }

    private async Task<string?> ValidateInput(EntryInput input)
    {
        if (input.Date<new DateOnly(1900,1,1) || input.Date>new DateOnly(2100,12,31)) return "Ngày giao dịch phải thuộc năm 1900–2100.";
        if (!await db.Categories.AnyAsync(x=>x.Id==input.CategoryId)) return "Danh mục không tồn tại. Vui lòng chọn lại.";
        return null;
    }
    private static void Apply(FinanceEntry entry,EntryInput input)
    {
        entry.Title=input.Title.Trim(); entry.Amount=input.Amount!.Value; entry.Date=input.Date!.Value;
        entry.CategoryId=input.CategoryId; entry.Status=input.Status!.Value; entry.Notes=(input.Notes??"").Trim();
    }
    private static EntryView View(FinanceEntry x)=>new(x.Id,x.Title,x.Amount,x.Date,x.CategoryId,x.Category.Name,
        x.Category.Kind,x.Category.Color,x.Category.Icon,x.Status,x.Notes,x.Revision);
    private static object Stale()=>new {message="Giao dịch đã thay đổi ở cửa sổ khác. Hãy tải lại dữ liệu rồi thử lại."};
    private static bool TryMonth(string? value,out DateOnly start)
    {
        value??=DateTime.Today.ToString("yyyy-MM");
        return DateOnly.TryParseExact(value+"-01","yyyy-MM-dd",CultureInfo.InvariantCulture,DateTimeStyles.None,out start)
            && start.Year is >=1900 and <=2100;
    }
}
