import Image from "next/image";
import homebg from "@/public/homebg.svg"; // Import the SVG file
import NavBar from "@/components/Navbar";
export default function HeroSection() {
  return (
    <section>
      <NavBar />
      <div
        className="relative h-screen bg-cover bg-center -ml-[64px] z-100 overflow-hidden"
        style={{
          backgroundImage: `url(${homebg.src})`, // Use the imported SVG as the background image
        }}
      ></div>
    </section>
  );
}
