/** @type {import('next').NextConfig} */
const nextConfig = {
  // Xuất ra HTML tĩnh trong thư mục out/ để host được trên GitHub Pages.
  output: "export",

  // GitHub Pages là static host → không có server tối ưu ảnh của Next.
  // unoptimized: true khiến <Image> render thẳng file trong public/.
  images: {
    unoptimized: true,
  },

  // Mỗi route xuất ra một thư mục /route/index.html → link không đuôi .html,
  // hoạt động đúng trên GitHub Pages.
  trailingSlash: true,

  // Repo tên "House" → web phục vụ tại giangleco.github.io/House/
  // basePath/assetPrefix phải TRÙNG tên repo (phân biệt hoa/thường).
  // Nếu sau này đổi tên repo, sửa 2 dòng này cho khớp; nếu repo đổi thành
  // <user>.github.io (chạy ở gốc "/") thì XOÁ 2 dòng này.
  basePath: "/House",
  assetPrefix: "/House/",
};

export default nextConfig;
