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

  // Nếu deploy vào REPO DỰ ÁN (vd github.com/<user>/portfolio → phục vụ tại
  // /portfolio), hãy bỏ comment 2 dòng dưới và đổi "portfolio" thành tên repo.
  // Với repo <user>.github.io (phục vụ tại gốc "/") thì KHÔNG cần.
  // basePath: "/portfolio",
  // assetPrefix: "/portfolio/",
};

export default nextConfig;
