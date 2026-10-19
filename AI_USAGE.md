# AI Usage Log

## 1 Công cụ AI

ChatGPT/Codex.

## 2 Mục đích sử dụng

Đọc yêu cầu bài tập, hỗ trợ khảo sát UNIQLO Việt Nam, đối chiếu nhận xét với hình ảnh thực tế, đề xuất cải tiến thẻ sản phẩm, tạo và giải thích HTML/CSS, kiểm tra bản mẫu và chuẩn bị tài liệu cho GitHub.

## 3 Prompt đã sử dụng

Các yêu cầu chính thực tế trong cuộc trò chuyện:

1. “Giờ tới bài tập cá nhân bạn ơi, đọc kĩ giúp mình và hướng dẫn nha” kèm tài liệu BaiTap_CaNhan_Chuong1.pdf.
2. “mình chọn của uniqlo nha: https://www.uniqlo.com/vn/vi/”
3. “cái này bạn làm cho mình luôn đi” sau phần trao đổi về khảo sát website và lưu minh chứng.
4. “Rồi giờ trình bày luôn nha, chỗ nào cần hình thì nói mình nha để mình lấy hình từ file bạn”.
5. Sinh viên yêu cầu tiếp Nhiệm vụ 2 và gửi ảnh prompt mẫu phân tích năm khu vực. AI cụ thể hóa mẫu cho UNIQLO và tổng hợp kết quả trên các minh chứng đã có.
6. Sinh viên gửi năm ảnh yêu cầu Nhiệm vụ 3 về xác định vấn đề, đề xuất giao diện, tạo mã và kiểm tra. AI tạo bản mẫu dựa trên hướng cải tiến đã trao đổi.
7. “bạn ghi lun i” khi trao đổi về mục tự điều chỉnh; AI đưa ví dụ tăng cỡ chữ dòng Tiết kiệm. Đây là đề xuất, chưa phải thay đổi đã được sinh viên xác nhận thực hiện.
8. “Tiếp nha, còn lại bạn đọc tiếp trong file mình ko chụp nữa” kèm các ảnh yêu cầu Nhiệm vụ 4.

Các prompt đầy đủ trình bày trong báo cáo Word là bản cụ thể hóa theo mẫu của đề. Không nhầm chúng với nguyên văn các yêu cầu ngắn hoặc các ảnh thực tế đã gửi ở trên.

## 4 Kết quả AI đề xuất

- Phân tích năm khu vực: trang chủ, danh mục, chi tiết, tìm kiếm và giỏ hàng.
- Chọn cải tiến bổ sung mức tiết kiệm và tỷ lệ giảm vào thẻ sản phẩm.
- Tạo bốn sản phẩm mẫu, giá minh họa và hình SVG riêng.
- Tách HTML/CSS; dùng CSS Grid và media query cho bố cục bốn, hai hoặc một cột.
- Dùng details/summary để mở và đóng mô tả bằng HTML gốc.
- Chuẩn bị README, nhật ký AI và báo cáo. Việc tạo repository và triển khai website chưa được xác nhận.

## 5 Kiểm tra và điều chỉnh

### Phần AI đã kiểm tra hoặc loại bỏ

- UNIQLO đã có giá mới và giá cũ gạch ngang; loại bỏ nhận xét cho rằng website chưa phân biệt hai mức giá.
- Một biến thể sản phẩm hết hàng không đồng nghĩa toàn bộ sản phẩm hết hàng.
- Tìm kiếm không có kết quả vẫn có lối tìm khác; không ghi rằng trang không hướng dẫn tiếp tục.
- Bản mẫu có đủ bốn sản phẩm, ảnh có alt và các đường dẫn tài nguyên tồn tại.
- Bốn phép trừ giá và tỷ lệ giảm làm tròn khớp dữ liệu hiển thị.
- Kiểm tra viewport 320, 360, 390, 768, 1024 và 1440px: không ghi nhận tràn ngang.
- Cả bốn mô tả mở được bằng chuột và đóng được bằng Enter.

### Phần sinh viên kiểm tra và điều chỉnh

Chưa có xác nhận sinh viên đã tự chạy hoặc sửa mã. Cần bổ sung sau khi thực hiện: vấn đề bản thân phát hiện, file đã sửa, thay đổi cụ thể, ảnh hoặc kết quả kiểm tra lại. Không ghi ví dụ tăng cỡ chữ Tiết kiệm thành việc đã hoàn thành nếu chưa sửa.

## 6 Phần tôi hiểu và có thể giải thích

Danh sách dưới đây là các nội dung đã được AI giải thích để sinh viên đọc lại và tự xác nhận mức hiểu, chưa phải bằng chứng rằng sinh viên đã nắm vững:

- header, nav, main, section và footer: phân chia các khu vực của trang.
- article: một thẻ sản phẩm.
- img và alt: ảnh minh họa và mô tả thay thế.
- del: biểu thị giá trước đây.
- details và summary: mở/đóng mô tả bằng HTML gốc.
- .product-grid và grid-template-columns: chia số cột.
- minmax(0, 1fr): giúp cột co lại mà không bị nội dung đẩy tràn.
- @media: thay đổi bố cục theo chiều rộng màn hình.
- .savings và font-size: định dạng dòng tiết kiệm và cỡ chữ.

Sau khi tự đọc hoặc chỉnh mã, sinh viên cập nhật mục này theo đúng những phần mình có thể giải thích.

## 7 Giới hạn và trạng thái

Trang tĩnh, không có backend, cơ sở dữ liệu hoặc giỏ hàng động. Giá trị tiết kiệm được viết sẵn; khi đổi giá phải sửa đồng thời mức tiết kiệm và tỷ lệ. Chưa thử điện thoại vật lý, nhiều trình duyệt hoặc đo hiệu quả với người dùng. Kiểm tra bản xem trước được thực hiện qua HTTP; sinh viên cần xác nhận mở trực tiếp index.html trên máy.

Gói này chỉ chuẩn bị mã nguồn và tài liệu. Chưa có bằng chứng repository Public, commit từ tài khoản sinh viên hoặc GitHub Pages đã được tạo.
