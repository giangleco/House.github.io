Xây cho tôi một website portfolio trưng bày các công trình kiến trúc (nhà ở) tôi đã thiết kế. Tôi là kiến trúc sư lâu năm, nên website phải tinh tế, cao cấp, tối giản kiểu studio kiến trúc quốc tế — KHÔNG dùng template dashboard sặc sỡ.

## Phạm vi GIAI ĐOẠN 1 (làm ngay)
Chỉ dùng ẢNH TĨNH. Chưa cần model 3D thật. Nhưng phải kiến trúc code và data để GIAI ĐOẠN 2 gắn 3D viewer vào từng công trình mà không phải sửa lại cấu trúc.

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- GSAP + ScrollTrigger cho scroll animation
- Lenis cho smooth scrolling (mượt như các trang award-winning)
- Framer Motion cho micro-interaction và page transition
- (Chưa cài React Three Fiber ở giai đoạn này, nhưng thiết kế để thêm sau)

## Cấu trúc trang
1. **Hero**: Full-screen, một ảnh công trình đẹp nhất làm nền (có hiệu ứng parallax nhẹ khi scroll), chữ tên studio + tagline reveal bằng animation.
2. **Featured Projects**: Danh sách công trình full-bleed, scroll với parallax ảnh + text trượt lệch nhau. Hover phóng to ảnh mượt.
3. **Project Detail**: Click vào 1 công trình → chuyển cảnh mượt (không reload cứng). Gồm: gallery ảnh lớn + thông tin (địa điểm, diện tích, năm, vật liệu, mô tả).
   → QUAN TRỌNG: chừa sẵn một khu vực "media" trong trang này. Giai đoạn 1 hiển thị ảnh; giai đoạn 2 chỉ cần swap sang component 3D viewer.
4. **About**: Giới thiệu tôi + triết lý thiết kế.
5. **Contact**: Form đơn giản + email.

## Cảm giác (quan trọng nhất)
- Mọi chuyển động mượt, easing tự nhiên (ease-out cubic), không giật.
- Tông màu: trắng ngà / đen / xám bê tông + một màu nhấn duy nhất. Nhiều khoảng trắng.
- Typography: serif sang trọng cho tiêu đề (Playfair Display / Cormorant) + sans-serif sạch cho body.
- Ảnh lazy load + fade-in khi vào viewport. Responsive hoàn chỉnh.

## Dữ liệu — thiết kế để mở rộng
Tạo mảng `projects` với 3-4 công trình mẫu. MỖI project có sẵn các field:
- title, location, area, year, materials, description
- images: string[] (dùng placeholder)
- model3d: string | null  ← giai đoạn 1 để null, giai đoạn 2 sẽ điền đường dẫn .glb

Trong component media của trang chi tiết, viết logic: nếu `model3d` null thì render gallery ảnh; nếu có thì (sau này) render 3D viewer. Cứ để sẵn nhánh điều kiện đó dù giờ luôn null.

Bắt đầu bằng Hero + smooth scroll + 1 project để tôi xem cảm giác trước, rồi mở rộng dần.