# Bài thực hành tự điều chỉnh trước khi nộp

Đề yêu cầu sinh viên tự phát hiện và sửa ít nhất một vấn đề. Code, kiểm thử và ảnh do AI chuẩn bị không thay thế yêu cầu này.

## Một phương án ngắn để thực hành

1. Mở index.html, xem ở chiều rộng 1366px và tự đánh giá dòng Tiết kiệm.
2. Chụp ảnh trước. Nếu thấy cần tăng độ rõ, mở css/style.css, tìm đúng quy tắc `.savings` cơ sở.
3. Tự đổi `font-size: 13px` thành `font-size: 14px` trong quy tắc đó, lưu tệp rồi tải lại trang.
4. Kiểm tra ở 1366px và 390px. Quy tắc mobile đã đặt 14px nên điện thoại có thể không đổi.
5. Chụp ảnh sau; ghi nhận có vỡ dòng/tràn hay không. Chỉ giữ thay đổi nếu kết quả phù hợp.

Đây là gợi ý để sinh viên tự thực hiện, chưa được áp dụng vào gói ban đầu. Có thể chọn vấn đề khác thực sự quan sát được.

## Bổ sung sau khi làm

- Vấn đề bản thân phát hiện: [điền sau khi quan sát].
- File và thuộc tính đã tự sửa: [điền].
- Giá trị trước và sau: [điền].
- Kết quả kiểm tra lại và viewport: [điền].
- Ảnh minh chứng: [điền đường dẫn].

Sau khi có kết quả, cập nhật mục 4.3 và câu trả lời 6.7 trong báo cáo Word, AI_USAGE.md và KIEM_TRA.md. Các kết quả tự động hiện có mô tả bản trước thay đổi thủ công; kiểm tra lại phần bị tác động trước khi nộp.

## Ôn sửa mã trực tiếp

- Đổi padding: tìm `.product-content`; dự đoán nội dung cách mép nhiều hơn hay ít hơn.
- Đổi màu giá: tìm `.current-price`; cân nhắc biến `--accent` ảnh hưởng nhiều thành phần.
- Đổi số cột: tìm `.product-grid` và media query đang có hiệu lực.
- Đổi khoảng cách menu: tìm `.nav-list`; ở mobile có quy tắc riêng.
- Sửa alt: tìm đúng ảnh trong index.html và dùng mô tả nội dung ảnh.
