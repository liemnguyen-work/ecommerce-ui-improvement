# Kết quả kiểm thử Buổi 2

Người chạy: AI Codex. Ngày ghi nhận: 30/10/2026. Mã được kiểm tra có .savings 15px ở quy tắc cơ sở, 16px dưới 600px.

| Nhóm kiểm tra | Kết quả |
| --- | --- |
| HTML có 4 sản phẩm; ảnh và alt đầy đủ; CSS tải đúng; lưới 4/2/1 cột, không tràn ngang | Đạt |
| Box Model và Flexbox | Đạt |
| Hover và transition của summary | Đạt |
| Dùng Tab đến summary và hiển thị focus-visible | Đạt |
| 4 mục chi tiết mở bằng HTML gốc; Enter mở/đóng; 4 liên kết ảnh mở đúng SVG | Đạt |
| Liên kết điều hướng nội trang có đích và hoạt động | Đạt |
| 4 phép tính tiết kiệm và tỷ lệ làm tròn | Đạt |
| prefers-reduced-motion tắt chuyển động | Đạt |
| Thử bỏ Grid để trả lời câu hỏi kiến thức | Đạt |
| Mở trực tiếp index.html qua file://, CSS và ảnh tải đúng | Đạt |
| Không lỗi tải tài nguyên, không lỗi JavaScript, không yêu cầu mạng ngoài | Đạt |
| HTML5 và CSS3 thuần, không script hoặc framework | Đạt |

## Kích thước màn hình

| Viewport | Số cột | Chiều rộng tài liệu | Cỡ chữ Tiết kiệm | Hiển thị |
| --- | --- | --- | --- | --- |
| 1366px | 4 | 1366px | 15px | 4 ảnh tải được, dòng tiết kiệm trong khung |
| 1024px | 4 | 1024px | 15px | 4 ảnh tải được, dòng tiết kiệm trong khung |
| 768px | 2 | 768px | 15px | 4 ảnh tải được, dòng tiết kiệm trong khung |
| 390px | 1 | 390px | 16px | 4 ảnh tải được, dòng tiết kiệm trong khung |
| 360px | 1 | 360px | 16px | 4 ảnh tải được, dòng tiết kiệm trong khung |
| 320px | 1 | 320px | 16px | 4 ảnh tải được, dòng tiết kiệm trong khung |

## Tệp minh chứng

- Lượt kiểm tra trước bước tự sửa: [dữ liệu](minh-chung/kiem-tra-cuoi/ket-qua-kiem-thu.json).
- Thay đổi cỡ chữ: [máy tính](minh-chung/dieu-chinh-font/so-sanh-1366.png), [điện thoại](minh-chung/dieu-chinh-font/so-sanh-390.png).
- So sánh toàn bộ thẻ Buổi 1 và Buổi 2: [ảnh](minh-chung/kiem-tra-cuoi/so-sanh-buoi1-buoi2.png).
- Các kết quả cũ được giữ làm lịch sử; sau bước thực hành cá nhân dùng thư mục sinh-vien-tu-sua.

## Bổ sung sau bước sinh viên tự sửa

Sinh viên xác nhận đã sửa font-size dòng Giá trước đây trên điện thoại từ 12px lên 14px và tải lại trang; hai ảnh trước sau được lưu trong minh-chung/sinh-vien-tu-sua. AI đã đồng bộ thay đổi này lên bản repository và chạy kiểm tra tập trung ở 1366, 1024, 768, 390, 360 và 320px:

- Bốn dòng giá có cỡ chữ 14px dưới 600px, 13px trên màn hình lớn.
- Bốn dòng giá nằm trong khung và giữ một dòng ở các viewport đã thử.
- Lưới 4/2/1 cột, ảnh tải được, không tràn ngang; thẻ trên máy tính vẫn cao bằng nhau.
- [Dữ liệu kiểm tra sau đồng bộ](minh-chung/sinh-vien-tu-sua/kiem-tra-sau-dong-bo.json).

Các kết quả 12 nhóm trong thư mục kiem-tra-cuoi phía trên được giữ làm lịch sử trước thay đổi cỡ chữ cá nhân. Ảnh và phép đo sau bước thực hành dùng thư mục sinh-vien-tu-sua.

## Trạng thái cá nhân và giới hạn

Các phép đo tự động do AI thực hiện. Sinh viên tự thao tác sửa và tải lại trang theo hướng dẫn, đã gửi hai ảnh trước sau; xem THUC_HANH_CA_NHAN.md. Hai vai trò được ghi nhận riêng. Chưa thử điện thoại vật lý, nhiều trình duyệt hoặc kiểm định toàn bộ tiêu chuẩn accessibility. Xem DOI_CHIEU_YEU_CAU.md.
