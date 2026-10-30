# AI Usage Log Buổi 2

## 1. Công cụ và mục đích sử dụng

Tôi sử dụng ChatGPT/Codex để hỗ trợ tiếp tục phát triển bài tập Buổi 1 theo yêu cầu HTML5 và CSS3 của Buổi 2. Quá trình hỗ trợ gồm đọc đề, rà soát mã cũ, hoàn thiện giao diện, giải thích mã, chạy kiểm tra trình duyệt, chuẩn bị minh chứng, cập nhật GitHub và trình bày báo cáo.

## 2. Nhật ký trao đổi và quá trình thực hiện

Nội dung dưới đây là bản tóm lược trao đổi thực tế. Các câu yêu cầu được biên tập lại cho rõ ý; những bước AI triển khai trong cùng một yêu cầu được nhóm theo công việc, không phải bản chép nguyên văn từng tin nhắn.

### 2.1. Đọc đề và xác định phạm vi

**Tôi trao đổi:** “Mình quay lại bài tập cá nhân Buổi 2. Bạn đọc kỹ đề, hướng dẫn các bước làm và đề xuất những phần cần trình bày trong báo cáo Word.”

**AI hỗ trợ:** Đọc tài liệu 23 trang và xác định phải tiếp tục mã nguồn, repository của Buổi 1. Từ bài đã làm theo hướng tham khảo UNIQLO Việt Nam, khu vực được tiếp tục phát triển là danh sách và thẻ sản phẩm của bản mẫu Mặc. AI phân biệt các nội dung trọng tâm với CSS Grid là phần mở rộng, đồng thời lưu ý yêu cầu tự sửa một vấn đề và trả lời bảy câu hỏi kiến thức.

**Kết quả:** Xác định được phạm vi làm bài và các phần cần có trong báo cáo; không chuyển sang tạo một website mới.

### 2.2. Rà soát và hoàn thiện mã HTML/CSS

**Tôi trao đổi:** “Bạn hoàn thiện phần code trước, sau đó ghi nhận báo cáo dựa trên những gì đã thực hiện.”

**AI hỗ trợ rà soát:** Mở mã Buổi 1 và xác nhận đã có HTML5 có ngữ nghĩa, CSS riêng, Flexbox, Grid, hover và focus. Các điểm cần cải thiện được xác định từ mã thực tế: chữ nhóm sản phẩm là 9px, dòng giá trước đây là 11px trên máy tính; kích cỡ đang nằm cùng đoạn văn với màu; summary có đổi màu khi hover nhưng chưa có transition cho nền và màu chữ.

**AI hỗ trợ chỉnh HTML:** Giữ cấu trúc header, nav, main, section, article, aside, footer và details/summary. Bổ sung ul/li cho menu và kích cỡ, tách thông tin màu khỏi danh sách kích cỡ, giữ alt cho ảnh và thêm liên kết mở đúng tệp ảnh SVG đang có.

**AI hỗ trợ chỉnh CSS:** Tăng cỡ chữ phụ lên 11px và 13px trên máy tính; dùng Flexbox cho danh sách kích cỡ với align-items, justify-content, gap và flex-wrap; giữ Grid 4/2/1 cột theo chiều rộng; bổ sung transition 0,2 giây cho summary và giữ focus-visible. Các nhóm quy tắc có chú thích để đọc và giải thích lại.

**Kết quả:** Có bản HTML/CSS tiếp tục từ Buổi 1, giữ bốn sản phẩm, hình minh họa và giá mẫu. Các kích cỡ chỉ là thông tin hiển thị, chưa được biến thành nút chọn khi không có chức năng tương ứng.

### 2.3. Kiểm tra giao diện và ghi nhận kết quả

**Nội dung tiếp theo trong yêu cầu hoàn thiện bài:** Ghi nhận báo cáo sau khi đã hoàn thành và kiểm tra phần code.

**AI hỗ trợ:** Chạy 12 nhóm kiểm tra trên Chromium tại viewport 1366, 1024, 768, 390, 360 và 320px. Các kiểm tra gồm tải HTML/CSS/ảnh, số cột, tràn ngang, liên kết nội trang, mở ảnh SVG, mở/đóng details, hover, focus bằng phím Tab, thao tác Enter, giảm chuyển động và phép tính tiết kiệm. Cách mở trực tiếp index.html bằng file:// cũng được kiểm tra.

**Kết quả:** Không ghi nhận tràn ngang ở sáu viewport đã thử; ảnh và liên kết hoạt động; trạng thái hover/focus và mở/đóng chi tiết đúng trong các thao tác đã kiểm tra. Kết quả do AI chạy được lưu tại [KIEM_TRA.md](KIEM_TRA.md) và [dữ liệu gốc](minh-chung/ket-qua-kiem-thu.json); ảnh nằm trong thư mục minh-chung. Đây là kiểm tra mô phỏng trên máy tính, chưa phải thử trên điện thoại vật lý.

### 2.4. Làm rõ trạng thái và cập nhật GitHub

**Tôi trao đổi:** Hỏi bản mới đã được cập nhật lên GitHub chưa, sau đó yêu cầu AI đẩy bản Buổi 2 lên repository giúp mình.

**AI hỗ trợ:** Làm rõ rằng gói mã ban đầu mới ở máy cục bộ; sau khi có yêu cầu cập nhật, lấy bản repository hiện tại, đưa mã và tài liệu Buổi 2 lên nhánh main rồi đối chiếu commit trên GitHub với bản cục bộ.

