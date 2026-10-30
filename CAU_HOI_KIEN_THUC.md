# Giải thích bảy câu hỏi kiến thức

Nội dung dưới đây giải thích theo mã hiện có. Sinh viên cần tự đọc, chạy và diễn đạt lại, không coi đây là kết quả kiểm tra năng lực cá nhân.

## Câu 1. Các phần tử HTML5 đã sử dụng

Header chứa đầu trang; nav nhóm điều hướng; main bao nội dung chính; section chia vùng giới thiệu và bộ sưu tập; article là từng sản phẩm; aside chứa ghi chú về bản mẫu; footer là cuối trang. Details/summary tạo phần mở đóng mô tả. Ul/li biểu diễn menu và kích cỡ. Các lựa chọn dựa trên nội dung thực tế.

## Câu 2. Margin và padding

Margin tạo khoảng cách bên ngoài phần tử; padding tạo khoảng cách bên trong đến đường viền. Product-content có padding 18px trên máy tính; product-sizes có margin-top 12px. Border-box tính padding và border trong width khai báo, không tính margin.

## Câu 3. Flexbox trong bài

Size-list và nav-list dùng Flexbox theo hàng. Justify-content: flex-start xếp kích cỡ về đầu trục chính; align-items: center căn giữa theo trục phụ; gap 6px tạo khoảng cách. Product-content có flex-direction: column nên trục chính là chiều dọc.

## Câu 4. Grid và Flexbox

Flexbox phù hợp bố trí một chiều tại một thời điểm, như menu hoặc dãy kích cỡ. Grid quản lý hàng và cột, phù hợp danh sách sản phẩm. Bài dùng Grid ở .product-grid và Flexbox cho nhóm nhỏ bên trong.

## Câu 5. Nếu bỏ display: grid

Nếu không có quy tắc khác duy trì Grid, div .product-grid trở về block và các article xếp dọc. Grid-template-columns và gap không tạo lưới như trước. Thử chuyển tạm sang block tại 1366px cho thấy thẻ đầu rộng 1280px bằng vùng chứa; thay đổi thử đã được khôi phục.

## Câu 6. Vai trò của alt

Alt cung cấp mô tả văn bản thay thế, hỗ trợ người dùng trình đọc màn hình và có thể hiển thị khi ảnh không tải. Alt trong bài mô tả loại sản phẩm và màu của hình, không chỉ ghi tên tệp.

## Câu 7. Một đề xuất AI được kiểm tra và điều chỉnh

AI gợi ý kiểm tra cỡ chữ dòng Giá trước đây trên điện thoại. Sau khi được chỉ vị trí media query dưới 600px, sinh viên tự sửa .previous-price từ 12px lên 14px, lưu và tải lại trang rồi gửi ảnh trước sau. Ảnh sau cho thấy dòng giá lớn hơn và còn nằm trên một dòng trong thẻ được chụp. Bản repository được AI đồng bộ và kiểm tra riêng: 14px dưới 600px, 13px từ 600px trở lên; không ghi nhận tràn hoặc xuống dòng của bốn dòng giá ở sáu viewport.

Lý do chỉ sửa quy tắc trong media query là thay đổi nhắm vào điện thoại. Quy tắc cơ sở 13px vẫn áp dụng trên màn hình lớn. Đây là thực hành có AI hướng dẫn.
