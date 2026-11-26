using Microsoft.EntityFrameworkCore;
using SoThuChi.Models;

namespace SoThuChi.Data;

public static class SeedData
{
    public static async Task InitializeAsync(FinanceDbContext db, bool demo)
    {
        if (await db.Categories.AnyAsync()) return;
        var categories = new[]
        {
            new Category { Name="Lương", Kind=TransactionKind.Income, Color="green", Icon="wallet" },
            new Category { Name="Làm thêm", Kind=TransactionKind.Income, Color="blue", Icon="briefcase" },
            new Category { Name="Thu khác", Kind=TransactionKind.Income, Color="purple", Icon="gift" },
            new Category { Name="Ăn uống", Kind=TransactionKind.Expense, Color="orange", Icon="coffee" },
            new Category { Name="Di chuyển", Kind=TransactionKind.Expense, Color="blue", Icon="car" },
            new Category { Name="Mua sắm", Kind=TransactionKind.Expense, Color="pink", Icon="bag" },
            new Category { Name="Hóa đơn", Kind=TransactionKind.Expense, Color="purple", Icon="receipt" },
            new Category { Name="Học tập", Kind=TransactionKind.Expense, Color="green", Icon="book" },
            new Category { Name="Giải trí", Kind=TransactionKind.Expense, Color="teal", Icon="music" },
            new Category { Name="Chi khác", Kind=TransactionKind.Expense, Color="gray", Icon="dots" }
        };
        db.Categories.AddRange(categories);
        await db.SaveChangesAsync();
        if (!demo) return;
        var month=new DateOnly(DateTime.Today.Year, DateTime.Today.Month, 1);
        void Add(string title, long amount, int category, int day, TransactionStatus status=TransactionStatus.Completed, int monthsAgo=0)
        {
            var start=month.AddMonths(-monthsAgo);
            db.Entries.Add(new FinanceEntry { Title=title, Amount=amount, CategoryId=categories[category].Id,
                Date=start.AddDays(Math.Min(day, DateTime.DaysInMonth(start.Year,start.Month))-1), Status=status,
                Notes="Dữ liệu mẫu để trải nghiệm ứng dụng." });
        }
        Add("Lương tháng này",12000000,0,1);
        Add("Dự án thiết kế freelance",2500000,1,5);
        Add("Tiền thuê phòng",3000000,6,2);
        Add("Đi chợ đầu tháng",620000,3,3);
        Add("Mua sách chuyên ngành",385000,7,8);
        Add("Xăng xe",180000,4,10);
        Add("Cà phê cùng bạn bè",95000,3,14);
        Add("Áo khoác mới",450000,5,16);
        Add("Vé xem phim",120000,8,20);
        Add("Ăn trưa",55000,3,Math.Min(DateTime.Today.Day,25));
        Add("Thanh toán Internet",220000,6,28,TransactionStatus.Pending);
        Add("Học phí khóa học",650000,7,28,TransactionStatus.Pending);
        for(var i=1;i<=5;i++)
        {
            Add("Lương tháng "+month.AddMonths(-i).Month,11500000+(5-i)*200000,0,1,monthsAgo:i);
            Add("Sinh hoạt tháng "+month.AddMonths(-i).Month,5200000+(i%3)*450000,6,5,monthsAgo:i);
            Add("Ăn uống tháng "+month.AddMonths(-i).Month,1250000+(i%2)*180000,3,12,monthsAgo:i);
        }
        await db.SaveChangesAsync();
    }
}
