
import Navbar from "../../components/Navbar";
import TileGrid from "../../components/TileGrid";

export default function Home() {
  return (
    <div style={{ position: "fixed", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Navbar />
  <TileGrid />
      {/* Portfolio content goes here */}
    </div>
  );
}
