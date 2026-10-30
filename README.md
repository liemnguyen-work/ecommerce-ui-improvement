# Bài tập cá nhân Buổi 2 HTML5 và CSS3

## Giới thiệu và kế thừa

Tiếp tục mã nguồn Buổi 1 của bản mẫu thời trang **Mặc**, tham khảo UNIQLO Việt Nam: https://www.uniqlo.com/vn/vi/. Trọng tâm là danh sách 4 sản phẩm. Sản phẩm, giá và hình SVG là dữ liệu học tập; không phải website hoặc giá bán hiện tại của UNIQLO.

## Chạy website

Mở `index.html` sau khi giải nén, giữ `css/` và `images/` cùng cấp. Không cần cài thư viện hoặc tải tài nguyên từ mạng. Đã kiểm tra mở trực tiếp bằng `file://` trong Chromium.

## Kỹ thuật và thay đổi Buổi 2

- Giữ HTML5 có ngữ nghĩa: header, nav, main, section, article, aside, footer, details/summary.
- Bổ sung ul/li cho menu và kích cỡ. Các ô kích cỡ là dữ liệu minh họa, không phải nút chọn.
- Thực hành element/class/descendant selector, margin, padding, border, border-radius và border-box.
- Flexbox cho nhóm kích cỡ và menu; Grid cho 4 cột từ 1024px, 2 cột ở 600–1023px, 1 cột dưới 600px.
- Tăng chữ nhóm sản phẩm 9→11px và giá trước đây 11→13px trên máy tính.
- Thêm transition 0,2 giây cho summary; giữ focus-visible và cấu hình giảm chuyển động.
- Thêm 4 liên kết mở ảnh SVG thật trong phần chi tiết; không tạo liên kết tới trang chưa tồn tại.
- Giữ 4 sản phẩm, hình, các mức giá và phép tính tiết kiệm của Buổi 1.

## Kiểm tra đã thực hiện

AI đã chạy 12 nhóm kiểm tra ở 1366, 1024, 768, 390, 360 và 320px. Không tràn ngang tại các viewport này; 4 ảnh có alt; liên kết hoạt động; summary mở/đóng; Tab hiển thị focus; hover, reduced motion và phép tính giá khớp. Chi tiết: [KIEM_TRA.md](KIEM_TRA.md), [dữ liệu gốc](minh-chung/ket-qua-kiem-thu.json).

## Minh chứng và báo cáo

`minh-chung/` chứa ảnh trước/sau, ảnh ở 3 viewport chính, trạng thái hover/focus và chi tiết mở. Báo cáo Word được cung cấp riêng trong gói bài tập của sinh viên; repository lưu mã nguồn, ảnh minh chứng và nhật ký AI. Nhật ký AI: [AI_USAGE.md](AI_USAGE.md).

## Sinh viên thực hành và GitHub

Xem [THUC_HANH_CA_NHAN.md](THUC_HANH_CA_NHAN.md) để tự chỉnh một điểm và bổ sung kết quả. AI chưa xác nhận sinh viên đã làm bước này. Tiếp tục repository Buổi 1; tải nội dung trong thư mục này vào gốc repository, không tải riêng tệp ZIP thay cho mã. Bản Buổi 2 cập nhật vào nhánh `main` của repository Buổi 1. Phần triển khai hoặc kiểm tra lại GitHub Pages chưa được thực hiện trong lượt cập nhật này.

Repository: https://github.com/liemnguyen-work/ecommerce-ui-improvement. Các ảnh và dữ liệu kiểm thử được ghi trước bước upload GitHub; trạng thái chưa upload trong dữ liệu gốc phản ánh thời điểm đó. URL website nếu đã triển khai: sinh viên bổ sung sau khi xác nhận.


## Điều chỉnh bổ sung dòng Tiết kiệm

Theo yêu cầu hỗ trợ tiếp, AI tăng font-size của `.savings` từ 13 lên 15px ở quy tắc cơ sở và từ 14 lên 16px ở media query dưới 600px. Kiểm tra tại 1366, 768 và 390px xác nhận cỡ chữ đúng, dòng thông tin nằm trong khung, lưới vẫn 4/2/1 cột và không tràn ngang ở các viewport này.

Ảnh trước/sau: [máy tính](minh-chung/dieu-chinh-font/so-sanh-1366.png), [điện thoại](minh-chung/dieu-chinh-font/so-sanh-390.png). Các ảnh và dữ liệu ban đầu được giữ lại; kết quả bổ sung ở `minh-chung/dieu-chinh-font/`. Tác giả thao tác và phương pháp kiểm tra được ghi trong AI_USAGE.md và KIEM_TRA.md.
