/**
 * Project data model.
 *
 * The `model3d` field is intentionally present from Phase 1 so that Phase 2 can
 * attach a real 3D viewer WITHOUT any structural change:
 *   - Phase 1: `model3d` is always `null`  → the media area renders the image gallery.
 *   - Phase 2: set `model3d` to a `.glb` path → the media area renders the 3D viewer.
 *
 * The branching logic lives in <ProjectMedia />. See src/components/project/ProjectMedia.tsx.
 *
 * IMAGES: not listed here. They are read automatically at build/dev time from
 *   public/projects/<slug>/         (project photos — sorted by filename)
 * by src/lib/gallery.ts. Just drop files into the matching folder — the first
 * file (alphabetically) becomes the cover. No renaming or code edit required.
 */
export interface Project {
  /** URL-safe identifier used for the detail route: /projects/[slug] AND the image folder name */
  slug: string;
  title: string;
  location: string;
  /** Gross floor area, human-readable (e.g. "320 m²") */
  area: string;
  year: string;
  /** Primary materials palette, shown as tags */
  materials: string[];
  /** Short one-line descriptor shown in listings */
  summary: string;
  /** Full description shown on the detail page (may contain multiple paragraphs) */
  description: string[];
  /**
   * Phase 1: null (gallery is shown).
   * Phase 2: path to a .glb model (3D viewer is shown). No other change needed.
   */
  model3d: string | null;
}

/** A project plus its resolved image paths (attached by src/lib/gallery.ts). */
export type ProjectWithImages = Project & { images: string[] };

export const projects: Project[] = [
  {
    slug: "casa-liminal",
    title: "Casa Liminal",
    location: "Đà Lạt, Việt Nam",
    area: "340 m²",
    year: "2024",
    materials: ["Bê tông đúc tại chỗ", "Gỗ sồi", "Kính low-iron"],
    summary: "Một ngôi nhà đón sương, nơi ranh giới trong–ngoài tan biến.",
    description: [
      "Casa Liminal được đặt trên một triền dốc thông, nơi sương sớm len qua từng khe cửa. Ngôi nhà tổ chức quanh một khoảng sân trong, dẫn ánh sáng và không khí xuống tận lõi công trình.",
      "Khối bê tông thô mộc được làm dịu bởi các mảng gỗ ấm và những khung kính lớn khung mảnh, xoá nhoà ranh giới giữa phòng khách và rừng thông phía sau.",
    ],
    model3d: null,
  },
  {
    slug: "the-quiet-house",
    title: "The Quiet House",
    location: "Hội An, Việt Nam",
    area: "260 m²",
    year: "2023",
    materials: ["Gạch nung thủ công", "Vữa vôi", "Mái ngói âm dương"],
    summary: "Ngôi nhà của im lặng — nơi thời gian chậm lại giữa lòng phố cổ.",
    description: [
      "Nằm nép trong một con hẻm phố Hội, The Quiet House là bài tập về sự tiết chế. Mặt tiền kín đáo mở ra một chuỗi sân nước và hành lang bóng đổ.",
      "Vật liệu địa phương — gạch nung, vữa vôi, ngói âm dương — được dùng nguyên bản, để công trình già đi cùng thời gian một cách duyên dáng.",
    ],
    model3d: null,
  },
  {
    slug: "north-light-residence",
    title: "North Light Residence",
    location: "Sa Pa, Việt Nam",
    area: "410 m²",
    year: "2023",
    materials: ["Đá bản địa", "Thép Corten", "Gỗ thông ép"],
    summary: "Căn nhà núi hứng trọn ánh sáng bắc phương dịu và đều.",
    description: [
      "Trên một cao nguyên đá, North Light Residence được định hướng để đón thứ ánh sáng bắc ổn định mà các hoạ sĩ luôn tìm kiếm. Những giếng trời hình nêm rót ánh sáng khuếch tán xuống không gian sinh hoạt.",
      "Lớp vỏ đá bản địa và thép Corten hoà công trình vào sườn núi, trong khi nội thất gỗ ấm tạo ra một nơi trú ẩn giữa khí hậu khắc nghiệt.",
    ],
    model3d: null,
  },
  {
    slug: "veil-pavilion",
    title: "Veil Pavilion",
    location: "Nha Trang, Việt Nam",
    area: "180 m²",
    year: "2022",
    materials: ["Bê tông trắng", "Lam gỗ tếch", "Kính phản quang"],
    summary: "Một tấm màn kiến trúc lọc nắng biển và gió mặn.",
    description: [
      "Veil Pavilion là một ngôi nhà nghỉ ven biển được bao bọc bởi lớp lam gỗ tếch chuyển động theo góc nhìn, như một tấm màn lọc ánh nắng gay gắt của miền nhiệt đới.",
      "Phía sau lớp màn ấy là những không gian mở hoàn toàn ra biển, nơi ranh giới giữa hiên nhà và mặt nước gần như biến mất.",
    ],
    model3d: null,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const studio = {
  /** Tên hiển thị (dùng cho logo, tiêu đề Hero, metadata) */
  name: "NGUYỄN SƠN HẢI",
  /** Chủ sở hữu website — dùng cho dòng bản quyền */
  owner: "Nguyễn Sơn Hải",
  role: "Kiến trúc sư",
  /** Năm bắt đầu hành nghề — dùng cho khoảng năm bản quyền */
  since: "2004",
  tagline: "Kiến trúc của ánh sáng, vật liệu và sự im lặng.",
  email: "studio@nguyensonhai.com",
};
