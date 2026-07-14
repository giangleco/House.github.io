# Hướng dẫn code dự án này (cho dân backend Python)

Mục tiêu: anh **không cần giỏi React** vẫn tự sửa được nội dung, màu sắc, thêm
công trình, và hiểu code đang chạy gì. Đọc theo thứ tự, vừa đọc vừa thử.

---

## 0. Chạy dự án lên (làm 1 lần)

```bash
cd /home/hoang/House
npm install        # tải thư viện (giống pip install -r requirements.txt)
npm run dev        # chạy server dev, mở http://localhost:3000
```

Cứ để `npm run dev` chạy. Mỗi lần anh **lưu file**, trình duyệt **tự cập nhật**
(hot reload) — không cần khởi động lại. Dừng bằng `Ctrl + C`.

Các lệnh khác:
- `npm run build` → build ra thư mục `out/` (file tĩnh để deploy).
- `npm run lint` → kiểm tra lỗi cú pháp.

---

## 1. Tư duy React, dịch sang ngôn ngữ Python

| React/Next | Nó là gì | Tương đương Python |
|---|---|---|
| **Component** | Một hàm trả về giao diện | Một `def` trả về "HTML" |
| **Props** | Tham số truyền vào component | Tham số của hàm |
| **State** (`useState`) | Biến nhớ được, đổi thì UI vẽ lại | Biến instance của object |
| **JSX** | Cú pháp viết HTML trong JS | Giống f-string trả template |
| `.map()` | Lặp tạo nhiều phần tử | List comprehension |
| `import`/`export` | Chia sẻ code giữa file | `import` / `from x import y` |

Ví dụ một component tối giản:

```tsx
// Giống: def loi_chao(ten): return f"<h1>Chào {ten}</h1>"
function LoiChao({ ten }: { ten: string }) {
  return <h1>Chào {ten}</h1>;
}

// Dùng: <LoiChao ten="Hải" />
```

Trong JSX:
- `{ }` = "nhảy về JavaScript" (giống `{ }` trong f-string). Vd `{project.title}`.
- `className="..."` = thuộc tính `class` của HTML (đặt tên vậy vì `class` trùng
  từ khoá JS). Các chữ trong đó là **Tailwind** (xem mục 4).
- Lặp danh sách: `{projects.map(p => <div key={p.slug}>{p.title}</div>)}`
  — giống `[f"<div>{p['title']}</div>" for p in projects]`.

---

## 2. Bản đồ thư mục — đi đâu sửa gì

```
src/
  app/                     ← CÁC TRANG (mỗi thư mục = 1 URL)
    layout.tsx             ← khung chung: header, footer, font (bọc mọi trang)
    page.tsx               ← TRANG CHỦ  →  "/"
    projects/[slug]/page.tsx ← TRANG CHI TIẾT  →  "/projects/casa-liminal"
    globals.css            ← CSS chung + hiệu ứng
  components/              ← CÁC MẢNH GIAO DIỆN tái dùng
    sections/  Hero, FeaturedProjects, About, Contact  ← 4 khối trang chủ
    layout/    Header, Footer
    project/   ProjectMedia (chỗ swap ảnh↔3D), ProjectGallery
    anim/      hiệu ứng (Preloader, cursor, marquee, reveal…)
  data/projects.ts         ← DỮ LIỆU công trình + tên studio  ⭐ sửa nhiều nhất
  lib/gallery.ts           ← đọc ảnh từ public/
public/                    ← ẢNH tĩnh (public/projects/<slug>/…)
tailwind.config.ts         ← MÀU sắc, font
```

Quy tắc vàng của Next App Router: **một thư mục trong `app/` = một URL**, và file
`page.tsx` trong đó là nội dung trang.

---

## 3. Thực hành — 5 bài từ dễ đến khó

### Bài 1 — Đổi chữ (dễ nhất)
Mở [src/data/projects.ts](src/data/projects.ts), kéo xuống cuối, sửa object `studio`:

```ts
export const studio = {
  name: "NGUYỄN SƠN HẢI",     // ← đổi tên hiển thị
  tagline: "Kiến trúc của ...", // ← đổi câu slogan
  email: "studio@...",          // ← đổi email
};
```

Lưu → xem trình duyệt đổi ngay. **Đây là cách sửa text an toàn nhất**: đổi ở
dữ liệu, không đụng giao diện.

### Bài 2 — Đổi màu nhấn
Mở [tailwind.config.ts](tailwind.config.ts), tìm dòng:

```ts
accent: "#B4602F",   // ← đổi mã màu này, vd "#3F5B4C" (xanh rêu)
```

Màu nhấn (nút, gạch chân, chữ "Xem"…) đổi toàn site. Muốn tìm mã màu: gõ
"color picker" trên Google.

### Bài 3 — Thêm 1 công trình mới ⭐
Hai bước:

**(a)** Trong [src/data/projects.ts](src/data/projects.ts), thêm 1 object vào mảng
`projects` (copy 1 cái có sẵn rồi sửa):

