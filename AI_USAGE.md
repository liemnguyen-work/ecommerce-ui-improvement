# Nhật ký sử dụng AI Buổi 2

## Công cụ mục đích và cách ghi nhận

Công cụ: ChatGPT/Codex. Bài tiếp tục danh sách sản phẩm của bản mẫu Mặc, tham khảo UNIQLO Việt Nam, từ mã nguồn Buổi 1.

Nhật ký được biên tập theo từng nhóm công việc kỹ thuật đã thực hiện. Các câu yêu cầu dưới đây là cách diễn đạt lại nội dung hỗ trợ cho rõ ý, không phải bản chép nguyên văn hoặc các tin nhắn độc lập đã gửi. Kết quả được ghi từ mã, ảnh và dữ liệu kiểm tra thực tế.

## Quá trình trao đổi về mã nguồn

### 1. Rà lại bài Buổi 1 và cấu trúc HTML5

**Nội dung yêu cầu được diễn đạt lại:**

> Mình đang tiếp tục phần danh sách sản phẩm từ Buổi 1. Bạn xem lại HTML và CSS hiện có, chỉ ra phần nên giữ, phần cần cải thiện và giải thích cách dùng các thẻ HTML5 cho phù hợp nhé.

**Phản hồi và phần đã triển khai:** Mã cũ đã có header, nav, main, section, article, aside, footer và details/summary. Vì vậy, giữ cấu trúc chính và bốn sản phẩm; bổ sung ul/li cho menu và danh sách kích cỡ, giữ tiêu đề theo thứ bậc và alt mô tả ảnh. Các kích cỡ chỉ hiển thị thông tin vì bản mẫu chưa có chức năng chọn biến thể.

**Căn cứ đối chiếu:** index.html; bốn article sản phẩm, bốn ảnh có alt và các đích điều hướng nội trang.

### 2. Liên kết CSS và điều chỉnh selector cùng Box Model

**Nội dung yêu cầu được diễn đạt lại:**

> Mình muốn giữ CSS trong tệp riêng và làm thẻ sản phẩm dễ đọc hơn. Bạn kiểm tra đường dẫn CSS, cách chọn phần tử và giải thích margin, padding, border cùng border-box trên chính mã này nhé.

**Phản hồi và phần đã triển khai:** Tệp HTML liên kết css/style.css bằng đường dẫn tương đối. Element selector, class selector và descendant selector được dùng ở img, .product-card và .size-list li. Product-content có padding 18px trên máy tính; product-sizes có margin-top 12px; các ô kích cỡ có border và bo góc. Chữ nhóm sản phẩm tăng từ 9 lên 11px, dòng giá trước đây từ 11 lên 13px trên máy tính.

**Căn cứ đối chiếu:** css/style.css; computed style của bản hiện tại; ảnh so sánh Buổi 1 và Buổi 2.

### 3. Căn nhóm kích cỡ bằng Flexbox

**Nội dung yêu cầu được diễn đạt lại:**

> Các kích cỡ đang nằm chung với dòng màu sản phẩm. Bạn giúp tách chúng thành một nhóm rõ ràng và dùng Flexbox để sắp xếp; giải thích phần tử cha, justify-content, align-items và gap.

**Phản hồi và phần đã triển khai:** Mỗi nhóm kích cỡ dùng ul.size-list chứa bốn li. Flexbox đặt trên ul với justify-content: flex-start, align-items: center, gap: 6px và flex-wrap: wrap. Product-content dùng Flexbox theo cột để phần chi tiết nằm cuối thẻ khi mô tả đóng.

**Căn cứ đối chiếu:** ul.size-list trong HTML; display tính được là flex; bốn thẻ đóng cao bằng nhau ở viewport máy tính.

### 4. Giữ Grid và kiểm tra bố cục nhiều kích thước

**Nội dung yêu cầu được diễn đạt lại:**

> Mình đã có lưới sản phẩm. Bạn kiểm tra các mốc đổi số cột và ảnh, giữ bố cục phù hợp khi xem trên máy tính, máy tính bảng và điện thoại.

