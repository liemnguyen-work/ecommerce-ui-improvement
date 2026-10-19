# E-commerce UI Improvement

## 1 Giới thiệu

Bản mẫu giao diện thời trang Mặc, tập trung cải tiến thẻ sản phẩm để người xem nhận biết ngay giá hiện tại, giá trước đây và mức tiết kiệm. Đây là dự án học tập, không phải website chính thức của UNIQLO.

## 2 Website tham khảo

- Tên: UNIQLO Việt Nam.
- URL: https://www.uniqlo.com/vn/vi/
- Khu vực: trang chủ, danh mục, chi tiết sản phẩm, tìm kiếm, giỏ hàng.
- Minh chứng gốc ngày 20/10/2026 cho thấy UNIQLO đã có giá mới và giá cũ gạch ngang. Hướng cải tiến là bổ sung mức tiết kiệm, không kết luận website thiếu phân biệt giá.

## 3 Chức năng

- Hiển thị bốn sản phẩm mẫu với hình, tên, màu, kích cỡ và hai mức giá.
- Hiển thị số tiền tiết kiệm và tỷ lệ giảm làm tròn.
- Mở và đóng mô tả từng sản phẩm bằng nút Xem chi tiết.
- Điều hướng tới bộ sưu tập, giới thiệu và đầu trang.
- Bố cục bốn cột trên máy tính, hai cột trên máy tính bảng, một cột trên điện thoại.

## 4 Công nghệ

HTML5 và CSS3 thuần. Sử dụng SVG tự vẽ cho hình minh họa. Không có JavaScript, thư viện bên ngoài, backend, cơ sở dữ liệu hoặc tải tài nguyên từ mạng.

## 5 Cách chạy

Giải nén toàn bộ thư mục rồi mở index.html bằng trình duyệt. Giữ nguyên thư mục css/ và images/ cùng cấp với index.html. Không cần cài đặt hay kết nối mạng.

## 6 Cải tiến đã thực hiện

Mỗi thẻ có giá hiện tại nổi bật, giá trước đây gạch ngang, nhãn tỷ lệ và dòng Tiết kiệm. Ví dụ 391.000đ - 293.000đ = 98.000đ; tỷ lệ làm tròn là 25%. Các mức giá trong trang là dữ liệu mẫu, không phải giá bán hiện tại của UNIQLO. Giá trị được viết sẵn cho trang tĩnh; khi đổi giá cần sửa đồng thời số tiền tiết kiệm và tỷ lệ.

CSS tách riêng, chia nhóm và có chú thích. HTML sử dụng header, nav, main, section, article, details, summary, aside và footer. Ảnh có mô tả thay thế, nút có viền khi dùng bàn phím và có liên kết bỏ qua điều hướng.

## 7 Hỗ trợ từ AI

ChatGPT/Codex hỗ trợ đọc đề, khảo sát UNIQLO, đề xuất bố cục, viết HTML/CSS, tạo hình SVG và kiểm tra bản xem trước. AI đã kiểm tra bốn phép tính tiết kiệm, tải ảnh, bố cục tại nhiều chiều rộng và thao tác mở/đóng mô tả. Chi tiết nằm trong AI_USAGE.md và KIEM_TRA.md.

Phần sinh viên tự kiểm tra, điều chỉnh và bổ sung chưa được xác nhận trong cuộc trò chuyện; cần cập nhật sau khi thực sự thực hiện. Mẫu đề xuất tăng cỡ chữ dòng Tiết kiệm trong báo cáo chưa được áp dụng vào mã nguồn của gói này.

## 8 Sinh viên kiểm tra và tự điều chỉnh

Mở trang trên trình duyệt, xem ở kích thước máy tính và điện thoại, thử từng nút Xem chi tiết. Tự phát hiện và sửa ít nhất một điểm rồi ghi lại vấn đề, thay đổi, kết quả và phần HTML/CSS liên quan. Yêu cầu này chưa được xác nhận hoàn thành chỉ vì AI đã tạo và kiểm tra bản mẫu.

## 9 Hình minh họa

Các hình trong images/ là SVG do AI viết riêng cho bản mẫu, không sao chép ảnh sản phẩm hoặc logo UNIQLO. Các mô tả chất liệu, màu và kích cỡ là nội dung sản phẩm minh họa.


## 10 Đưa lên GitHub và GitHub Pages

Tải toàn bộ nội dung bên trong thư mục ecommerce-ui-improvement lên repository Public của sinh viên, giữ nguyên hai thư mục css/ và images/. index.html, README.md và AI_USAGE.md cần nằm tại gốc repository. Không tải riêng file ZIP để thay cho mã nguồn.

Nếu triển khai GitHub Pages từ nhánh, chọn main và / (root). Dự án dùng đường dẫn tương đối nên có thể đặt trong website dự án. Chưa có repository hoặc đường dẫn triển khai được xác nhận trong gói này.
