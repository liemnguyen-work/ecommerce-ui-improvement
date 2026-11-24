# ASP.NET Core MVC – Cửa hàng phim

**Sinh viên:** Nguyễn Thanh Liêm – **MSSV:** 31241023460  
**Lớp học phần:** 26C1INF50902702  
**Giảng viên:** TS. Nguyễn Mạnh Tuấn

- Website: [liem31241023460.somee.com](http://liem31241023460.somee.com)
- Repository hiện có: [ecommerce-ui-improvement](https://github.com/liemnguyen-work/ecommerce-ui-improvement)

## Mục tiêu

Xây dựng cửa hàng phim bằng ASP.NET Core MVC: quản lý phim và thể loại, tải ảnh, đăng ký/đăng nhập, giỏ hàng, lưu đơn và gửi email xác nhận. Đây là bài thực hành; bước Thanh toán xác nhận đơn hàng, chưa tích hợp cổng thanh toán thực.

## Công nghệ

- .NET 10, C#, ASP.NET Core MVC và Razor Views.
- Entity Framework Core SQL Server và ASP.NET Core Identity, phiên bản 10.0.x.
- SQL Server Somee; cơ sở dữ liệu triển khai đã có bảng Identity, Genres, Movies, HoaDons, ChiTietHoaDons và ShippingDetails.
- Session lưu giỏ hàng; Newtonsoft.Json chuyển đối tượng sang JSON.
- Bootstrap, jQuery Validation; SMTP Gmail qua EmailServiceNew.
- Công cụ thực hiện: Windows, VS Code, SDK 10.0.404, dotnet-ef và SQL Server extension.

## Chức năng

- Đăng ký, xác nhận tài khoản theo template thực hành, đăng nhập và đăng xuất.
- Quản lý phim và thể loại; danh sách dạng thẻ, có hình ảnh, giá và xếp hạng.
- Kiểm tra ngày phát hành trong tương lai và mã thể loại tồn tại; các ràng buộc tên, giá, xếp hạng nằm trong Models.
- Tải ảnh khi tạo/sửa; giữ ảnh cũ khi không chọn ảnh thay thế; dùng ảnh mặc định nếu tạo phim không tải ảnh.
- Thêm nhiều phim vào giỏ, cập nhật số lượng 1–99, xóa dòng và tính tổng; thanh menu hiển thị tổng số lượng và tiền.
- Checkout kiểm tra thông tin, lưu hóa đơn/chi tiết/giao hàng rồi gửi email; thông báo riêng khi không gửi được email; xóa giỏ sau khi lưu đơn.
- Bố cục đáp ứng; đã kiểm tra bằng Chrome Device Mode ở 390 × 844.

## Cấu trúc

~~~text
ASP-CORE/
├── README.md
├── .gitignore
└── SourceCode/
    ├── 31241023460_NguyenThanhLiem.csproj
    ├── Program.cs
    ├── appsettings.example.json
    ├── Areas/Identity/
    ├── Controllers/
    ├── Data/
    ├── Extension/
    ├── Migrations/
    ├── Models/
    ├── Properties/
    ├── Validation/
    ├── Views/
    └── wwwroot/
~~~

Theo cấu trúc nộp bài, thư mục Report/ sẽ được bổ sung file BaiTap_CaNhan_ASP_CORE_LMS.docx và images/ khi hoàn tất tổng hợp báo cáo.

## Cấu hình và chạy

1. Cài .NET SDK 10.0.x và chuẩn bị một cơ sở dữ liệu SQL Server có quyền tạo bảng. Máy chưa có công cụ EF có thể cài:

   ~~~powershell
   dotnet tool install --global dotnet-ef --version 10.0.15
   ~~~

2. Mở terminal tại ASP-CORE/SourceCode, tạo cấu hình riêng từ mẫu:

   ~~~powershell
   Copy-Item .\appsettings.example.json .\appsettings.json
   ~~~

3. Trong file appsettings.json trên máy, thay các giá trị YOUR_SQL_SERVER, YOUR_DATABASE, YOUR_SQL_LOGIN và YOUR_SQL_PASSWORD bằng thông tin SQL Server của mình. Giữ đúng tên khóa ConnectionStrings:DefaultConnection. Không dùng thông tin đăng nhập của người khác.

4. Để thử email, cấu hình Email:Address bằng Gmail của mình và Email:AppPassword bằng mật khẩu ứng dụng đã tạo sau khi bật Xác minh 2 bước. Nhập 16 ký tự liền nhau. Có thể dùng User Secrets hoặc biến môi trường ConnectionStrings__DefaultConnection, Email__Address và Email__AppPassword để ghi đè cấu hình.

5. Khôi phục package, áp dụng các migration có sẵn rồi chạy:

   ~~~powershell
   dotnet restore
   dotnet ef database update
   dotnet run --launch-profile https
   ~~~

   Mở https://localhost:7094/Movies. Nếu chưa có chứng chỉ HTTPS tin cậy trên máy, dùng dotnet dev-certs https --trust, hoặc chạy profile http và mở http://localhost:5255/Movies.

6. Migration tạo cấu trúc bảng; không kèm tài khoản, đơn hàng hoặc bản sao dữ liệu cá nhân. Trên cơ sở dữ liệu mới, vào /Genres để tạo thể loại trước, rồi /Movies để nhập phim. Trường Thể loại dạng số cần là ID thể loại đang tồn tại, và chọn GenreID tương ứng. Chọn ngày phát hành ở tương lai theo quy tắc thực hành.

7. Đăng ký tài khoản mới. Template thực hành cung cấp liên kết xác nhận trực tiếp khi chưa cài dịch vụ gửi thư của Identity. Email đơn hàng là chức năng SMTP riêng trong Extension/EmailServiceNew.cs.

## Dữ liệu và quan hệ

- Genre có nhiều Movie qua GenreID.
- HoaDon có nhiều ChiTietHoaDon; mỗi chi tiết tham chiếu Movie qua MaMovie.
- ShippingDetail lưu thông tin người nhận. Hiện Checkout lưu thông tin này cùng lần SaveChangesAsync với hóa đơn, chưa có khóa ngoại trực tiếp giữa ShippingDetail và HoaDon.
- Dữ liệu minh họa đang triển khai gồm 5 phim thuộc Hành Động, Viễn Tưởng, Hoạt Hình. Ảnh được dùng trong phạm vi bài thực hành.
- Giỏ dùng bộ nhớ Session, có thể mất khi khởi động lại ứng dụng hoặc hết thời gian phiên.

## Triển khai Somee

~~~powershell
dotnet publish -c Release -o ./publish
~~~

Tải nội dung thư mục publish lên thư mục gốc website bằng Upload archive (biểu tượng chiếc hộp có mũi tên lên). File web.config phải nằm ngay ở gốc sau giải nén. Trong lần triển khai này, đã bỏ riêng các thư mục runtimes/linux-x64, runtimes/osx-x64, runtimes/osx-arm64 khỏi bản publish để phù hợp hosting Windows và dung lượng gói miễn phí; vẫn giữ các thư mục Windows. Bản giải nén khoảng 98 MiB, ZIP khoảng 37 MB. Không sửa/xóa các thư mục này trong mã nguồn.

Giữ quảng cáo Somee và duy trì website hoạt động theo điều kiện của gói hosting. Bản triển khai đã kiểm tra danh sách phim, đăng nhập, giỏ và email Checkout; email đơn hàng mới nhận được khớp mã đơn trên trang Thanks.

## Cấu hình riêng

Repository dùng appsettings.example.json. File cấu hình thật, mật khẩu SQL/Gmail, App Password, cơ sở dữ liệu app.db, bin/, obj/, publish/ và ZIP triển khai không nằm trong bản mã nguồn này. File .gitignore của ASP-CORE loại các đường dẫn đó. Không tải file ZIP triển khai chứa cấu hình thật lên GitHub.
