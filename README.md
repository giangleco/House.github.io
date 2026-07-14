# ATELIER MAI — Portfolio kiến trúc

Website portfolio trưng bày các công trình nhà ở. Next.js (App Router) +
TypeScript + Tailwind + GSAP/ScrollTrigger + Lenis + Framer Motion.

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build tĩnh (đã kiểm tra type + lint)
```

## Cấu trúc

```
src/
  app/
    layout.tsx              # fonts (Playfair + Inter), SmoothScroll, Header/Footer
    template.tsx            # page transition mượt giữa các route (Framer Motion)
    page.tsx                # Trang chủ: Hero → Work → About → Contact
    projects/[slug]/page.tsx# Trang chi tiết công trình (SSG cho từng project)
  components/
    providers/SmoothScroll  # Lenis + GSAP ticker (một RAF loop duy nhất)
    anim/Reveal, useParallax# fade-in khi vào viewport + parallax cuộn
    layout/Header, Footer
    sections/Hero, FeaturedProjects, About, Contact
    project/
      ProjectMedia.tsx      # ★ điểm SWAP giai đoạn 1 ↔ 2
      ProjectGallery.tsx    # gallery ảnh (giai đoạn 1)
  data/projects.ts          # nguồn dữ liệu duy nhất + interface Project
```

## Nâng cấp lên GIAI ĐOẠN 2 (gắn 3D) — không phải sửa cấu trúc

Toàn bộ quyết định "hiển thị ảnh hay 3D" nằm gọn trong một file:
`src/components/project/ProjectMedia.tsx`.

1. Trong `src/data/projects.ts`, điền `model3d` cho project (vd `"/models/casa.glb"`).
   Field này đã có sẵn từ giai đoạn 1, hiện để `null`.
2. `npm i @react-three/fiber @react-three/drei three`
3. Viết `ModelViewer` và render nó trong nhánh `if (has3D)` của `ProjectMedia`
   (đang là `<Model3DPlaceholder />`).

Layout, khoảng cách, animation của trang chi tiết giữ nguyên — chỉ đổi phần
bên trong khung media.

## Thay ảnh thật

Ảnh hiện là placeholder từ Unsplash (khai báo host trong `next.config.mjs`).
Thay URL trong `src/data/projects.ts`, hoặc bỏ ảnh vào `public/` rồi dùng đường
dẫn nội bộ.

## Tùy biến nhanh

- Màu nhấn / palette: `tailwind.config.ts` (`accent`, `concrete`, `ivory`…).
- Tên studio, tagline, email: object `studio` cuối file `src/data/projects.ts`.
- Font tiêu đề/nội dung: `src/app/layout.tsx`.