**Kết quả:** Commit triển khai mã Buổi 2 là [7f56d75](https://github.com/liemnguyen-work/ecommerce-ui-improvement/commit/7f56d75c627e90a74f9f67ceb29f65d2ea161f11), gồm 20 tệp thay đổi và bổ sung, có 13 ảnh minh chứng. Lịch sử Buổi 1 vẫn được giữ. Việc triển khai hoặc kiểm tra lại GitHub Pages chưa được xác nhận trong lượt hỗ trợ này.

### 2.5. Trình bày báo cáo và xác định phần cần tự bổ sung

**Tôi trao đổi:** “Bạn dựa vào format báo cáo Buổi 1 để làm báo cáo Buổi 2; phần nào cần mình bổ sung thì chừa trống.”

**AI hỗ trợ:** Đọc mẫu Word đã gửi, giữ khung bìa UEH, thông tin học phần, font Times New Roman, cỡ chữ chính 13, giãn dòng 1,5 và cách trình bày tiêu đề, bảng, hình. Nội dung báo cáo được sắp xếp theo mã đã thực hiện và kết quả kiểm tra, có mục lục và phần trả lời bảy câu hỏi.

**Kết quả:** Báo cáo có các chỗ trống để sinh viên điền ngày nộp, kết quả tự kiểm tra, một thay đổi độc lập, ảnh trước/sau của thay đổi đó, nhận xét cá nhân và ảnh GitHub. Những phần này không được ghi thành việc đã hoàn thành khi chưa thực hiện.

### 2.6. Bổ sung cải tiến cỡ chữ dòng Tiết kiệm

**Nội dung yêu cầu được tóm lược:** Sinh viên giao AI chủ động chọn một thay đổi phù hợp, thực hiện và ghi nhận kết quả để tiếp tục hoàn thiện bài.

**AI hỗ trợ:** Chọn tăng cỡ chữ dòng Tiết kiệm để làm rõ thông tin ưu đãi. Trước khi sửa, chụp bản hiện tại tại viewport 1366, 768 và 390px. Sau đó đổi font-size của `.savings` cơ sở từ 13px thành 15px, và quy tắc dưới 600px từ 14px thành 16px.

**Kết quả kiểm tra của AI:** Ở 1366px và 768px, computed style là 15px; ở 390px là 16px. Bốn dòng Tiết kiệm tại từng viewport đều nằm trong khung; Grid giữ 4/2/1 cột, ảnh tải được và không ghi nhận tràn ngang hoặc lỗi tài nguyên trong lượt thử. Ảnh trước/sau và dữ liệu nằm trong [minh-chung/dieu-chinh-font](minh-chung/dieu-chinh-font).

Lượt chỉnh sửa và kiểm tra này do AI thực hiện theo yêu cầu hỗ trợ. Phần sinh viên tự thao tác và tự giải thích vẫn cần được xác nhận sau khi thực hành.

## 3. Kết quả AI đề xuất và cách đối chiếu

- Giữ các thành phần HTML5, Flexbox, Grid và focus vốn đã có; không kết luận sai rằng bài cũ thiếu chúng.
- Tách menu và kích cỡ thành ul/li để phù hợp với nội dung dạng danh sách.
- Tăng cỡ chữ phụ và bổ sung transition; các giá trị được đối chiếu với CSS và computed style trong lượt kiểm tra của AI.
- Giữ các ô kích cỡ là thông tin tĩnh; không dùng nút chọn giả khi chưa có chức năng chọn biến thể.
- Dùng liên kết mở ảnh SVG có thật; không thêm liên kết tới product-detail.html khi dự án chưa có trang này.
- Giữ giá mẫu và kiểm tra phép trừ, tỷ lệ làm tròn; không gọi đó là giá bán hiện tại của UNIQLO.

## 4. Phần sinh viên tự kiểm tra và điều chỉnh

Các lượt kiểm tra trình duyệt nêu trên do AI thực hiện. Phần sinh viên tự phát hiện và sửa một điểm cần được bổ sung sau khi thực hành theo [THUC_HANH_CA_NHAN.md](THUC_HANH_CA_NHAN.md):

- Vấn đề tôi tự phát hiện: [bổ sung sau khi quan sát].
- Tệp, selector hoặc phần tử tôi tự sửa: [bổ sung].
- Giá trị trước và sau khi sửa: [bổ sung].
- Lý do lựa chọn thay đổi: [bổ sung].
- Kết quả tôi tự kiểm tra lại và kích thước màn hình: [bổ sung].
- Ảnh minh chứng trước/sau: [bổ sung đường dẫn].

## 5. Các thành phần cần hiểu để giải thích

Vai trò của article, ul/li, img/alt và details/summary; element/class/descendant selector; margin, padding và border-box; Flexbox với hai trục; Grid 4/2/1 cột; hover và focus; media query; đường dẫn tương đối. Đây là nội dung AI đã giải thích để sinh viên đọc, thực hành và tự xác nhận mức hiểu.

## 6. Giới hạn

Trang sử dụng HTML5/CSS3 và dữ liệu giá tĩnh; chưa có chức năng tìm kiếm, lọc, sắp xếp hay giỏ hàng bằng JavaScript. Kết quả kiểm tra không thay thế việc sinh viên tự chạy, sửa mã và giải thích bài. Chưa kiểm tra trên thiết bị vật lý, nhiều trình duyệt hoặc xác nhận lại GitHub Pages.