**Phản hồi và phần đã triển khai:** Grid giữ bốn cột từ 1024px, hai cột từ 600 đến 1023px và một cột dưới 600px. Minmax(0, 1fr) cho phép cột co lại; gap quản lý khoảng cách giữa thẻ. Ảnh giữ tỷ lệ trong khung bằng aspect-ratio và object-fit: cover.

**Căn cứ đối chiếu:** Kết quả viewport 1366, 1024, 768, 390, 360 và 320px; ảnh tải được và không ghi nhận tràn ngang.

### 5. Hoàn thiện hover và focus của phần xem chi tiết

**Nội dung yêu cầu được diễn đạt lại:**

> Nút Xem chi tiết cần phản hồi rõ khi rê chuột và khi dùng bàn phím. Bạn kiểm tra hover, thêm chuyển đổi nhẹ và giữ dấu hiệu focus dễ nhận biết.

**Phản hồi và phần đã triển khai:** Summary kế thừa hover và được thêm transition 0,2 giây cho màu nền, màu chữ, đường viền. Focus-visible dùng viền xanh 3px. Tab tới được summary; Enter mở rồi đóng details. Khi bật prefers-reduced-motion, transition trở về 0 giây.

**Căn cứ đối chiếu:** Ảnh bình thường, hover, focus và kết quả kiểm tra bàn phím trong dữ liệu cuối.

### 6. Tăng độ rõ của dòng Tiết kiệm

**Nội dung yêu cầu được diễn đạt lại:**

> Bạn chọn một điểm trình bày cần cải thiện thêm trên thẻ sản phẩm, thực hiện thay đổi nhỏ và lưu ảnh trước sau để đối chiếu.

**Phản hồi và phần đã triển khai:** Lựa chọn tăng font-size của .savings từ 13 lên 15px ở quy tắc cơ sở và từ 14 lên 16px trong media query dưới 600px. Giữ màu, nền và khoảng cách hiện có. Ảnh trước sau được chụp từ hai trạng thái mã thật; computed style khớp giá trị mới, bốn dòng tiết kiệm đều nằm trong khung tại các viewport đã thử.

**Căn cứ đối chiếu:** minh-chung/dieu-chinh-font; before/after-1366.png, before/after-390.png và ket-qua.json.

### 7. Kiểm tra kết quả thay vì chỉ dựa vào đề xuất

**Nội dung yêu cầu được diễn đạt lại:**

> Bạn kiểm tra bản HTML và CSS đã cập nhật, chỉ kết luận những gì có thể đối chiếu bằng mã, thao tác trình duyệt và ảnh; lưu các kết quả để đưa vào báo cáo.

**Phản hồi và phần đã triển khai:** Lượt kiểm tra cuối chạy 12 nhóm kiểm tra ở sáu viewport. HTML/CSS và ảnh tải đúng; liên kết nội trang và bốn liên kết SVG hoạt động; giá tiết kiệm và tỷ lệ làm tròn khớp; hover, focus, Enter và giảm chuyển động hoạt động trong phạm vi thử. Mở trực tiếp bằng file:// tải được CSS và ảnh.

**Căn cứ đối chiếu:** minh-chung/kiem-tra-cuoi/ket-qua-kiem-thu.json; các ảnh chụp đi kèm; người chạy kiểm thử là AI Codex.

### 8. Đồng bộ mã nguồn tài liệu và báo cáo

**Nội dung yêu cầu được diễn đạt lại:**

> Bạn dùng lại repository Buổi 1, cập nhật README và nhật ký AI để người đọc biết phần đã thay đổi, cách chạy và kết quả kiểm tra; báo cáo Word cần khớp với bản mã trên GitHub.

**Phản hồi và phần đã triển khai:** Repository ecommerce-ui-improvement dùng nhánh main. Lịch sử Buổi 1 được giữ; bản mã trước bước tự sửa gắn với commit 0034bbb. README, nhật ký, câu hỏi kiến thức và bảng đối chiếu đề được đồng bộ. Word giữ mẫu đã cung cấp, thay các ô trống có căn cứ bằng kết quả và ảnh thật, cập nhật mục lục sau khi dàn trang.

