# Kết quả kiểm tra của AI

Các kiểm tra dưới đây do AI thực hiện trên bản xem trước chạy bằng HTTP trên máy, không phải xác nhận sinh viên đã tự kiểm tra. Kích thước là viewport trình duyệt mô phỏng, không phải thử trên thiết bị vật lý.

| Nội dung | Kết quả thực tế |
| --- | --- |
| Cấu trúc và tài nguyên | Có bốn thẻ sản phẩm, bốn ảnh có alt, năm file SVG hợp lệ tính cả favicon; các đường dẫn CSS và ảnh đều tồn tại. |
| Công nghệ | HTML5/CSS3, không có JavaScript hoặc thư viện ngoài. |
| Giá và tiết kiệm | Bốn phép trừ giá cũ trừ giá mới đều khớp số tiền tiết kiệm; tỷ lệ trên nhãn khớp kết quả làm tròn. |
| 1440px | Bốn cột, tất cả ảnh tải thành công, không tràn ngang. |
| 1024px | Bốn cột, không tràn ngang. |
| 768px | Hai cột, không tràn ngang. |
| 390px | Một cột, không tràn ngang; nút chi tiết cao 48px. |
| 360px và 320px | Một cột, không tràn ngang. |
| Mở đóng chi tiết | Đã thử cả bốn sản phẩm: mở bằng chuột, đóng bằng Enter thành công. |
| Điều hướng | Đã thử liên kết Bộ sưu tập, di chuyển tới khu vực sản phẩm. |

## Giới hạn

- Trình duyệt kiểm tra không cho mở giao thức file://. Cách mở trực tiếp index.html chưa được kiểm tra bằng công cụ trình duyệt này; các tài nguyên đều dùng đường dẫn tương đối và không có yêu cầu mạng bên ngoài. Sinh viên cần mở index.html sau giải nén để xác nhận trên máy của mình.
- Chưa thử trên điện thoại vật lý, trình đọc màn hình hoặc nhiều trình duyệt khác nhau.
- Chưa có xác nhận sinh viên tự phát hiện và chỉnh ít nhất một điểm. Phần đó cần được thực hiện và ghi nhận riêng.

## Giải thích CSS liên quan

- .product-grid dùng CSS Grid và minmax(0, 1fr) để chia cột có thể co lại.
- Từ 1024px trở lên: bốn cột; từ 600 đến 1023px: hai cột; dưới 600px: một cột.
- .current-price định dạng giá hiện tại; .previous-price chứa giá trước đây với del; .savings làm nổi mức tiết kiệm.
- details/summary mở đóng mô tả bằng chức năng HTML gốc.

Ảnh kiểm tra được lưu trong gói Nhiem_vu_3_UNIQLO.zip đã cung cấp ở Nhiệm vụ 3. Gói mã nguồn GitHub này giữ kết quả kiểm tra; không kèm lại các ảnh đó.
