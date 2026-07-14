import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/anim/Marquee";
import { getProjectsWithImages, aboutImage } from "@/lib/gallery";

export default function HomePage() {
  // Resolved on the server: images come straight from the public/ folders.
  const projects = getProjectsWithImages();
  const cover = projects[0]?.images[0] ?? null;

  return (
    <>
      <Hero cover={cover} />

      <div className="border-y border-concrete-100 bg-ivory py-6 md:py-8">
        <Marquee
          items={[
            "Nhà ở",
            "Ánh sáng",
            "Vật liệu thô mộc",
            "Sự im lặng",
            "2004 — 2026",
            "Việt Nam",
          ]}
        />
      </div>

      <FeaturedProjects projects={projects} />
      <About image={aboutImage()} />
      <Contact />
    </>
  );
}