```ts
{
  slug: "nha-ven-song",          // định danh trên URL + tên thư mục ảnh (không dấu, không cách)
  title: "Nhà Ven Sông",
  location: "Cần Thơ, Việt Nam",
  area: "300 m²",
  year: "2025",
  materials: ["Gỗ", "Bê tông"],  // mảng chuỗi
  summary: "Một dòng mô tả ngắn.",
  description: ["Đoạn 1...", "Đoạn 2..."], // mỗi chuỗi = 1 đoạn văn
  model3d: null,                 // giai đoạn 1 để null
},
```

**(b)** Tạo thư mục ảnh trùng tên `slug` và bỏ ảnh vào:

```bash
mkdir -p public/projects/nha-ven-song
# copy ảnh vào, đặt tên 01.jpg, 02.jpg... (01 là ảnh bìa)
```

Xong. Trang chủ tự có thêm công trình, và URL `/projects/nha-ven-song` tự chạy —
**không phải sửa giao diện**. (Vì code tự đọc mảng `projects` và tự đọc thư mục ảnh.)

### Bài 4 — Sửa nội dung phần "Giới thiệu"
Mở [src/components/sections/About.tsx](src/components/sections/About.tsx). Tìm các
đoạn tiếng Việt trong thẻ `<p>...</p>` và sửa trực tiếp. Con số "20+", "40+" cũng ở
đây (trong `dl`). Đừng đụng phần `className`.

### Bài 5 — Hiểu 1 component có state (Contact form)
Mở [src/components/sections/Contact.tsx](src/components/sections/Contact.tsx):

```tsx
const [sent, setSent] = useState(false);  // biến nhớ: đã gửi chưa
...
onSubmit={(e) => { e.preventDefault(); setSent(true); }}  // bấm gửi → sent = true
...
{sent ? <p>Cảm ơn</p> : <form>...</form>}  // sent=true thì hiện cảm ơn, không thì hiện form
```

`useState` = biến mà khi đổi giá trị (qua `setSent`) thì React tự vẽ lại UI. Đây là
"trái tim" của React. ⚠️ Form này **chưa gửi email thật** — muốn thật thì thay
`setSent(true)` bằng `fetch(...)` tới API Python của anh (xem mục 6).

---

## 4. Tailwind (cách style) — đọc để không sợ đống class

Thay vì viết CSS riêng, mình gắn class ngay trên phần tử:

```tsx
<div className="mt-8 text-lg text-concrete-500 md:text-2xl">
```

Đọc như sau:
- `mt-8` = margin-top (khoảng cách trên).
- `text-lg` = cỡ chữ lớn; `md:text-2xl` = trên màn hình vừa/lớn thì to hơn (`md:` = responsive).
- `text-concrete-500` = màu (các màu tự định nghĩa trong `tailwind.config.ts`).

Không cần thuộc lòng — tra tại **tailwindcss.com/docs**, hoặc copy class từ chỗ
khác trong dự án. Màu/khoảng cách của dự án đã đặt sẵn trong `tailwind.config.ts`.

---

## 5. Vòng lặp làm việc hằng ngày

```
1. npm run dev  (để chạy nền)
2. Sửa file .tsx / .ts
3. Lưu → xem trình duyệt tự đổi
4. Sai thì đọc lỗi (đỏ trên trình duyệt hoặc terminal), sửa tiếp
5. Ưng ý → npm run build để chắc chắn không lỗi → git commit/push
```

---

## 6. Ghép backend Python của anh (khi cần)

Frontend gọi API qua `fetch`. Ví dụ nối form liên hệ tới FastAPI:

```tsx
// trong Contact.tsx, thay cho setSent(true):
await fetch("https://api-cua-anh.com/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});
setSent(true);
```

Backend Python (FastAPI) nhớ bật **CORS** cho domain frontend. Backend host riêng
(Render/Railway/VPS) vì github.io chỉ chạy file tĩnh.

---

## 7. Lỗi thường gặp

| Triệu chứng | Nguyên nhân hay gặp | Cách xử lý |
|---|---|---|
| Trang trắng / lỗi đỏ | Thiếu dấu `,` `}` `>` hoặc quên đóng thẻ | Đọc dòng lỗi báo, thường chỉ đúng file + số dòng |
| Ảnh không hiện | Sai tên `slug` ≠ tên thư mục, hoặc chưa có ảnh | Kiểm tra `public/projects/<slug>/` |
| Đổi code mà web không đổi | Quên lưu file, hoặc `npm run dev` đã tắt | Lưu lại / chạy lại `npm run dev` |
| `className` không ăn | Gõ sai tên class Tailwind | Tra lại trên tailwindcss.com |
| Sửa xong build lỗi TypeScript | Sai kiểu dữ liệu (vd để số vào chỗ chuỗi) | Xem lỗi, sửa cho đúng kiểu trong `projects.ts` |

---

**Bắt đầu từ đâu:** làm Bài 1 → Bài 2 → Bài 3. Sau 3 bài đó anh đã tự chủ được
90% việc cập nhật nội dung. Cần đi sâu chỗ nào cứ hỏi tôi.
```
