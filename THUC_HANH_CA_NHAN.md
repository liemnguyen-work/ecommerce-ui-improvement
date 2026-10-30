# Ghi nhận sinh viên tự thực hành Buổi 2

## Vấn đề và thay đổi

Theo hướng dẫn AI, sinh viên mở trang ở chiều rộng 390px để quan sát dòng Giá trước đây. Thuộc tính font-size dành cho điện thoại đang là 12px; lựa chọn tăng lên 14px để tăng độ rõ.

- Tệp: css/style.css.
- Vị trí: `.previous-price` bên trong `@media (max-width: 599px)`.
- Trước: `.previous-price { font-size: 12px; }`.
- Sau: `.previous-price { font-size: 14px; }`.
- Quy tắc cơ sở dành cho màn hình lớn giữ 13px.

## Thao tác và minh chứng

Sinh viên đã xác nhận tự sửa, lưu và tải lại trang bằng Ctrl+R; hai ảnh trước sau được gửi trong cuộc trò chuyện. Ảnh sau cho thấy dòng giá trước đây lớn hơn và vẫn nằm trên một dòng của thẻ đang hiển thị. Hai ảnh cắt không chứa thanh viewport; thông số 390px được xác nhận trong ảnh DevTools của cùng lượt thao tác.

- [Ảnh trước](minh-chung/sinh-vien-tu-sua/truoc-390.png).
- [Ảnh sau](minh-chung/sinh-vien-tu-sua/sau-390.png).
- [So sánh](minh-chung/sinh-vien-tu-sua/so-sanh-390.png).
- [Ghi nhận nguồn minh chứng](minh-chung/sinh-vien-tu-sua/ghi-nhan.json).
- [Kiểm tra bản mã đồng bộ](minh-chung/sinh-vien-tu-sua/kiem-tra-sau-dong-bo.json).

AI hướng dẫn xác định quy tắc và thao tác, sau đó đồng bộ mã và tổng hợp tài liệu. Phép đo computed style ở sáu viewport do AI thực hiện riêng trên bản repository. Tệp CSS gốc hoặc ảnh trình soạn thảo của sinh viên chưa được cung cấp; nguồn ghi nhận thao tác là xác nhận và ảnh kết quả của sinh viên.
