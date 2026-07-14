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

  // Repo tên "House.github.io" → web phục vụ tại
  // giangleco.github.io/House.github.io/  → basePath phải TRÙNG tên repo.
  // (Nếu đổi tên repo thành đúng "giangleco.github.io" thì XOÁ 2 dòng này để
  //  chạy ở gốc "/".)
  basePath: "/House.github.io",
  assetPrefix: "/House.github.io/",
};

export default nextConfig;
