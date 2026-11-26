using System.ComponentModel.DataAnnotations;

namespace SoThuChi.Models;

public enum TransactionKind { Income, Expense }
public enum TransactionStatus { Pending, Completed }

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public TransactionKind Kind { get; set; }
    public string Color { get; set; } = "";
    public string Icon { get; set; } = "";
    public ICollection<FinanceEntry> Entries { get; set; } = new List<FinanceEntry>();
}

public class FinanceEntry
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    // Integer VND prevents floating point rounding in stored currency.
    public long Amount { get; set; }
    public DateOnly Date { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public TransactionStatus Status { get; set; }
    public string Notes { get; set; } = "";
    public int Revision { get; set; } = 1;
}

public class EntryInput
{
    [Required(ErrorMessage = "Vui lòng nhập nội dung giao dịch.")]
    [StringLength(120, ErrorMessage = "Nội dung tối đa 120 ký tự.")]
    public string Title { get; set; } = "";
    [Required(ErrorMessage = "Vui lòng nhập số tiền.")]
    [Range(typeof(long), "1", "999999999999", ErrorMessage = "Số tiền phải từ 1 đến 999.999.999.999 đồng.")]
    public long? Amount { get; set; }
    [Required(ErrorMessage = "Vui lòng chọn ngày giao dịch.")]
    public DateOnly? Date { get; set; }
    [Range(1, int.MaxValue, ErrorMessage = "Vui lòng chọn danh mục.")]
    public int CategoryId { get; set; }
    [Required(ErrorMessage = "Vui lòng chọn trạng thái.")]
    [EnumDataType(typeof(TransactionStatus))]
    public TransactionStatus? Status { get; set; }
    [StringLength(500, ErrorMessage = "Ghi chú tối đa 500 ký tự.")]
    public string Notes { get; set; } = "";
    [Range(1, int.MaxValue)] public int Revision { get; set; } = 1;
}

public class StatusInput
{
    [Required, EnumDataType(typeof(TransactionStatus))] public TransactionStatus? Status { get; set; }
    [Range(1, int.MaxValue)] public int Revision { get; set; }
}

public record EntryView(int Id, string Title, long Amount, DateOnly Date, int CategoryId,
    string CategoryName, TransactionKind Kind, string Color, string Icon,
    TransactionStatus Status, string Notes, int Revision);