**Căn cứ đối chiếu:** README.md, KIEM_TRA.md, DOI_CHIEU_YEU_CAU.md, CAU_HOI_KIEN_THUC.md và báo cáo Word cập nhật.

### 9. Sinh viên tự thao tác sửa cỡ chữ trên điện thoại

Phần này ghi nhận lượt trao đổi bổ sung có ảnh thật do sinh viên cung cấp, sau khi bản báo cáo trước còn để trống bước thực hành cá nhân.

- Sinh viên hỏi cách thực hiện mục 4.4. AI hướng dẫn kiểm tra dòng “Giá trước đây”, chỉ vị trí `.previous-price` trong media query dưới 600px và giải thích việc tăng từ 12px lên 14px.
- Sinh viên mở DevTools, xác nhận chiều rộng 390px và gửi ảnh trước sửa. Khi nhầm DevTools với trình soạn thảo, sinh viên được hướng dẫn mở `css/style.css` bằng VS Code và sửa đúng quy tắc dành cho điện thoại.
- Sinh viên xác nhận: “mình sửa r và ctrl R lun r”, rồi gửi ảnh sau. Ảnh cho thấy dòng giá trước đây lớn hơn, vẫn nằm trong một dòng ở thẻ được chụp.
- AI lưu nguyên hai ảnh, đồng bộ thay đổi đã được sinh viên báo cáo lên bản repository, kiểm tra computed style ở sáu viewport và cập nhật báo cáo. Phép đo tự động là công việc AI thực hiện riêng.

Minh chứng: `minh-chung/sinh-vien-tu-sua/truoc-390.png`, `sau-390.png`, `so-sanh-390.png`, `ghi-nhan.json` và `kiem-tra-sau-dong-bo.json`. Đây là thao tác sinh viên tự làm theo hướng dẫn AI, không phải tự nghiên cứu hoàn toàn không có hỗ trợ.

## Nội dung được giữ hoặc điều chỉnh khi đối chiếu

- Giữ semantic HTML, Grid, Flexbox và focus vốn đã có trong mã cũ.
- Dùng ul/li cho dữ liệu kích cỡ; không tạo nút chọn khi chưa có chức năng chọn biến thể.
- Mở đúng ảnh SVG có thật; không trỏ tới trang product-detail.html chưa tồn tại.
- Giữ giá mẫu và kiểm tra phép tính; không coi đây là giá bán hiện tại của UNIQLO.
- Kiểm tra cả quy tắc cơ sở và media query khi đổi cỡ chữ .savings.

## Vai trò thực hiện sau khi bổ sung thực hành

Sinh viên lựa chọn website tham khảo, cung cấp đề và mẫu báo cáo, yêu cầu tiếp tục phát triển và cập nhật repository. AI hỗ trợ phân tích, tạo thay đổi HTML/CSS, chạy kiểm thử và tổng hợp tài liệu. Các lượt triển khai trước giai đoạn 9 do AI hỗ trợ thực hiện; giai đoạn 9 ghi riêng thao tác sinh viên tự làm theo hướng dẫn.

Sinh viên đã tự sửa dòng giá trước đây trên bản cục bộ, tải lại trang và cung cấp ảnh trước sau. Nhận định này dựa trên xác nhận và ảnh của sinh viên; chưa nhận tệp CSS hoặc ảnh trình soạn thảo. Bản repository được đồng bộ đúng thay đổi 12px → 14px và được AI kiểm tra riêng. Xem THUC_HANH_CA_NHAN.md và DOI_CHIEU_YEU_CAU.md.

## Giới hạn kiểm tra

Kiểm thử bằng Chromium và viewport mô phỏng trên máy tính, chưa thử trên điện thoại vật lý hoặc nhiều trình duyệt. Trang dùng HTML5/CSS3 thuần và giá tĩnh, chưa có chức năng JavaScript, backend hoặc cơ sở dữ liệu. Chưa xác nhận triển khai lại GitHub Pages.
